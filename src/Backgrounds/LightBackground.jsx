// LightBackground.jsx

import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import LightScene from './LightScene'
import styles from './LightBackground.module.css'

const LightBackground = () => {
  const mouse = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })

  // Smooth mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      targetMouse.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2
      }
    }

    const updateMouse = () => {
      mouse.current = {
        x: mouse.current.x + (targetMouse.current.x - mouse.current.x) * 0.05,
        y: mouse.current.y + (targetMouse.current.y - mouse.current.y) * 0.05
      }
      requestAnimationFrame(updateMouse)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    updateMouse()

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.background}>
      <Canvas
        resize={{ debounce: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 0, 30], fov: 70 }}
        onCreated={({ gl }) => {
          // Attempt to clamp pixel ratio to reduce WebGL crashes at extreme zooms
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.setSize(window.innerWidth, window.innerHeight)
        }}
      >
        <LightScene mouse={mouse} />
      </Canvas>
    </div>
  )
}

export default LightBackground
