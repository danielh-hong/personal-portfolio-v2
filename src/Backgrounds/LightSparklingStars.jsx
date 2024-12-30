// LightSparklingStars.jsx

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

export default function LightSparklingStars() {
  const [stars, setStars] = useState([])
  const spawnTimeout = useRef(null)

  // Create new star
  const spawnStar = () => {
    const newStar = {
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
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
    }, randomRange(1500, 3000))
  }

  useEffect(() => {
    scheduleNextSpawn()
    return () => {
      if (spawnTimeout.current) clearTimeout(spawnTimeout.current)
    }
  }, [])

  useFrame(() => {
    setStars((prevStars) =>
      prevStars
        .map((star) => {
          star.life += 0.01
          // after ~4 seconds, start fading out
          if (star.life > 4) star.fadeIn = false
          return star
        })
        // remove fully faded stars after ~5 seconds
        .filter((star) => star.life < 5)
    )
  })

  return (
    <group>
      {stars.map((star, i) => {
        const opacity = star.fadeIn
          ? Math.min(1, star.life)
          : Math.max(0, 1 - (star.life - 4))

        return (
          <mesh key={i} position={star.position}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial color="#ffffaa" transparent opacity={opacity} />
          </mesh>
        )
      })}
    </group>
  )
}
