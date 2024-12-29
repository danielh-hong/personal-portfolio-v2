// galaxyCreator.js
import * as THREE from 'three';

export const createGalaxyGeometry = (params) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  const scales = new Float32Array(params.count);
  const digitType = new Float32Array(params.count);

  const colorInside = new THREE.Color(params.insideColor);
  const colorMiddle = new THREE.Color(params.middleColor);
  const colorOutside = new THREE.Color(params.outsideColor);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * params.radius;
    const spinAngle = radius * params.spin;
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      radius *
      0.15;
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      radius *
      0.15;
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      radius *
      0.15;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY + Math.sin(radius * 0.5) * 0.5;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    let color = new THREE.Color();
    if (radius < params.radius * 0.4) {
      color.lerpColors(
        colorInside,
        colorMiddle,
        radius / (params.radius * 0.4)
      );
    } else {
      color.lerpColors(
        colorMiddle,
        colorOutside,
        (radius - params.radius * 0.4) / (params.radius * 0.6)
      );
    }

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    scales[i] = 1.0 + Math.random() * 2.0;
    digitType[i] = Math.random() < 0.5 ? 0.0 : 1.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('digitType', new THREE.BufferAttribute(digitType, 1));

  return geometry;
};

export const createBackgroundStars = (params) => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 4000;
  const starsPositions = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 120 + params.radius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    starsPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starsPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starsPositions[i3 + 2] = radius * Math.cos(phi);
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
  return starsGeometry;
};