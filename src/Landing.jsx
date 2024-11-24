// Landing.jsx
import React, { useState } from 'react';
import ParticleFlowBackground from './ParticleFlowBackground';
import styles from './Landing.module.css';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const [zoomTrigger, setZoomTrigger] = useState(false);

  const handleGetStarted = () => {
    setZoomTrigger(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundWrapper}>
        <ParticleFlowBackground triggerZoom={zoomTrigger} />
      </div>

      <div className={`${styles.content} ${zoomTrigger ? styles.fadeOut : ''}`}>
        <h1 className={styles.title}>Hi. I'm Daniel Hong.</h1>
        <h2 className={styles.subtitle}>Welcome to my corner of the Universe...</h2>
        {!zoomTrigger && (
          <button className={styles.button} onClick={handleGetStarted}>
            Learn More About Me
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Landing;
