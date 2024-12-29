// MaterialCreator.jsx
import * as THREE from 'three';

export const createStarTexture = () => {
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
};

export const createDigitTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  // Draw custom short vertical line
  ctx.fillRect(29, 20, 6, 24);  // x, y, width, height - adjust these to change line dimensions

  // Draw the zero with a normal font
  ctx.font = '500 56px Inter, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('0', 96, 32);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export const createGalaxyMaterial = (digitTexture) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      digitTexture: { value: digitTexture },
      uOpacity: { value: 1.0 },
      uTime: { value: 0 }
    },
    vertexShader: `
      attribute float aScale;
      attribute float digitType;
      varying vec3 vColor;
      varying float vDigitType;
      uniform float uTime;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
        gl_PointSize = aScale * 30.0 * (1.0 / -viewPosition.z);

        // Tiny color variation
        vec3 slightlyShifted = color + vec3(
          sin(position.x * 0.1 + uTime * 0.001) * 0.02,
          cos(position.y * 0.1 + uTime * 0.001) * 0.02,
          sin(position.z * 0.1 + uTime * 0.002) * 0.02
        );
        vColor = slightlyShifted;
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

        if (vDigitType < 0.5) {
          uv.x = uv.x * 0.5;
        } else {
          uv.x = 0.5 + uv.x * 0.5;
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
};

export const createStarsMaterial = (starTexture) => {
  return new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    map: starTexture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
};