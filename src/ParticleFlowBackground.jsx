import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Simple helper to detect a mobile device using userAgent.
 * (Feel free to tweak or just check window.innerWidth < 768, etc.)
 */
function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || (window.opera ?? '');
  if (/Android/i.test(ua)) return true;
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  return false;
}

const ParticleFlowBackground = ({ triggerZoom }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const galaxyRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const galaxyMaterialRef = useRef(null);
  const starsMaterialRef = useRef(null);
  const shootingStarsRef = useRef([]);

  const triggerZoomRef = useRef(triggerZoom); // Ref to track triggerZoom
  const [sceneReady, setSceneReady] = useState(false);

  // Check for mobile device once
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Update the triggerZoomRef whenever triggerZoom changes
  useEffect(() => {
    triggerZoomRef.current = triggerZoom;
  }, [triggerZoom]);

  // Galaxy parameters (we'll reduce these if on mobile)
  const params = useRef({
    count: 40000, // Desktop default
    size: 0.015,
    radius: 12,
    branches: 5,
    spin: 1.2,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6b6b',
    middleColor: '#4ecdc4',
    outsideColor: '#8a2be2',
    rotationSpeed: 0.15,
  });

  // If mobile, drastically reduce
  useEffect(() => {
    if (isMobile) {
      params.current.count = 10000; // e.g. 10k vs 40k
      params.current.radius = 10;   // slightly smaller radius
    }
  }, [isMobile]);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    // Slightly different camera position for mobile
    camera.position.z = isMobile ? 14 : 12;
    camera.position.x = 0;
    camera.position.y = 0;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x162447, 0.4);
    scene.add(ambientLight);

    const centerLight = new THREE.PointLight(0xff6b6b, 2, 50);
    centerLight.position.set(0, 0, 2);
    scene.add(centerLight);

    const rimLight = new THREE.PointLight(0x4ecdc4, 1.2, 40);
    rimLight.position.set(-10, 5, -5);
    scene.add(rimLight);

    // Simple radial star texture
    const starTexture = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.8, 'rgba(255,255,255,0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    })();

    // Digit texture for galaxy: '1' and '0'
    const digitTexture = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 60px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw '1' on left half
      ctx.fillText('1', 32, 32);
      // Draw '0' on right half
      ctx.fillText('0', 96, 32);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    })();

    // ShootingStarWithTrail class
    class ShootingStarWithTrail {
      constructor() {
        // If mobile, drastically reduce
        const maxPointsRange = isMobile ? { min: 10, max: 20 } : { min: 15, max: 30 };
        this.maxPoints = Math.floor(Math.random() * (maxPointsRange.max - maxPointsRange.min)) + maxPointsRange.min;

        this.points = new Array(this.maxPoints)
          .fill(0)
          .map(() => new THREE.Vector3());

        this.trailGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.maxPoints * 3);
        this.trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        this.trailMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uOpacity: { value: 1.0 },
          },
          vertexShader: `
            attribute float vertexAlpha;
            varying float vAlpha;
            void main() {
              vAlpha = vertexAlpha;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform float uOpacity;
            varying float vAlpha;
            void main() {
              vec3 baseColor = vec3(0.98, 0.9, 1.0);
              float fadeOut = pow(vAlpha, 1.6);
              fadeOut *= smoothstep(0.0, 0.3, vAlpha);
              gl_FragColor = vec4(baseColor, fadeOut * 0.8 * uOpacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        this.trail = new THREE.Line(this.trailGeometry, this.trailMaterial);
        scene.add(this.trail);

        this.reset();
      }

      reset() {
        const spawnQuadrant = Math.random();
        const r = params.current.radius * (2.5 + Math.random());
        let phi, theta;

        if (spawnQuadrant < 0.7) {
          phi = Math.random() * Math.PI * 0.5;
          theta = Math.random() * Math.PI * 0.5;
        } else {
          phi = Math.random() * Math.PI * 2;
          theta = Math.random() * Math.PI;
        }

        this.position = new THREE.Vector3(
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta)
        );

        const targetOffset = new THREE.Vector3(
          (Math.random() - 0.3) * params.current.radius * 0.5,
          (Math.random() - 0.7) * params.current.radius * 0.5,
          (Math.random() - 0.5) * params.current.radius * 0.3
        );
        const target = new THREE.Vector3(15, -5, 0).add(targetOffset);

        this.velocity = target.clone().sub(this.position).normalize();
        // Slightly slower on mobile
        const speedBase = isMobile ? 0.15 : 0.25;
        const speedRange = isMobile ? 0.1 : 0.15;
        this.speed = speedBase + Math.random() * speedRange;
        this.velocity.multiplyScalar(this.speed);

        this.life = 1.0;
        // Slower decay on desktop, a bit faster on mobile to reduce overhead
        const baseDecay = isMobile ? 0.004 : 0.002;
        const rangeDecay = isMobile ? 0.002 : 0.003;
        this.decay = baseDecay + Math.random() * rangeDecay;

        for (let i = 0; i < this.maxPoints; i++) {
          this.points[i].copy(this.position);
        }
        this.size = 1.0 + Math.random() * 0.6;
      }

      update() {
        this.position.add(this.velocity);
        this.life -= this.decay;

        for (let i = this.maxPoints - 1; i > 0; i--) {
          this.points[i].lerp(this.points[i - 1], 0.5);
        }
        this.points[0].copy(this.position);

        const positions = new Float32Array(this.maxPoints * 3);
        const alphas = new Float32Array(this.maxPoints);

        for (let i = 0; i < this.maxPoints; i++) {
          const i3 = i * 3;
          positions[i3] = this.points[i].x;
          positions[i3 + 1] = this.points[i].y;
          positions[i3 + 2] = this.points[i].z;

          alphas[i] =
            Math.pow(1 - i / (this.maxPoints - 1), 1.5) * this.size * this.life;
        }

        this.trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.trailGeometry.setAttribute('vertexAlpha', new THREE.BufferAttribute(alphas, 1));

        if (this.life <= 0) {
          this.reset();
        }
      }

      dispose() {
        scene.remove(this.trail);
        this.trailGeometry.dispose();
        this.trailMaterial.dispose();
      }
    }

    // Galaxy geometry
    const createGalaxyGeometry = () => {
      const geometry = new THREE.BufferGeometry();
      const count = params.current.count;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const digitType = new Float32Array(count);

      const colorInside = new THREE.Color(params.current.insideColor);
      const colorMiddle = new THREE.Color(params.current.middleColor);
      const colorOutside = new THREE.Color(params.current.outsideColor);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * params.current.radius;
        const spinAngle = radius * params.current.spin;
        const branchAngle =
          ((i % params.current.branches) / params.current.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), params.current.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          radius *
          0.15;
        const randomY =
          Math.pow(Math.random(), params.current.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          radius *
          0.15;
        const randomZ =
          Math.pow(Math.random(), params.current.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          radius *
          0.15;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY + Math.sin(radius * 0.5) * 0.5;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        let color = new THREE.Color();
        if (radius < params.current.radius * 0.4) {
          color.lerpColors(
            colorInside,
            colorMiddle,
            radius / (params.current.radius * 0.4)
          );
        } else {
          color.lerpColors(
            colorMiddle,
            colorOutside,
            (radius - params.current.radius * 0.4) / (params.current.radius * 0.6)
          );
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Slightly smaller scale on mobile
        const baseScale = isMobile ? 1.0 : 1.0;
        const randomScale = isMobile ? 1.5 : 2.0;
        scales[i] = baseScale + Math.random() * randomScale;

        digitType[i] = Math.random() < 0.5 ? 0.0 : 1.0; // '1' or '0'
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      geometry.setAttribute('digitType', new THREE.BufferAttribute(digitType, 1));
      return geometry;
    };

    // Background starfield
    const createBackgroundStars = () => {
      const starsGeometry = new THREE.BufferGeometry();
      // Much fewer on mobile
      const starCount = isMobile ? 1500 : 4000;
      const starsPositions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 120 + params.current.radius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        starsPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starsPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starsPositions[i3 + 2] = radius * Math.cos(phi);
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
      return starsGeometry;
    };

    // Galaxy material
    const galaxyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        digitTexture: { value: digitTexture },
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        attribute float aScale;
        attribute float digitType;
        varying vec3 vColor;
        varying float vDigitType;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;
          gl_PointSize = aScale * 30.0 * (1.0 / -viewPosition.z);

          vColor = color;
          vDigitType = digitType;
        }
      `,
      fragmentShader: `
        uniform sampler2D digitTexture;
        uniform float uOpacity;
        varying vec3 vColor;
        varying float vDigitType;

        void main() {
          vec2 uv = gl_PointCoord;
          // Shift uv.x based on vDigitType
          if (vDigitType < 0.5) {
            uv.x = uv.x * 0.5;        // left half => '1'
          } else {
            uv.x = 0.5 + uv.x * 0.5;  // right half => '0'
          }
          vec4 texColor = texture2D(digitTexture, uv);
          float strength = texColor.a;
          vec3 finalColor = mix(vec3(0.0), vColor, strength);
          float alpha = strength * uOpacity;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
    galaxyMaterialRef.current = galaxyMaterial;

    // Stars material
    const starsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.1,
      sizeAttenuation: true,
      map: starTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    starsMaterialRef.current = starsMaterial;

    // Create galaxy & stars
    const galaxyGeometry = createGalaxyGeometry();
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxyRef.current = galaxy;
    scene.add(galaxy);

    const starsGeometry = createBackgroundStars();
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Position offset
    galaxy.position.set(20, -5, -5);
    stars.position.set(15, -5, -5);

    // Shooting stars
    const shootingStarCount = isMobile ? 10 : 30; 
    const shootingStars = Array.from({ length: shootingStarCount }, () => new ShootingStarWithTrail());
    shootingStarsRef.current = shootingStars;

    // Mouse parallax
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (event) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animate
    const clock = new THREE.Clock();
    let previousTime = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      shootingStars.forEach((star) => star.update());

      mousePosition.current.x += (targetX - mousePosition.current.x) * 2 * deltaTime;
      mousePosition.current.y += (targetY - mousePosition.current.y) * 2 * deltaTime;

      const galaxyBasePosX = 20;
      const galaxyBasePosY = -5;
      const maxOffset = 1.5;
      const galaxySensitivity = 1.5;
      const starSensitivity = 3;

      if (!triggerZoomRef.current) {
        // only move if not zooming
        const targetGalaxyX =
          galaxyBasePosX + mousePosition.current.x * galaxySensitivity;
        const targetGalaxyY =
          galaxyBasePosY + mousePosition.current.y * galaxySensitivity;

        const clampedGalaxyX = Math.max(
          galaxyBasePosX - maxOffset,
          Math.min(galaxyBasePosX + maxOffset, targetGalaxyX)
        );
        const clampedGalaxyY = Math.max(
          galaxyBasePosY - maxOffset,
          Math.min(galaxyBasePosY + maxOffset, targetGalaxyY)
        );

        const targetStarX = mousePosition.current.x * starSensitivity;
        const targetStarY = mousePosition.current.y * starSensitivity;

        camera.position.x +=
          (clampedGalaxyX * 0.8 + targetStarX * 0.2 - camera.position.x) *
          deltaTime *
          1.5;
        camera.position.y +=
          (clampedGalaxyY * 0.8 + targetStarY * 0.2 - camera.position.y) *
          deltaTime *
          1.5;
      }

      camera.lookAt(galaxy.position);

      // Gentle rotation
      galaxy.rotation.y += deltaTime * params.current.rotationSpeed * 0.3;
      galaxy.rotation.z += deltaTime * params.current.rotationSpeed * 0.1;
      stars.rotation.y += deltaTime * params.current.rotationSpeed * 0.1;

      centerLight.intensity = 2.0 + Math.sin(elapsedTime * 0.5) * 0.5;
      rimLight.intensity = 1.2 + Math.cos(elapsedTime * 0.3) * 0.2;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    setSceneReady(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);

      galaxyGeometry.dispose();
      starsGeometry.dispose();
      galaxyMaterial.dispose();
      digitTexture.dispose();
      starTexture.dispose();
      shootingStars.forEach((star) => star.dispose());
      starsMaterial.dispose();
    };
  }, [isMobile]);

  // Zoom & fade animations
  useEffect(() => {
    if (triggerZoom && sceneReady) {
      // Zoom in
      gsap.to(cameraRef.current.position, {
        z: 0.1,
        duration: 4,
        ease: 'power2.in',
        onComplete: () => {
          navigate('/about');
        },
      });

      gsap.to(params.current, {
        rotationSpeed: 1.5,
        duration: 3,
        ease: 'power2.in',
      });

      // Galaxy fade
      if (galaxyMaterialRef.current) {
        gsap.to(galaxyMaterialRef.current.uniforms.uOpacity, {
          value: 0,
          duration: 4,
          ease: 'power2.in',
        });
      }

      // Stars fade
      if (starsMaterialRef.current) {
        gsap.to(starsMaterialRef.current, {
          opacity: 0,
          duration: 4,
          ease: 'power2.in',
        });
      }

      // Shooting stars fade
      shootingStarsRef.current.forEach((star) => {
        gsap.to(star.trailMaterial.uniforms.uOpacity, {
          value: 0,
          duration: 4,
          ease: 'power2.in',
        });
      });
    }
  }, [triggerZoom, sceneReady, navigate]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0"
      style={{
        background: 'radial-gradient(circle at center, #1a1025 0%, #0a0510 100%)',
        zIndex: -1,
      }}
    />
  );
};

export default ParticleFlowBackground;
