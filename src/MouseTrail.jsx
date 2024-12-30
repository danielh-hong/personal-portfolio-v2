import React, { useEffect, useRef, useState } from 'react';

const MouseTrail = () => {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef();
  const counterRef = useRef(0);
  const particleIdCounter = useRef(0);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 500);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Create mouse trail particle
  const createTrailParticle = (x, y) => {
    const size = Math.random() * 4 + 2; // Smaller, bubbly size
    return {
      id: particleIdCounter.current++,
      x: x + Math.random() * 20 - 10, // Random offset like original
      y: y + Math.random() * 20 - 10,
      size,
      life: 1,
      color: `hsla(${Math.random() * 60 + 200}, 85%, 70%, 0.6)`, // Soft blue-purple range
      isClick: false
    };
  };

  // Create click burst particle
  const createClickParticle = (x, y) => {
    const id = particleIdCounter.current++;
    const size = Math.random() * 15 + 10;
    const angle = Math.random() * Math.PI * 2;
    const velocity = {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2
    };
    
    return {
      id,
      x,
      y,
      size,
      color: `hsla(${Math.random() * 60 + 200}, 80%, 60%, ${Math.random() * 0.5 + 0.5})`,
      velocity,
      life: 1,
      isClick: true
    };
  };

  useEffect(() => {
    if (isMobile) return; // Skip adding listeners on mobile

    const handleMouseMove = (e) => {
      counterRef.current++;

      if (counterRef.current % 4 === 0) { // Same timing as original
        const newParticle = createTrailParticle(e.clientX, e.clientY);
        setParticles(prev => [...prev, newParticle].slice(-50)); // Keep reasonable number of particles
      }
    };

    const handleClick = (e) => {
      const newParticles = Array.from({ length: 12 }, () =>
        createClickParticle(e.clientX, e.clientY)
      );
      setParticles(prev => [...prev, ...newParticles].slice(-100));
    };

    const animate = () => {
      setParticles(prevParticles => {
        return prevParticles
          .map(particle => {
            if (particle.isClick) {
              // Click particle behavior
              return {
                ...particle,
                x: particle.x + particle.velocity.x,
                y: particle.y + particle.velocity.y,
                life: particle.life - 0.02,
                size: particle.size * 0.95
              };
            } else {
              // Trail particle behavior - simple fade out
              return {
                ...particle,
                life: particle.life - 0.04
              };
            }
          })
          .filter(particle => particle.life > 0);
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null; // Don't render component on mobile

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden'
      }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.life,
            transform: `translate(-50%, -50%) scale(${particle.isClick ? particle.life : 1})`,
            boxShadow: `0 0 ${particle.size * (particle.isClick ? 2 : 1)}px ${particle.color}`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform, opacity',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;
