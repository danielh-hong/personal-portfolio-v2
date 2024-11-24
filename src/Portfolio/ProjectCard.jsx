// src/Portfolio/ProjectCard.jsx
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import styles from './ProjectCard.module.css'

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={styles.card}
      onClick={onClick}
    >
      <div className={styles.imageWrapper}>
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <Eye className={styles.icon} />
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.category}>{project.category.join(', ')}</p>
        {project.date && <p className={styles.date}>{project.date}</p>}
      </div>
    </motion.div>
  )
}

export default ProjectCard
