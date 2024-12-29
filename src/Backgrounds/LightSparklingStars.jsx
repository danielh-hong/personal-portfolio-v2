// LightSparklingStars.jsx

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'

// A small helper for random range
function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

export default function LightSparklingStars() {
  const [stars, setStars] = useState([])

  const spawnTimeout = useRef(null)

  // Each star: { position: Vector3, life: number, fadeIn: boolean }
  // We'll spawn stars at random intervals to avoid them all showing at once
  const spawnStar = () => {
    const newStar = {
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 60, // X around center
        (Math.random() - 0.5) * 40, // Y
        (Math.random() - 0.5) * 40  // Z
      ),
      life: 0,
      fadeIn: true
    }
    setStars((prev) => [...prev, newStar])
  }

  const scheduleNextSpawn = () => {
    spawnTimeout.current = setTimeout(() => {
      spawnStar()
      scheduleNextSpawn()
    }, randomRange(1500, 3000)) // spawn interval 1.5s - 3s
  }

  useEffect(() => {
    scheduleNextSpawn()
    return () => {
      if (spawnTimeout.current) clearTimeout(spawnTimeout.current)
    }
  }, [])

  useFrame(() => {
    setStars((prevStars) => {
      return prevStars
        .map((star) => {
          // increment star life
          star.life += 0.01
          // after some time, fade it out
          if (star.life > 4) star.fadeIn = false
          return star
        })
        .filter((star) => {
          // remove once fully faded out
          return star.life < 5
        })
    })
  })

  return (
    <group>
      {stars.map((star, i) => {
        // fade from 0..1..0
        const opacity = star.fadeIn
          ? Math.min(1, star.life) // fade in up to 1
          : Math.max(0, 1 - (star.life - 4)) // fade out after 4s

        return (
          <mesh key={i} position={star.position}>
            {/* a small plane or sphere, let's do a small plane for "twinkle" */}
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial
              color="#ffffaa"
              transparent
              opacity={opacity}
            />
          </mesh>
        )
      })}
    </group>
  )
}
