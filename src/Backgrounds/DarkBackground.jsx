// DarkBackground.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { defaultGalaxyParams } from './GalaxyParams';
import { ShootingStarWithTrail } from './ShootingStar';
import { createGalaxyGeometry, createBackgroundStars } from './GalaxyCreator';
import { 
  createStarTexture, 
  createDigitTexture, 
  createGalaxyMaterial, 
  createStarsMaterial 
} from './MaterialCreator';
import styles from './DarkBackground.module.css';

const DarkBackground = () => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const galaxyRef = useRef(null);
  const shootingStarsRef = useRef([]);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const params = useRef(defaultGalaxyParams);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup with parallax-friendly positioning
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x162447, 0.4);
    scene.add(ambientLight);

    const centerLight = new THREE.PointLight(0xff0044, 2, 50);  // Updated to match new color scheme
    centerLight.position.set(0, 0, 2);
    scene.add(centerLight);

    const rimLight = new THREE.PointLight(0x00ffff, 1.2, 40);  // Updated to match new color scheme
    rimLight.position.set(-10, 5, -5);
    scene.add(rimLight);

    // Create textures
    const starTexture = createStarTexture();
    const digitTexture = createDigitTexture();

    // Create materials
    const galaxyMaterial = createGalaxyMaterial(digitTexture);
    const starsMaterial = createStarsMaterial(starTexture);

    // Create geometries and meshes
    const galaxyGeometry = createGalaxyGeometry(params.current);
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxyRef.current = galaxy;
    scene.add(galaxy);

    const starsGeometry = createBackgroundStars(params.current);
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Position everything centrally
    galaxy.position.set(0, 0, -5);
    stars.position.set(0, 0, -10);

    // Initialize shooting stars
    const shootingStarCount = 30;
    const shootingStars = Array.from(
      { length: shootingStarCount },
      () => new ShootingStarWithTrail(scene, params.current)
    );
    shootingStarsRef.current = shootingStars;

    // Simplified mouse handler
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotation.current = {
        x: y * params.current.parallaxMultiplier,
        y: x * params.current.parallaxMultiplier
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop with smooth, controlled movement
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation transitions
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        targetRotation.current.x,
        params.current.lerpFactor
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        targetRotation.current.y,
        params.current.lerpFactor
      );

      // Apply rotations
      galaxy.rotation.x = currentRotation.current.x;
      galaxy.rotation.y = currentRotation.current.y + elapsedTime * params.current.rotationSpeed;

      // More subtle star movement
      stars.rotation.x = currentRotation.current.x * 0.5;
      stars.rotation.y = currentRotation.current.y * 0.5 + elapsedTime * params.current.rotationSpeed * 0.5;

      // Very subtle camera movement
      camera.position.x = currentRotation.current.y * -1;
      camera.position.y = currentRotation.current.x * -1;
      camera.lookAt(0, 0, 0);

      // Update shooting stars
      shootingStars.forEach(star => star.update());

      // Gentle light pulsing
      centerLight.intensity = 2.0 + Math.sin(elapsedTime * 0.5) * 0.2;
      rimLight.intensity = 1.2 + Math.cos(elapsedTime * 0.3) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }

      galaxyGeometry.dispose();
      starsGeometry.dispose();
      galaxyMaterial.dispose();
      starsMaterial.dispose();
      digitTexture.dispose();
      starTexture.dispose();
      shootingStars.forEach(star => star.dispose());
      
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.background}
    />
  );
};

export default DarkBackground;