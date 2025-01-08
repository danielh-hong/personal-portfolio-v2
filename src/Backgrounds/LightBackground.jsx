import React, { useEffect, useRef, useState } from 'react'
import styles from './LightBackground.module.css'

function isMobileDevice() {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent || navigator.vendor || (window.opera ?? '')
  return /Android|iPhone|iPad|iPod/i.test(ua)
}

const CLOUD_SHAPES = [
  `M10 25C10 31.0751 14.9249 36 21 36H79C85.0751 36 90 31.0751 90 25C90 18.9249 85.0751 14 79 14C78.6623 14 78.3284 14.0172 78 14.0508C76.7849 8.26197 71.7413 4 65.7143 4C61.2803 4 57.4283 6.43154 55.3407 10.0457C53.2547 7.55108 50.0722 6 46.5 6C41.4324 6 37.1256 9.20372 35.5751 13.7702C34.7141 13.2796 33.7451 13 32.7143 13C28.6538 13 25.3676 16.2862 25.3676 20.3467C25.3676 20.8162 25.4181 21.2743 25.5142 21.7163C24.0488 20.6386 22.2646 20 20.3333 20C14.6284 20 10 24.6284 10 30.3333C10 30.3333 10 27.6667 10 25Z`,
  `M15 20C15 26.0751 19.9249 31 26 31H74C80.0751 31 85 26.0751 85 20C85 13.9249 80.0751 9 74 9C71.5 9 69.2 9.8 67.3 11.1C65.4 6.6 60.9 3.5 55.7 3.5C49.5 3.5 44.3 7.7 43.2 13.3C41.9 12.5 40.3 12 38.6 12C34.4 12 31 15.4 31 19.6C31 20.2 31.1 20.8 31.2 21.4C29.8 20.5 28.2 20 26.4 20C20.9 20 16.4 24.5 16.4 30C16.4 30 15 26.1 15 20Z`
]

const BIRD = "M2.5 1.5C2.5 1.5 3.5 0.5 4 0.5C4.5 0.5 5.5 1.5 5.5 1.5L4 2.5L2.5 1.5Z"

export default function LightBackground() {
  const containerRef = useRef(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const isMobile = isMobileDevice()

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile || !containerRef.current) return

    const createCloud = () => {
      const cloud = document.createElement('div')
      cloud.className = styles.cloud

      const baseScale = windowSize.width < 768 ? 0.4 : 0.6
      const scale = baseScale + Math.random() * 0.8
      
      // Use full viewport height
      const yPos = Math.random() * 100 // 0-100vh
      
      // Vary speed based on height - higher clouds move slower
      const baseSpeed = windowSize.width < 768 ? 45 : 35
      const heightFactor = 1 - (yPos / 200) // Higher clouds are slower
      const duration = (baseSpeed + Math.random() * 20) * heightFactor

      const delay = -Math.random() * 40
      const cloudShape = CLOUD_SHAPES[Math.floor(Math.random() * CLOUD_SHAPES.length)]

      cloud.style.setProperty('--scale', scale)
      cloud.style.setProperty('--y-pos', `${yPos}vh`)
      cloud.style.setProperty('--duration', `${duration}s`)
      cloud.style.setProperty('--delay', `${delay}s`)

      const cloudSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      cloudSvg.setAttribute('viewBox', '0 0 100 40')
      cloudSvg.innerHTML = `<path d="${cloudShape}" fill="currentColor"/>`
      
      cloud.appendChild(cloudSvg)
      containerRef.current.appendChild(cloud)

      cloud.addEventListener('animationend', () => cloud.remove())
    }

    const createBird = () => {
      const bird = document.createElement('div')
      bird.className = styles.bird

      const scale = windowSize.width < 768 ? 0.6 : 1
      // Birds also use full viewport height
      const yPos = Math.random() * 80 + 10 // 10-90vh
      const duration = 8 + Math.random() * 4
      const delay = Math.random() * -20

      bird.style.setProperty('--scale', scale)
      bird.style.setProperty('--y-pos', `${yPos}vh`)
      bird.style.setProperty('--duration', `${duration}s`)
      bird.style.setProperty('--delay', `${delay}s`)

      const birdSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      birdSvg.setAttribute('viewBox', '0 0 8 3')
      birdSvg.innerHTML = `<path d="${BIRD}" fill="currentColor"/>`

      bird.appendChild(birdSvg)
      containerRef.current.appendChild(bird)

      bird.addEventListener('animationend', () => bird.remove())
    }

    // Create more initial clouds for better distribution
    for (let i = 0; i < (windowSize.width < 768 ? 6 : 10); i++) {
      createCloud()
    }

    const cloudInterval = setInterval(createCloud, 8000)
    const birdInterval = setInterval(createBird, 6000)

    return () => {
      clearInterval(cloudInterval)
      clearInterval(birdInterval)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [isMobile, windowSize])

  if (isMobile) return null

  return (
    <div className={styles.background}>
      <div className={styles.gradient} />
      <div className={styles.sun} />
      <div ref={containerRef} className={styles.elementContainer} />
    </div>
  )
}
