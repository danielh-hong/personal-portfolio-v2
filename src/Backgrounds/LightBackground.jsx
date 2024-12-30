// LightBackground.jsx

import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import LightScene from './LightScene'
import styles from './LightBackground.module.css'

// Detect mobile devices
function isMobileDevice() {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent || navigator.vendor || (window.opera ?? '')
  if (/Android/i.test(ua)) return true
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  return false
}

const LightBackground = () => {
  const mouse = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile once on mount
  useEffect(() => {
    setIsMobile(isMobileDevice())
  }, [])

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
      {/* If on mobile, do NOT render the 3D Canvas at all */}
      {isMobile ? null : (
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
            // Clamp pixel ratio for performance
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            gl.setSize(window.innerWidth, window.innerHeight)
          }}
        >
          {/* Pass mouse + isMobile down so we can optimize further */}
          <LightScene mouse={mouse} isMobile={isMobile} />
        </Canvas>
      )}
    </div>
  )
}

export default LightBackground
