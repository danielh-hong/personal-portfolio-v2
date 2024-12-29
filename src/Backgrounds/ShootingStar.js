// ShootingStar.js
import * as THREE from 'three';

export class ShootingStarWithTrail {
  constructor(scene, params) {
    this.scene = scene;
    this.params = params;
    this.maxPoints = Math.floor(Math.random() * 15) + 30;
    this.points = new Array(this.maxPoints).fill(0).map(() => new THREE.Vector3());

    this.initializeGeometry();
    this.createMaterial();
    this.createTrail();
    this.reset();
  }

  initializeGeometry() {
    this.trailGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.maxPoints * 3);
    this.trailGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
  }

  createMaterial() {
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
  }

  createTrail() {
    this.trail = new THREE.Line(this.trailGeometry, this.trailMaterial);
    this.scene.add(this.trail);
  }

  reset() {
    const spawnQuadrant = Math.random();
    const r = this.params.radius * (2.5 + Math.random());
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
      (Math.random() - 0.3) * this.params.radius * 0.5,
      (Math.random() - 0.7) * this.params.radius * 0.5,
      (Math.random() - 0.5) * this.params.radius * 0.3
    );

    const target = new THREE.Vector3(0, 0, 0).add(targetOffset);
    this.velocity = target.clone().sub(this.position).normalize();
    this.speed = 0.25 + Math.random() * 0.15;
    this.velocity.multiplyScalar(this.speed);

    this.life = 1.0;
    this.decay = 0.002 + Math.random() * 0.003;

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

      alphas[i] = Math.pow(1 - i / (this.maxPoints - 1), 1.5) * this.size * this.life;
    }

    this.trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.trailGeometry.setAttribute('vertexAlpha', new THREE.BufferAttribute(alphas, 1));

    if (this.life <= 0) {
      this.reset();
    }
  }

  dispose() {
    if (this.scene && this.trail) {
      this.scene.remove(this.trail);
    }
    if (this.trailGeometry) {
      this.trailGeometry.dispose();
    }
    if (this.trailMaterial) {
      this.trailMaterial.dispose();
    }
  }
}