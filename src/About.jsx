import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setCodeVisible(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (codeVisible && activeLine < codeLines.length - 1) {
      const timeout = setTimeout(() => {
        setActiveLine(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [codeVisible, activeLine]);

  const codeLines = [
    { type: 'comment', content: '// Welcome to my digital space' },
    { type: 'code', content: 'const profile = {' },
    { type: 'property', content: '  name: "Daniel Hong",' },
    { type: 'property', content: '  role: "Engineering Science Student",' },
    { type: 'property', content: '  university: "University of Toronto",' },
    { type: 'array-start', content: '  expertise: [' },
    { type: 'array-item', content: '    "Robotics & Controls",' },
    { type: 'array-item', content: '    "Full-Stack Development",' },
    { type: 'array-item', content: '    "Machine Learning"' },
    { type: 'array-end', content: '  ],' },
    { type: 'array-start', content: '  projects: [' },
    { type: 'array-item', content: '    "Quadcopter Design @ UTAT",' },
    { type: 'array-item', content: '    "Wind Turbine Nacelle @ UWind"' },
    { type: 'array-end', content: '  ],' },
    { type: 'array-start', content: '  passions: [' },
    { type: 'array-item', content: '    "Piano & Violin",' },
    { type: 'array-item', content: '    "Photography",' },
    { type: 'array-item', content: '    "Track Athletics"' },
    { type: 'array-end', content: '  ]' },
    { type: 'code', content: '};' },
    { type: 'comment', content: '// Building the future through innovation' }
  ];

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.terminalTitle}>profile.js</div>
        </div>
        
        <motion.div 
          className={styles.terminalBody}
          initial={{ opacity: 0 }}
          animate={{ opacity: codeVisible ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              className={`${styles.line} ${styles[line.type]}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: index <= activeLine ? 1 : 0,
                x: index <= activeLine ? 0 : -10
              }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05
              }}
            >
              {line.content}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className={styles.quote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        "Creating the future through code and innovation"
      </motion.div>
    </motion.div>
  );
};

export default About;