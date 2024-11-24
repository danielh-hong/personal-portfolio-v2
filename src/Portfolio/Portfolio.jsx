// src/pages/Portfolio/Portfolio.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from './projects'
import ProjectCard from './components/ProjectCard'
import ProjectModal from './components/ProjectModal'
import styles from './Portfolio.module.css'

const categories = ['All', 'Engineering', 'Web Dev & Design', 'Videos', 'Papers']

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category.includes(selectedCategory)
  )

  return (
    <div className={styles.portfolio}>
      <header className={styles.header}>
        <h2 className={styles.title}>Portfolio</h2>
        <div className={styles.filters}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <motion.div 
        layout 
        className={styles.grid}
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio
