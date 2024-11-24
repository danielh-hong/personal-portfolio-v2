// src/Portfolio/ProjectModal.jsx
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import styles from './ProjectModal.module.css'

const ProjectModal = ({ project, onClose }) => {
  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      className={styles.dialog}
    >
      <motion.div 
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={e => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>
            <X />
          </button>

          <img 
            src={project.images[0]} 
            alt={project.title}
            className={styles.mainImage} 
          />

          <div className={styles.details}>
            <h2 className={styles.title}>{project.title}</h2>
            <div className={styles.metadata}>
              <span>{project.date}</span>
              <span>{project.category.join(', ')}</span>
            </div>

            <div className={styles.description}>
              {project.description}
            </div>

            {project.technologies && (
              <div className={styles.technologies}>
                <h3>Technologies Used</h3>
                <div className={styles.techList}>
                  {project.technologies.map(tech => (
                    <span key={tech} className={styles.techItem}>{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {project.links && (
              <div className={styles.links}>
                {project.links.map(link => (
                  <a 
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}

            <div className={styles.gallery}>
              {project.images.slice(1).map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`${project.title} ${index + 2}`}
                  className={styles.galleryImage}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Dialog>
  )
}

export default ProjectModal
