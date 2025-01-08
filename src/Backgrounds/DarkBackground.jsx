import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect } from 'react'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration
} from '@react-three/postprocessing'
import styles from './DarkBackground.module.css'

// -----------------------------------------------------------------------------
// 1) Detect mobile devices
// -----------------------------------------------------------------------------
function isMobileDevice() {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent || navigator.vendor || (window.opera ?? '')
  if (/Android/i.test(ua)) return true
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  return false
}

// -----------------------------------------------------------------------------
// 2) Utility Functions
// -----------------------------------------------------------------------------
function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

// Used for bounding box logic (shooting stars removal, etc.)
function getBounds(width, height) {
  // A bit bigger than screen to ensure they don’t pop in/out too abruptly
  const xExtent = Math.max(30, width / 20)
  const yExtent = Math.max(20, height / 20)
  const zExtent = 20
  return {
    xMin: -xExtent,
    xMax: xExtent,
    yMin: -yExtent,
    yMax: yExtent,
    zMin: -zExtent,
    zMax: zExtent,
  }
}

// -----------------------------------------------------------------------------
// 3) Create a reusable Star Geometry (2D star shape extruded slightly)
// -----------------------------------------------------------------------------
function createStarGeometry(size = 1, extrudeFraction = 0.1) {
  const shape = new THREE.Shape()
  const spikes = 5
  const outerRadius = size
  const innerRadius = size * 0.45

  let rot = (Math.PI / 2) * 3
  const step = Math.PI / spikes

  shape.moveTo(0, -outerRadius)
  for (let i = 0; i < spikes; i++) {
    let x = Math.cos(rot) * outerRadius
    let y = Math.sin(rot) * outerRadius
    shape.lineTo(x, y)
    rot += step

    x = Math.cos(rot) * innerRadius
    y = Math.sin(rot) * innerRadius
    shape.lineTo(x, y)
    rot += step
  }
  shape.closePath()

  // Extrude a little so it’s not just flat
  const extrudeSettings = { depth: size * extrudeFraction, bevelEnabled: false }
  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

// -----------------------------------------------------------------------------
// 4) A Simple "Static" Star Component with random color
// -----------------------------------------------------------------------------
function StaticStar({ position, size, color }) {
  // Create geometry once, memoized:
  const geometry = useMemo(() => createStarGeometry(size), [size])
  return (
    <mesh position={position} geometry={geometry}>
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

// -----------------------------------------------------------------------------
// 5) A Big Cloud of "Distant" Stars as a single Points geometry
//    Now placed inside the same groupRef to parallax with everything else
// -----------------------------------------------------------------------------
function DistantStars() {
  // Adjust these for performance vs. richness
  const numStars = 700

  const positions = useMemo(() => {
    const arr = new Float32Array(numStars * 3)
    for (let i = 0; i < numStars * 3; i += 3) {
      // Spread them far out (±700)
      arr[i]   = (Math.random() - 0.5) * 1400
      arr[i+1] = (Math.random() - 0.5) * 1400
      arr[i+2] = (Math.random() - 0.5) * 1400
    }
    return arr
  }, [numStars])

  const colors = useMemo(() => {
    // A small palette of soft star colors
    const palette = ['#ffffff', '#ffecd2', '#d2eaff', '#ffe0f4', '#fffdd0']
    const arr = new Float32Array(numStars * 3)
    const color = new THREE.Color()
    for (let i = 0; i < numStars * 3; i += 3) {
      color.set(palette[Math.floor(Math.random() * palette.length)])
      arr[i]   = color.r
      arr[i+1] = color.g
      arr[i+2] = color.b
    }
    return arr
  }, [numStars])

  const geometryRef = useRef()

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }
  }, [positions, colors])

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={2.0}   // Increase size so they're more visible
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  )
}

// -----------------------------------------------------------------------------
// 6) ShootingStars: star heads & star tails, with random color
// -----------------------------------------------------------------------------
function ShootingStars({ bounds }) {
  const [stars, setStars] = useState([])
  const spawnRef = useRef(null)
  const tabVisible = useRef(!document.hidden)

  // Let’s pick from a small color palette for variety
  const colorPalette = ['#ffffff', '#ffcfdf', '#fde2ff', '#c7ceea', '#bffcc6']

  // Pre-create star geometry for the head + tail so we don’t rebuild every frame
  const headGeometry = useMemo(() => createStarGeometry(0.2, 0.05), [])
  const tailGeometry = useMemo(() => createStarGeometry(0.2, 0.05), [])

  // Helper: build random star path + color
  function createShootingStarData() {
    const start = new THREE.Vector3()
    const end = new THREE.Vector3()

    // Randomly choose an edge
    const edge = Math.floor(Math.random() * 4)
    if (edge === 0) {
      // Left -> Right
      start.set(bounds.xMin - 2, randomRange(bounds.yMin, bounds.yMax), randomRange(bounds.zMin, bounds.zMax))
      end.set(bounds.xMax + 2, randomRange(bounds.yMin, bounds.yMax), randomRange(bounds.zMin, bounds.zMax))
    } else if (edge === 1) {
      // Right -> Left
      start.set(bounds.xMax + 2, randomRange(bounds.yMin, bounds.yMax), randomRange(bounds.zMin, bounds.zMax))
      end.set(bounds.xMin - 2, randomRange(bounds.yMin, bounds.yMax), randomRange(bounds.zMin, bounds.zMax))
    } else if (edge === 2) {
      // Top -> Bottom
      start.set(randomRange(bounds.xMin, bounds.xMax), bounds.yMax + 2, randomRange(bounds.zMin, bounds.zMax))
      end.set(randomRange(bounds.xMin, bounds.xMax), bounds.yMin - 2, randomRange(bounds.zMin, bounds.zMax))
    } else {
      // Bottom -> Top
      start.set(randomRange(bounds.xMin, bounds.xMax), bounds.yMin - 2, randomRange(bounds.zMin, bounds.zMax))
      end.set(randomRange(bounds.xMin, bounds.xMax), bounds.yMax + 2, randomRange(bounds.zMin, bounds.zMax))
    }

    const direction = end.clone().sub(start).normalize()
    const speed = randomRange(0.5, 0.9)
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]

    return {
      position: start,
      direction,
      speed,
      tailPositions: [],
      color
    }
  }

  // Spawns a star
  const spawnStar = () => {
    setStars((prev) => [...prev, createShootingStarData()])
    scheduleNextSpawn()
  }

  // Schedules next star if tab is visible
  function scheduleNextSpawn() {
    if (!tabVisible.current) return
    spawnRef.current = setTimeout(() => {
      spawnStar()
    }, randomRange(1500, 3500))
  }

  useEffect(() => {
    // Visibility
    const handleVisibilityChange = () => {
      tabVisible.current = !document.hidden
      if (tabVisible.current) {
        scheduleNextSpawn()
      } else if (spawnRef.current) {
        clearTimeout(spawnRef.current)
        spawnRef.current = null
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Initial star spawns
    if (!document.hidden) {
      scheduleNextSpawn()
    }
    return () => {
      if (spawnRef.current) clearTimeout(spawnRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [bounds])

  // Move shooting stars each frame
  useFrame(() => {
    setStars((prevStars) =>
      prevStars
        .map((star) => {
          // move forward
          star.position.add(star.direction.clone().multiplyScalar(star.speed))

          // store tail positions
          star.tailPositions.push(star.position.clone())
          if (star.tailPositions.length > 12) {
            star.tailPositions.shift()
          }
          return star
        })
        .filter((star) => {
          const { x, y, z } = star.position
          // remove if fully out of bounding area
          if (
            x < bounds.xMin - 10 ||
            x > bounds.xMax + 10 ||
            y < bounds.yMin - 10 ||
            y > bounds.yMax + 10 ||
            z < bounds.zMin - 10 ||
            z > bounds.zMax + 10
          ) {
            return false
          }
          return true
        })
    )
  })

  return (
    <group>
      {stars.map((star, i) => {
        const headPos = star.position
        return (
          <group key={i}>
            {/* Star Head (larger star shape) */}
            <mesh position={headPos} geometry={headGeometry}>
              <meshBasicMaterial color={star.color} />
            </mesh>

            {/* Tail (smaller star shapes) */}
            {star.tailPositions.map((pos, j) => {
              const fade = j / star.tailPositions.length
              // Make the tail star smaller and fade out
              const scale = (1 - fade) * 0.6
              const opacity = 1 - fade
              return (
                <mesh
                  key={j}
                  position={pos}
                  geometry={tailGeometry}
                  scale={[scale, scale, scale]}
                >
                  <meshBasicMaterial color={star.color} transparent opacity={opacity} />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

// -----------------------------------------------------------------------------
// 7) The Main Scene: includes a group for parallax, distant stars, static stars,
//    and the shooting stars
// -----------------------------------------------------------------------------
function Scene({ mouse }) {
  const groupRef = useRef()
  const { size, camera } = useThree()
  const [bounds, setBounds] = useState(() => getBounds(window.innerWidth, window.innerHeight))

  // Recompute bounding area for shooting stars on resize
  useEffect(() => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    setBounds(getBounds(size.width, size.height))
  }, [size, camera])

  // A small color palette for static star variety
  const starPalette = ['#ffffff', '#ffcfdf', '#fde2ff', '#c7ceea', '#bffcc6']

  // Create a bunch of random static stars
  const [staticStars] = useState(() => {
    const stars = []
    const starCount = 70 // adjust for more/less
    for (let i = 0; i < starCount; i++) {
      // positions
      const x = (Math.random() - 0.5) * (size.width / 7)
      const y = (Math.random() - 0.5) * (size.height / 7)
      const z = (Math.random() - 0.5) * 30
      const starSize = randomRange(0.15, 0.35)
      const color = starPalette[Math.floor(Math.random() * starPalette.length)]
      stars.push({ position: [x, y, z], size: starSize, color })
    }
    return stars
  })

  // Subtle camera motion + parallax for everything
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()

    const targetRotX = Math.sin(elapsed * 0.15) * 0.07 + mouse.current.y * 0.15
    const targetRotY = Math.cos(elapsed * 0.2) * 0.07 + mouse.current.x * 0.15

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.02)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.02)
  })

  return (
    <group ref={groupRef}>
      {/* Big cloud of somewhat distant stars */}
      <DistantStars />

      {/* Render all the static, extruded stars */}
      {staticStars.map((star, i) => (
        <StaticStar key={i} position={star.position} size={star.size} color={star.color} />
      ))}

      {/* Shooting stars */}
      <ShootingStars bounds={bounds} />
    </group>
  )
}

// -----------------------------------------------------------------------------
// 8) Main DarkBackground Component
// -----------------------------------------------------------------------------
export default function DarkBackground() {
  const mouse = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })

  // If on mobile, render nothing
  if (isMobileDevice()) {
    return null
  }

  // Smooth mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    const updateMouse = () => {
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.1
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.1
      requestAnimationFrame(updateMouse)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    updateMouse()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className={`${styles.background} theme-transition`}>
      <Canvas
        camera={{ position: [0, 0, 35], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Optional post-processing for a subtle glow */}
        <EffectComposer>
          <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={0.8} />
          <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.85} />
          <ChromaticAberration offset={[0.0008, 0.0008]} />
        </EffectComposer>

        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
