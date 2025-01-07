import React, { useEffect, useRef, useState } from 'react';

const MouseTrail = () => {
  const [particles, setParticles] = useState([]);
  const requestRef = useRef();
  const counterRef = useRef(0);
  const particleIdCounter = useRef(0);

  // Create mouse trail particle - simplified for performance
  const createTrailParticle = (x, y) => ({
    id: particleIdCounter.current++,
    x,
    y,
    size: 3, // Fixed size for better performance
    life: 1,
    color: 'hsla(220, 85%, 70%, 0.6)', // Fixed color for better performance
    isClick: false
  });

  // Create click burst particle - simplified for performance
  const createClickParticle = (x, y) => {
    const angle = Math.random() * Math.PI * 2;
    return {
      id: particleIdCounter.current++,
      x,
      y,
      size: 12, // Fixed size for better performance
      velocity: {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2
      },
      color: 'hsla(220, 80%, 60%, 0.8)', // Fixed color for better performance
      life: 1,
      isClick: true
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      counterRef.current++;
      
      // Only create particle every 6 frames instead of 4
      if (counterRef.current % 6 === 0) {
        const newParticle = createTrailParticle(e.clientX, e.clientY);
        setParticles(prev => [...prev.slice(-20), newParticle]); // Keep only last 20 particles
      }
    };

    const handleClick = (e) => {
      const newParticles = Array.from({ length: 6 }, () => // Reduced from 12 to 6
        createClickParticle(e.clientX, e.clientY)
      );
      setParticles(prev => [...prev.slice(-30), ...newParticles]); // Keep only last 30 total
    };

    const animate = () => {
      setParticles(prevParticles => {
        return prevParticles
          .map(particle => {
            if (particle.isClick) {
              return {
                ...particle,
                x: particle.x + particle.velocity.x,
                y: particle.y + particle.velocity.y,
                life: particle.life - 0.04, // Faster fadeout
                size: particle.size * 0.96 // Faster shrink
              };
            } else {
              return {
                ...particle,
                life: particle.life - 0.06 // Faster fadeout for trail
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
  }, []);

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
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;