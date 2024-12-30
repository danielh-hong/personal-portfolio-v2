import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  MeshDistortMaterial
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration
} from '@react-three/postprocessing'
import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import styles from './DarkBackground.module.css'

// -----------------------------------------------------------------------------
// Detect mobile
// -----------------------------------------------------------------------------
function isMobileDevice() {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent || navigator.vendor || (window.opera ?? '')
  if (/Android/i.test(ua)) return true
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  return false
}

// -----------------------------------------------------------------------------
// 1. Cube Particle
// -----------------------------------------------------------------------------
const CubeParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[size, size, size]} />
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.6}
      metalness={0.2}
      roughness={0.4}
      envMapIntensity={0.5}
      transmission={0.4}
      thickness={1.2}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 2. Sphere Particle
// -----------------------------------------------------------------------------
const SphereParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <sphereGeometry args={[size, 32, 32]} />
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.65}
      metalness={0.3}
      roughness={0.3}
      envMapIntensity={0.6}
      transmission={0.4}
      thickness={1.0}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 3. Crystal Particle
// -----------------------------------------------------------------------------
const CrystalParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <polyhedronGeometry
      args={[
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 2],
        size * 0.8
      ]}
    />
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.5}
      metalness={0.1}
      roughness={0.4}
      envMapIntensity={0.7}
      transmission={0.6}
      thickness={1.5}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 4. Torus Particle
// -----------------------------------------------------------------------------
const TorusParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <torusGeometry args={[size, size * 0.2, 16, 30]} />
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.4}
      metalness={0.2}
      roughness={0.4}
      envMapIntensity={0.8}
      clearcoat={0.4}
      clearcoatRoughness={0.3}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 5. Prism Particle
// -----------------------------------------------------------------------------
const PrismParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <cylinderGeometry args={[size * 0.5, size * 0.5, size * 1.2, 6, 1]} />
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.45}
      metalness={0.1}
      roughness={0.3}
      envMapIntensity={0.6}
      transmission={0.4}
      thickness={1.2}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 6. Spiral Particle (We may skip using it on mobile if desired)
// -----------------------------------------------------------------------------
const SpiralParticle = ({ position, size, rotation, color }) => {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -size, 0),
      new THREE.Vector3(size * 0.5, -size * 0.5, size * 0.5),
      new THREE.Vector3(-size * 0.5, 0, -size * 0.5),
      new THREE.Vector3(size * 0.5, size * 0.5, size * 0.5),
      new THREE.Vector3(0, size, 0),
    ])
    return new THREE.TubeGeometry(curve, 64, size * 0.15, 8, false)
  }, [size])

  return (
    <mesh position={position} rotation={rotation} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.5}
        metalness={0.1}
        roughness={0.4}
        envMapIntensity={0.5}
        clearcoat={0.4}
      />
    </mesh>
  )
}

// -----------------------------------------------------------------------------
// 7. Blob Particle
// -----------------------------------------------------------------------------
const BlobParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <sphereGeometry args={[size, 32, 32]} />
    <MeshDistortMaterial
      color={color}
      distort={0.4}
      speed={2}
      roughness={0.2}
      metalness={0.3}
      envMapIntensity={0.6}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 8. Octahedron Particle
// -----------------------------------------------------------------------------
const OctahedronParticle = ({ position, size, rotation, color }) => (
  <mesh position={position} rotation={rotation}>
    <octahedronGeometry args={[size, 0]} />
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.5}
      metalness={0.2}
      roughness={0.3}
      envMapIntensity={0.7}
      transmission={0.4}
      thickness={1.0}
    />
  </mesh>
)

// -----------------------------------------------------------------------------
// 9. Custom Star Particle (2D Star shape extruded slightly)
// -----------------------------------------------------------------------------
const StarParticle = ({ position, size, rotation, color }) => {
  const geometry = useMemo(() => {
    const starShape = new THREE.Shape()
    const outerRadius = size
    const innerRadius = size * 0.45
    const spikes = 5

    let rot = (Math.PI / 2) * 3
    let step = Math.PI / spikes

    starShape.moveTo(0, -outerRadius)
    for (let i = 0; i < spikes; i++) {
      let x = Math.cos(rot) * outerRadius
      let y = Math.sin(rot) * outerRadius
      starShape.lineTo(x, y)
      rot += step

      x = Math.cos(rot) * innerRadius
      y = Math.sin(rot) * innerRadius
      starShape.lineTo(x, y)
      rot += step
    }
    starShape.closePath()

    // Extrude a little to give the star some thickness
    const extrudeSettings = { depth: size * 0.1, bevelEnabled: false }
    return new THREE.ExtrudeGeometry(starShape, extrudeSettings)
  }, [size])

  return (
    <mesh position={position} rotation={rotation} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.5}
        metalness={0.3}
        roughness={0.3}
        envMapIntensity={0.8}
      />
    </mesh>
  )
}

// -----------------------------------------------------------------------------
// Utility functions
// -----------------------------------------------------------------------------
function getBounds(width, height) {
  const xExtent = Math.max(30, width / 25) + 5
  const yExtent = Math.max(20, height / 25) + 5
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

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

// -----------------------------------------------------------------------------
// ShootingStars (skipped on mobile by default)
// -----------------------------------------------------------------------------
function getRandomStarData(bounds) {
  const edge = Math.floor(Math.random() * 4)
  let start = new THREE.Vector3()
  let end = new THREE.Vector3()

  if (edge === 0) {
    // left -> right
    start.set(
      bounds.xMin - 2,
      randomRange(bounds.yMin, bounds.yMax),
      randomRange(bounds.zMin, bounds.zMax)
    )
    end.set(
      bounds.xMax + 2,
      randomRange(bounds.yMin, bounds.yMax),
      randomRange(bounds.zMin, bounds.zMax)
    )
  } else if (edge === 1) {
    // right -> left
    start.set(
      bounds.xMax + 2,
      randomRange(bounds.yMin, bounds.yMax),
      randomRange(bounds.zMin, bounds.zMax)
    )
    end.set(
      bounds.xMin - 2,
      randomRange(bounds.yMin, bounds.yMax),
      randomRange(bounds.zMin, bounds.zMax)
    )
  } else if (edge === 2) {
    // top -> bottom
    start.set(
      randomRange(bounds.xMin, bounds.xMax),
      bounds.yMax + 2,
      randomRange(bounds.zMin, bounds.zMax)
    )
    end.set(
      randomRange(bounds.xMin, bounds.xMax),
      bounds.yMin - 2,
      randomRange(bounds.zMin, bounds.zMax)
    )
  } else {
    // bottom -> top
    start.set(
      randomRange(bounds.xMin, bounds.xMax),
      bounds.yMin - 2,
      randomRange(bounds.zMin, bounds.zMax)
    )
    end.set(
      randomRange(bounds.xMin, bounds.xMax),
      bounds.yMax + 2,
      randomRange(bounds.zMin, bounds.zMax)
    )
  }

  const direction = end.clone().sub(start).normalize()
  const speed = randomRange(0.3, 0.8)

  return {
    position: start,
    direction,
    speed,
    tailPositions: [],
  }
}

function ShootingStars({ bounds }) {
  const [stars, setStars] = useState([])
  const spawnStarTimeout = useRef(null)
  const isTabVisible = useRef(!document.hidden)

  // Spawns a single star
  const spawnStar = () => {
    setStars((old) => [...old, getRandomStarData(bounds)])
  }

  // Schedules next star if tab is visible
  const scheduleNextSpawn = () => {
    if (!isTabVisible.current) return
    spawnStarTimeout.current = setTimeout(() => {
      spawnStar()
      scheduleNextSpawn()
    }, randomRange(2000, 5000))
  }

  // Handle tab visibility
  const handleVisibilityChange = () => {
    isTabVisible.current = !document.hidden
    if (isTabVisible.current) {
      scheduleNextSpawn()
    } else if (spawnStarTimeout.current) {
      clearTimeout(spawnStarTimeout.current)
      spawnStarTimeout.current = null
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    if (!document.hidden) scheduleNextSpawn()

    return () => {
      if (spawnStarTimeout.current) clearTimeout(spawnStarTimeout.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds])

  // Move/clean stars each frame
  useFrame(() => {
    setStars((prevStars) => {
      return prevStars
        .map((star) => {
          star.position.add(star.direction.clone().multiplyScalar(star.speed))
          // store tail positions
          star.tailPositions.push(star.position.clone())
          if (star.tailPositions.length > 8) {
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
    })
  })

  return (
    <group>
      {stars.map((star, i) => {
        const headPos = star.position
        return (
          <group key={i}>
            {/* Star head */}
            <mesh position={headPos}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Tail spheres */}
            {star.tailPositions.map((pos, j) => {
              const fade = j / star.tailPositions.length
              const size = 0.08 * fade
              const opacity = 0.5 * fade
              return (
                <mesh key={j} position={pos}>
                  <sphereGeometry args={[size, 6, 6]} />
                  <meshBasicMaterial
                    color="#fff"
                    transparent
                    opacity={opacity}
                  />
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
// ParticleField
// -----------------------------------------------------------------------------
const ParticleField = ({ mouse, onParticleExplode, isMobile }) => {
  const group = useRef()
  const cameraRotation = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Watch for window resizes
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const particles = useMemo(() => {
    // fewer particles on mobile
    const count = isMobile ? 20 : 85
    const items = []
    const desktopTypes = [
      'crystal', 'torus', 'prism', 'spiral',
      'cube', 'sphere', 'blob', 'octahedron', 'star'
    ]
    const mobileTypes = ['cube', 'sphere', 'octahedron', 'star']
    const chosenTypes = isMobile ? mobileTypes : desktopTypes

    const colors = [
      '#ffa3a3', '#ff91c1', '#e68fff',
      '#9fa3ff', '#9ffff8', '#91ffd0',
      '#fdff91', '#ffd59f', '#ff9f9f',
      '#ffe0f7', '#b4ffe0', '#9feaff'
    ]

    for (let i = 0; i < count; i++) {
      const type = chosenTypes[Math.floor(Math.random() * chosenTypes.length)]
      const x = (Math.random() - 0.5) * (windowSize.width / 9)
      const y = (Math.random() - 0.5) * (windowSize.height / 9)
      const z = (Math.random() - 0.5) * 50
      const size = Math.random() * 0.7 + 0.2
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ]
      const color = colors[Math.floor(Math.random() * colors.length)]
      items.push({
        type,
        position: [x, y, z],
        originalPosition: [x, y, z],
        size,
        rotation,
        color,
        velocity: [0, 0, 0],
        phase: Math.random() * Math.PI * 2,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001
        ]
      })
    }
    return items
  }, [windowSize, isMobile])

  const renderParticle = (particle, i) => {
    switch (particle.type) {
      case 'crystal':    return <CrystalParticle   key={i} {...particle} />
      case 'torus':      return <TorusParticle      key={i} {...particle} />
      case 'prism':      return <PrismParticle      key={i} {...particle} />
      case 'spiral':     return <SpiralParticle     key={i} {...particle} />
      case 'cube':       return <CubeParticle       key={i} {...particle} />
      case 'sphere':     return <SphereParticle     key={i} {...particle} />
      case 'blob':       return <BlobParticle       key={i} {...particle} />
      case 'octahedron': return <OctahedronParticle key={i} {...particle} />
      case 'star':       return <StarParticle       key={i} {...particle} />
      default:           return <SphereParticle     key={i} {...particle} />
    }
  }

  // Explode logic
  const explodeParticles = (position) => {
    const explosionForce = 0.6
    const explosionRadius = 55

    particles.forEach((particle, i) => {
      const mesh = group.current.children[i]
      const dx = mesh.position.x - position.x
      const dy = mesh.position.y - position.y
      const dz = mesh.position.z - position.z
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (distance < 0.001) return

      // rippleForce is stronger the closer you are to center
      const rippleForce = Math.sin(
        (1 - Math.min(1, distance / explosionRadius)) * Math.PI
      ) * explosionForce

      const randomAngle = Math.random() * Math.PI * 2
      const randomForce = Math.random() * 0.3

      particle.velocity[0] += (dx / distance) * rippleForce + Math.cos(randomAngle) * randomForce
      particle.velocity[1] += (dy / distance) * rippleForce + Math.sin(randomAngle) * randomForce
      particle.velocity[2] += (dz / distance) * rippleForce * 0.5

      particle.rotationSpeed = [
        particle.rotationSpeed[0] + (Math.random() - 0.5) * 0.003,
        particle.rotationSpeed[1] + (Math.random() - 0.5) * 0.003,
        particle.rotationSpeed[2] + (Math.random() - 0.5) * 0.003
      ]
    })
  }

  // Expose explode function to parent
  useEffect(() => {
    if (onParticleExplode) {
      onParticleExplode.current = explodeParticles
    }
  }, [onParticleExplode, particles])

  // Pointer down => explosion
  const handlePointerDown = (event) => {
    event.stopPropagation()
    if (event.point) {
      explodeParticles(new THREE.Vector3(event.point.x, event.point.y, event.point.z))
    }
  }

  // Animations
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Slight camera rotation
    cameraRotation.current.x = Math.sin(time * 0.15) * 0.08
    cameraRotation.current.y = Math.cos(time * 0.2) * 0.08

    // Incorporate mouse-based offset
    const targetRotationX = cameraRotation.current.x + mouse.current.y * 0.12
    const targetRotationY = cameraRotation.current.y + mouse.current.x * 0.12

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotationX,
      0.02
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY,
      0.02
    )

    // Update each particle
    particles.forEach((particle, i) => {
      const mesh = group.current.children[i]
      const depthFactor = 1 - Math.abs(particle.position[2]) / 50

      // Subtle bobbing
      mesh.position.y += Math.sin(time * 0.5 + particle.phase) * 0.0015 * depthFactor
      mesh.position.x += Math.cos(time * 0.3 + particle.phase) * 0.0015 * depthFactor

      // Rotation
      mesh.rotation.x += particle.rotationSpeed[0]
      mesh.rotation.y += particle.rotationSpeed[1]
      mesh.rotation.z += particle.rotationSpeed[2]

      // Velocity
      mesh.position.x += particle.velocity[0]
      mesh.position.y += particle.velocity[1]
      mesh.position.z += particle.velocity[2]

      // Damping
      particle.velocity[0] *= 0.96
      particle.velocity[1] *= 0.96
      particle.velocity[2] *= 0.96

      // Pull back toward original position
      mesh.position.x += (particle.originalPosition[0] - mesh.position.x) * 0.01
      mesh.position.y += (particle.originalPosition[1] - mesh.position.y) * 0.01
      mesh.position.z += (particle.originalPosition[2] - mesh.position.z) * 0.01
    })
  })

  return (
    <group
      ref={group}
      onPointerDown={handlePointerDown}
      pointerEvents="auto"
    >
      {particles.map((particle, i) => renderParticle(particle, i))}
    </group>
  )
}

// -----------------------------------------------------------------------------
// Scene
// -----------------------------------------------------------------------------
const Scene = ({ mouse, isMobile }) => {
  const particleExplodeRef = useRef()
  const { size, camera } = useThree()
  const [bounds, setBounds] = useState(() => getBounds(window.innerWidth, window.innerHeight))

  // Keep aspect ratio & update bounding box on resize
  useEffect(() => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    setBounds(getBounds(size.width, size.height))
  }, [size, camera])

  // Blow all particles away if user clicks on empty space
  const handlePointerMissed = () => {
    if (particleExplodeRef.current) {
      particleExplodeRef.current(new THREE.Vector3(0, 0, 0))
    }
  }

  return (
    <>
      {/* We can skip environment on mobile for performance */}
      {!isMobile && <Environment preset="night" background={false} />}

      {/* Lights */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.45}
      />
      <directionalLight
        color="#ffffff"
        position={[10, 15, 10]}
        intensity={1.0}
      />
      <directionalLight
        color="#ffffff"
        position={[-15, -10, 5]}
        intensity={0.6}
      />
      <ambientLight intensity={0.15} />

      {/* Main particles */}
      <ParticleField
        mouse={mouse}
        onParticleExplode={particleExplodeRef}
        isMobile={isMobile}
      />

      {/* Shooting stars (skipped on mobile) */}
      {!isMobile && <ShootingStars bounds={bounds} />}

      {/* Post-processing (skipped or reduced on mobile) */}
      {!isMobile && (
        <EffectComposer>
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.0015, 0.0012]} />
        </EffectComposer>
      )}

      {/* Missed click => explode everything */}
      <mesh onPointerMissed={handlePointerMissed} />
    </>
  )
}

// -----------------------------------------------------------------------------
// Main DarkBackground Component
// -----------------------------------------------------------------------------
const DarkBackground = () => {
  const mouse = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(isMobileDevice())

  // Update isMobile in real time if user resizes or rotates device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice())
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Smoothly track mouse to create gentle camera movements
  useEffect(() => {
    const handleMouseMove = (event) => {
      targetMouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      targetMouse.current.y = -(event.clientY / window.innerHeight - 0.5) * 2
    }

    const updateMouse = () => {
      // lerp to avoid abrupt movements
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05
      requestAnimationFrame(updateMouse)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    updateMouse()

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={`${styles.background} theme-transition`}>
      {/* Render the 3D Canvas only if not mobile */}
      {!isMobile && (
        <Canvas
          resize={{ debounce: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          camera={{ position: [0, 0, 35], fov: 70 }}
          onCreated={({ gl }) => {
            gl.setSize(window.innerWidth, window.innerHeight)
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          }}
        >
          <Scene mouse={mouse} isMobile={isMobile} />
        </Canvas>
      )}
    </div>
  )
}

export default DarkBackground
