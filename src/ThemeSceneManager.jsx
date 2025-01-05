import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import LightScene from './LightScene';
import DarkScene from './DarkScene';
import styles from './Scene.module.css';

const ThemeSceneManager = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.sceneWrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.sceneContainer}
        >
          {theme === 'light' ? <LightScene /> : <DarkScene />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ThemeSceneManager;