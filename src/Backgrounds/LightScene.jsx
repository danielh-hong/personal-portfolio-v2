// LightScene.jsx

import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Environment } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { DepthOfField, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

import { ParticleField } from './LightParticles'
import LightSparklingStars from './LightSparklingStars'

export default function LightScene({ mouse }) {
  const particleExplodeRef = useRef()
  const { size, camera } = useThree()

  // Keep aspect ratio correct
  useEffect(() => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
  }, [size, camera])

  // If user clicks on empty space => explode at center
  const handlePointerMissed = () => {
    if (particleExplodeRef.current) {
      particleExplodeRef.current(new THREE.Vector3(0, 0, 0))
    }
  }

  return (
    <>
      {/* Use a 'night' environment for some subtle reflection, though it's a "light" theme */}
      <Environment preset="night" background={false} />

      {/* Lighting */}
      <hemisphereLight
        skyColor={'#ffffff'}
        groundColor={'#444444'}
        intensity={0.6}
      />
      <directionalLight
        color="#ffffff"
        position={[10, 15, 10]}
        intensity={1.5}
      />
      <directionalLight
        color="#ffffff"
        position={[-15, -10, 5]}
        intensity={0.8}
      />
      <ambientLight intensity={0.2} />

      {/* Particle Field */}
      <ParticleField mouse={mouse} onParticleExplode={particleExplodeRef} />

      {/* Sparkling Stars */}
      <LightSparklingStars />

      {/* Post-processing */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration offset={[0.0015, 0.0012]} />
      </EffectComposer>

      {/* "Pointer missed" => explode all */}
      <mesh onPointerMissed={handlePointerMissed} />
    </>
  )
}
