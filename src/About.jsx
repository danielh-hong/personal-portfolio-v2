// About.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, FaCode, FaMusic, 
  FaPlaneDeparture, FaChevronDown, FaChevronUp,
  FaBrain, FaRobot, FaServer, FaTools
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  const [isCodeExpanded, setIsCodeExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (isMobileView && isCodeExpanded) {
        setIsCodeExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    {
      title: 'Education',
      icon: <FaGraduationCap />,
      description: 'Engineering Science at UofT, specializing in robotics and aerospace systems.'
    },
    {
      title: 'Current Projects',
      icon: <FaPlaneDeparture />,
      description: 'Working on quadcopter design with UTAT and wind turbine nacelle design with UWind.'
    },
    {
      title: 'Technical Skills',
      icon: <FaCode />,
      description: 'SolidWorks, Machine Learning, Full-Stack Development, Robotics'
    },
    {
      title: 'Beyond Engineering',
      icon: <FaMusic />,
      description: 'Piano & violin player, former varsity track athlete, and photography enthusiast'
    }
  ];

  return (
    <motion.div 
      className={styles.about}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.codeBlockWrapper}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className={styles.codeBlockHeader}
          onClick={() => setIsCodeExpanded(!isCodeExpanded)}
          role="button"
          tabIndex={0}
          aria-expanded={isCodeExpanded}
        >
          <span className={styles.headerText}>
            {isMobile ? "View Profile Information" : "// profile.js"}
          </span>
          {isMobile && (
            <motion.span
              animate={{ rotate: isCodeExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={styles.expandIcon}
            >
              <FaChevronDown />
            </motion.span>
          )}
        </div>

        <AnimatePresence initial={false}>
          {(isCodeExpanded || !isMobile) && (
            <motion.div 
              className={styles.codeBlock}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: { duration: 0.4 },
                  opacity: { duration: 0.3, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.4 },
                  opacity: { duration: 0.3 }
                }
              }}
            >
              <div className={styles.line}>
                <span className={styles.comment}>// Hello World! Welcome to my portfolio</span>
              </div>
              
              <div className={styles.line}>
                <span className={styles.keyword}>const</span>
                <span className={styles.variable}> profile</span>
                <span className={styles.operator}> = </span>
                <span className={styles.curly}>{'{'}</span>
              </div>

              <div className={`${styles.line} ${styles.indented}`}>
                <span className={styles.property}>name:</span>
                <span className={styles.string}>"Daniel Hong"</span>,
              </div>

              <div className={`${styles.line} ${styles.indented}`}>
                <span className={styles.property}>title:</span>
                <span className={styles.string}>"Engineering Science Student"</span>,
              </div>

              <div className={`${styles.line} ${styles.indented}`}>
                <span className={styles.property}>university:</span>
                <span className={styles.string}>"University of Toronto"</span>,
              </div>

              <div className={`${styles.line} ${styles.indented}`}>
                <span className={styles.property}>interests:</span>
                <span className={styles.bracket}>[</span>
                <span className={styles.string}>"ECE"</span>,
                <span className={styles.string}>"Web Development"</span>,
                <span className={styles.string}>"Machine Learning"</span>
                <span className={styles.bracket}>]</span>,
              </div>
              <div className={styles.line}>
                <span className={styles.curly}>{'}'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Divider Line */}
      <div className={styles.divider}></div>

      <motion.div 
        className={styles.skillsGrid}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.title}
            className={`${styles.skillItem} ${activeSection === index ? styles.active : ''}`}
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection(activeSection === index ? null : index)}
          >
            <div className={styles.skillIcon}>
              {skill.icon}
            </div>
            <div className={styles.skillContent}>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className={styles.quote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        "Life is all about creating the best version of myself"
      </motion.div>
    </motion.div>
  );
};

export default About;