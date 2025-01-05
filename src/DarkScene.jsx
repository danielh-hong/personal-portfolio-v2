import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import styles from './Scene.module.css';

// Custom shader for the star field
const StarFieldMaterial = {
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 st = gl_FragCoord.xy/resolution.xy;
      float starIntensity = random(floor(st * 100.0));
      float twinkle = sin(time + random(st) * 10.0) * 0.5 + 0.5;
      starIntensity *= twinkle;
      gl_FragColor = vec4(vec3(step(0.99, starIntensity)), 1.0);
    }
  `,
};

const Moon = () => {
  const moonRef = useRef();
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (moonRef.current) {
      // Subtle moon movement following mouse
      moonRef.current.position.x = THREE.MathUtils.lerp(
        moonRef.current.position.x,
        3 + (mouse.x * viewport.width) / 8,
        0.1
      );
      moonRef.current.position.y = THREE.MathUtils.lerp(
        moonRef.current.position.y,
        2 + (mouse.y * viewport.height) / 8,
        0.1
      );
    }
  });

  return (
    <group ref={moonRef} position={[3, 2, -5]}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#C7C7C7"
          roughness={0.8}
          metalness={0.2}
          emissive="#404040"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Moon craters */}
      {[...Array(8)].map((_, i) => {
        const theta = (i / 8) * Math.PI * 2;
        const r = 0.6;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(theta) * r,
              Math.sin(theta) * r,
              0.5,
            ]}
            scale={[0.2, 0.2, 0.1]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#A0A0A0" roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
};

const Rocket = () => {
  const rocketRef = useRef();
  const { viewport, mouse } = useThree();

  const [spring] = useSpring(() => ({
    from: { hover: 0 },
    to: async (next) => {
      while (true) {
        await next({ hover: 1 });
        await next({ hover: 0 });
      }
    },
    config: { duration: 2000 },
  }));

  useFrame(({ clock }) => {
    if (rocketRef.current) {
      // Complex rocket movement
      const time = clock.getElapsedTime();
      rocketRef.current.position.y += Math.sin(time * 2) * 0.002;
      rocketRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
      
      // Mouse interaction
      rocketRef.current.rotation.y = THREE.MathUtils.lerp(
        rocketRef.current.rotation.y,
        mouse.x * 0.5,
        0.1
      );
    }
  });

  return (
    <animated.group
      ref={rocketRef}
      position-y={spring.hover}
      position={[-2, 1, 0]}
    >
      {/* Rocket body */}
      <mesh>
        <capsuleGeometry args={[0.2, 1, 8, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.2, 0.4, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Engine */}
      <group position={[0, -0.7, 0]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#3E3E3E" />
        </mesh>
        
        {/* Rocket flames */}
        <Flames />
      </group>

      {/* Wings */}
      {[-1, 1].map((x, i) => (
        <mesh
          key={i}
          position={[0.2 * x, -0.4, 0]}
          rotation={[0, 0, (x * Math.PI) / 4]}
        >
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#FF4444" />
        </mesh>
      ))}
    </animated.group>
  );
};

const Flames = () => {
  const flamesRef = useRef();

  useFrame(({ clock }) => {
    if (flamesRef.current) {
      const time = clock.getElapsedTime();
      flamesRef.current.scale.x = 1 + Math.sin(time * 10) * 0.2;
      flamesRef.current.scale.y = 1 + Math.cos(time * 15) * 0.2;
    }
  });

  return (
    <group ref={flamesRef}>
      <mesh position={[0, -0.2, 0]}>
        <coneGeometry args={[0.1, 0.3, 16]} />
        <meshBasicMaterial color="#FF4400" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.05, 0.2, 16]} />
        <meshBasicMaterial color="#FFAA00" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const Stars = () => {
  const starsRef = useRef();
  const { viewport } = useThree();

  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * viewport.width * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 3;
      positions[i3 + 2] = -Math.random() * 20;
    }
    return positions;
  }, [viewport]);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.z = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FFFFFF"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const Mountains = () => {
  return (
    <group position={[0, -2, -3]}>
      {[
        { pos: [-3, 0, 2], height: 3, color: '#1A1A1A' },
        { pos: [-1, 0, 0], height: 4, color: '#2A2A2A' },
        { pos: [2, 0, 1], height: 3.5, color: '#1F1F1F' },
      ].map((mountain, i) => (
        <mesh
          key={i}
          position={mountain.pos}
        >
          <coneGeometry args={[2, mountain.height, 4]} />
          <meshStandardMaterial
            color={mountain.color}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const DarkScene = () => {
  return (
    <div className={styles.sceneContainer}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 2, -5]} intensity={0.5} color="#C7C7C7" />
        <spotLight
          position={[-2, 1, 0]}
          intensity={0.3}
          color="#FF4400"
          distance={7}
        />

        <Stars />
        <Moon />
        <Rocket />
        <Mountains />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
          />
          <Noise opacity={0.05} />
          <Vignette
            offset={0.5}
            darkness={0.5}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>

        {/* Space fog */}
        <fog attach="fog" args={['#000000', 5, 25]} />
      </Canvas>
    </div>
  );
};

export default DarkScene;