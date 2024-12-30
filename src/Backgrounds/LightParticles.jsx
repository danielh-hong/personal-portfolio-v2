// LightParticles.jsx

import * as THREE from 'three'
import { useMemo, useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

// -----------------------------------------------------------------------------
// Shape Components
// -----------------------------------------------------------------------------
export const CubeParticle = ({ position, size, rotation, color }) => (
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

export const SphereParticle = ({ position, size, rotation, color }) => (
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

// We'll skip some heavier geometry on mobile
export const CrystalParticle = ({ position, size, rotation, color }) => (
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

export const TorusParticle = ({ position, size, rotation, color }) => (
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

export const PrismParticle = ({ position, size, rotation, color }) => (
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

export const SpiralParticle = ({ position, size, rotation, color }) => {
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

export const BlobParticle = ({ position, size, rotation, color }) => (
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

export const OctahedronParticle = ({ position, size, rotation, color }) => (
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

export const StarParticle = ({ position, size, rotation, color }) => {
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
// ParticleField
// -----------------------------------------------------------------------------
export function ParticleField({ mouse, onParticleExplode, isMobile }) {
  const group = useRef()
  const cameraRotation = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Watch for window resize
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

  // Generate fewer shapes if mobile
  const particles = useMemo(() => {
    // We drastically reduce count on mobile
    const count = isMobile ? 20 : 85
    const colors = [
      '#ffa3a3', '#ff91c1', '#e68fff',
      '#9fa3ff', '#9ffff8', '#91ffd0',
      '#fdff91', '#ffd59f', '#ff9f9f',
      '#ffe0f7', '#b4ffe0', '#9feaff'
    ]
    // Decide which shapes to include on mobile vs. desktop
    const desktopTypes = [
      'crystal', 'torus', 'prism', 'spiral',
      'cube', 'sphere', 'blob', 'octahedron', 'star'
    ]
    const mobileTypes = ['cube', 'sphere', 'octahedron', 'star']
    const chosenTypes = isMobile ? mobileTypes : desktopTypes

    const items = []
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

  // Renders the correct shape
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

  // Explode function
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

      const rippleForce = Math.sin(
        (1 - Math.min(1, distance / explosionRadius)) * Math.PI
      ) * explosionForce

      const randomAngle = Math.random() * Math.PI * 2
      const randomForce = Math.random() * 0.3

      particle.velocity[0] += (dx / distance) * rippleForce + Math.cos(randomAngle) * randomForce
      particle.velocity[1] += (dy / distance) * rippleForce + Math.sin(randomAngle) * randomForce
      particle.velocity[2] += (dz / distance) * rippleForce * 0.5

      // Tweak rotation on explosion
      particle.rotationSpeed = [
        particle.rotationSpeed[0] + (Math.random() - 0.5) * 0.003,
        particle.rotationSpeed[1] + (Math.random() - 0.5) * 0.003,
        particle.rotationSpeed[2] + (Math.random() - 0.5) * 0.003
      ]
    })
  }

  // Expose explode to parent
  useEffect(() => {
    if (onParticleExplode) {
      onParticleExplode.current = explodeParticles
    }
  }, [onParticleExplode, particles])

  // Click => explode
  const handlePointerDown = (event) => {
    event.stopPropagation()
    if (event.point) {
      explodeParticles(event.point)
    }
  }

  // Animate
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Subtle base camera rotation
    cameraRotation.current.x = Math.sin(time * 0.15) * 0.08
    cameraRotation.current.y = Math.cos(time * 0.2) * 0.08

    // Mouse-based offset
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

      // Gentle bobbing
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

      // Pull back toward original
      mesh.position.x += (particle.originalPosition[0] - mesh.position.x) * 0.01
      mesh.position.y += (particle.originalPosition[1] - mesh.position.y) * 0.01
      mesh.position.z += (particle.originalPosition[2] - mesh.position.z) * 0.01
    })
  })

  return (
    <group ref={group} onPointerDown={handlePointerDown} pointerEvents="auto">
      {particles.map((particle, i) => renderParticle(particle, i))}
    </group>
  )
}
