import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Brain, Layers } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

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
    { type: 'comment', content: '// Building the future ...' },
    { type: 'code', content: 'const daniel = {' },
    { type: 'property', content: '  role: "Electrical & Computer Engineering",' },
    { type: 'array-start', content: '  focus: [' },
    { type: 'array-item', content: '    "Software Engineering",' },
    { type: 'array-item', content: '    "Product Development",' },
    { type: 'array-item', content: '    "Machine Intelligence"' },
    { type: 'array-end', content: '  ]' },
    { type: 'code', content: '};' }
  ];

  const focusAreas = [
    { 
      icon: <Cpu strokeWidth={1.5} />, 
      title: "ECE",
      desc: "Hardware & Systems",
      color: "var(--primary)"
    },
    { 
      icon: <Code2 strokeWidth={1.5} />, 
      title: "Software",
      desc: "Engineering & Architecture",
      color: "var(--accent-success)"
    },
    { 
      icon: <Layers strokeWidth={1.5} />, 
      title: "Products",
      desc: "Design & Development",
      color: "var(--accent-warning)"
    },
    { 
      icon: <Brain strokeWidth={1.5} />, 
      title: "ML/AI",
      desc: "Intelligence Systems",
      color: "var(--accent-error)"
    }
  ];

  const skills = [
    { name: "Python", category: "languages", color: "var(--primary)" },
    { name: "C++", category: "languages", color: "var(--primary)" },
    { name: "JavaScript", category: "languages", color: "var(--primary)" },
    { name: "React", category: "frontend", color: "var(--accent-success)" },
    { name: "Node.js", category: "backend", color: "var(--accent-warning)" },
    { name: "MongoDB", category: "database", color: "var(--accent-error)" },
    { name: "PostgreSQL", category: "database", color: "var(--accent-error)" },
    { name: "PyTorch", category: "ml", color: "var(--primary-light)" },
    { name: "TensorFlow", category: "ml", color: "var(--primary-light)" },
    { name: "Docker", category: "devops", color: "var(--secondary-dark)" },
    { name: "AWS", category: "cloud", color: "var(--secondary-light)" },
    { name: "Git", category: "devops", color: "var(--secondary-dark)" },
    { name: "Linux", category: "systems", color: "var(--secondary-dark)" },
    { name: "TypeScript", category: "languages", color: "var(--primary)" },
    { name: "Kubernetes", category: "devops", color: "var(--secondary-dark)" },
    { name: "Redux", category: "frontend", color: "var(--accent-success)" }
  ];

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.terminalTitle}>daniel.config.js</div>
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

      <div className={styles.content}>
        <motion.div 
          className={styles.focusGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {focusAreas.map((area, index) => (
            <motion.div 
              key={area.title}
              className={styles.focusItem}
              style={{ '--focus-color': area.color }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <div className={styles.focusIcon}>{area.icon}</div>
              <div className={styles.focusText}>
                <div className={styles.focusTitle}>{area.title}</div>
                <div className={styles.focusDesc}>{area.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.skillsGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.skillItem}
              style={{ '--skill-color': skill.color }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 1.2 + index * 0.05,
                type: "spring",
                stiffness: 400
              }}
              whileHover={{ 
                scale: 1.1,
                transition: { type: "spring", stiffness: 400 }
              }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <span className={styles.skillText}>{skill.name}</span>
              <div className={styles.skillCategory}>{skill.category}</div>
              <div className={styles.skillGlow} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;