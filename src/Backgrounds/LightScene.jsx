import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import {
  EffectComposer,
  Bloom,
  DepthOfField
} from '@react-three/postprocessing'

export default function LightScene({ mouse }) {
  const groupRef = useRef()
  const pointsRef = useRef()

  /**
   * 1) Create a small "circle" texture in memory for a smooth bokeh sprite
   */
  const circleTexture = useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Draw a smooth circle gradient
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, size * 0.1,
      size / 2, size / 2, size * 0.5
    )
    // Two soft pastel color stops
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    return texture
  }, [])

  /**
   * 2) Positions + Pastel Tints
   *    Instead of random rectangles, we do a simple spherical distribution for a bokeh effect
   */
  const count = 500  // Adjust for more or fewer particles
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      // Random sphere distribution
      const radius = Math.random() * 40
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.random() * Math.PI

      arr[i]   = radius * Math.sin(phi) * Math.cos(theta)
      arr[i+1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i+2] = radius * Math.cos(phi)
    }
    return arr
  }, [count])

  const colorArray = useMemo(() => {
    /**
     * We'll add a pastel shift so each circle has a subtle tint (like pinkish, bluish, etc).
     * We'll do this by storing an HSL -> RGB conversion. Or just random pastel.
     */
    const arr = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      // Pastel range: choose random hue, low saturation & high lightness
      const hue = Math.random()
      const saturation = 0.4 + Math.random() * 0.2 // 0.4 - 0.6
      const lightness = 0.8 + Math.random() * 0.1  // 0.8 - 0.9
      color.setHSL(hue, saturation, lightness)

      arr[i * 3]     = color.r
      arr[i * 3 + 1] = color.g
      arr[i * 3 + 2] = color.b
    }
    return arr
  }, [count])

  /**
   * 3) Animate for gentle parallax + slight breathing
   */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Parallax rotation
    if (groupRef.current) {
      const targetX = mouse.current.y * 0.3 + Math.sin(t * 0.05) * 0.1
      const targetY = mouse.current.x * 0.3 + Math.cos(t * 0.05) * 0.1
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.02)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.02)
    }

    // Gentle scale "breathing"
    if (pointsRef.current) {
      const scaleAmount = 1 + Math.sin(t * 0.7) * 0.05
      pointsRef.current.scale.set(scaleAmount, scaleAmount, scaleAmount)
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {/* Our single Points object for bokeh sprites */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={colorArray.length / 3}
              array={colorArray}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            map={circleTexture}
            alphaTest={0.02}
            vertexColors
            size={3.0}         // Circle size
            sizeAttenuation
            transparent
            opacity={0.85}
          />
        </points>
      </group>

      {/* Soft post-processing for a nice bokeh-like effect */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.015}
          focalLength={0.02}
          bokehScale={1.5}
        />
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.85}
        />
      </EffectComposer>
    </>
  )
}
