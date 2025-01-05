import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Circle, Rect, Group } from 'react-konva';
import styles from './LightScene.module.css';

const Cloud = ({ x, y, scale = 1, opacity = 0.6 }) => {
  const [offsetX, setOffsetX] = useState(0);
  const speed = useRef(Math.random() * 0.3 + 0.1);
  const range = useRef(40);

  useEffect(() => {
    let animFrame;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newOffset = Math.sin(elapsed / 2000) * range.current * speed.current;
      setOffsetX(newOffset);
      animFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const circles = [
    { x: 0, y: 0, radius: 35 },
    { x: 40, y: -5, radius: 40 },
    { x: 80, y: 0, radius: 35 },
    { x: 20, y: 10, radius: 30 },
    { x: 60, y: 5, radius: 38 }
  ];

  return (
    <Group
      x={x + offsetX}
      y={y}
      shadowColor="#e0e0e0"
      shadowBlur={25}
      shadowOffsetY={10}
      shadowOpacity={0.5}
    >
      {circles.map((circle, i) => (
        <Circle
          key={i}
          x={circle.x * scale}
          y={circle.y * scale}
          radius={circle.radius * scale}
          fill="#ffffff"
          opacity={opacity}
        />
      ))}
    </Group>
  );
};

const Sun = ({ x, y, scale = 1 }) => {
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    let animFrame;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newGlow = 1 + Math.sin(elapsed / 1000) * 0.1;
      setGlowIntensity(newGlow);
      animFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <>
      <Circle
        x={x}
        y={y}
        radius={80 * scale * glowIntensity}
        fill="rgba(255, 244, 214, 0.25)"
        shadowColor="#FFE5B4"
        shadowBlur={40}
        shadowOpacity={0.6}
      />
      <Circle
        x={x}
        y={y}
        radius={60 * scale * glowIntensity}
        fill="rgba(255, 244, 214, 0.35)"
        shadowColor="#FFE5B4"
        shadowBlur={30}
        shadowOpacity={0.5}
      />
      <Circle
        x={x}
        y={y}
        radius={45 * scale}
        fill="#FFE5B4"
        opacity={0.95}
        shadowColor="#FFD700"
        shadowBlur={25}
        shadowOpacity={0.4}
      />
    </>
  );
};

const LightScene = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const scale = Math.min(dimensions.width / 1000, dimensions.height / 800);

  return (
    <div className={styles.container} ref={containerRef}>
      <Stage width={dimensions.width} height={dimensions.height} className={styles.canvasContainer}>
        <Layer>
          <Rect
            width={dimensions.width}
            height={dimensions.height}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 0, y: dimensions.height }}
            fillLinearGradientColorStops={[0, '#ffffff', 1, '#fafafa']}
          />
          
          <Sun 
            x={dimensions.width * 0.85} 
            y={dimensions.height * 0.15} 
            scale={scale * 1.2}
          />
          
          <Cloud 
            x={dimensions.width * 0.15} 
            y={dimensions.height * 0.3} 
            scale={scale * 1.2} 
            opacity={0.9}
          />
          <Cloud 
            x={dimensions.width * 0.45} 
            y={dimensions.height * 0.2} 
            scale={scale} 
            opacity={0.85}
          />
          <Cloud 
            x={dimensions.width * 0.75} 
            y={dimensions.height * 0.35} 
            scale={scale * 1.1} 
            opacity={0.9}
          />
          <Cloud 
            x={dimensions.width * 0.3} 
            y={dimensions.height * 0.15} 
            scale={scale * 0.9} 
            opacity={0.8}
          />
          <Cloud 
            x={dimensions.width * 0.6} 
            y={dimensions.height * 0.25} 
            scale={scale * 1.3} 
            opacity={0.9}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default LightScene;