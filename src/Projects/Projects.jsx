// Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Projects.module.css';
import ProjectsModal from './ProjectsModal';
import { projects, MEDIA_TYPES, TAGS } from './ProjectsData';

// In Projects.jsx
const getThumbnail = (project) => {
  if (project.thumbnail) {
    return project.thumbnail;
  }
  
  const firstImage = project.media.find(item => item.type === MEDIA_TYPES.IMAGE);
  if (firstImage) {
    return firstImage.url;
  }
  
  return '/images/project-placeholder.png';
};

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateMedia(-1);
          break;
        case 'ArrowRight':
          navigateMedia(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, currentMediaIndex, selectedProject]);

  const filteredProjects = projects.filter(project => 
    selectedTag === 'All' || project.tags.includes(selectedTag)
  );

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'unset';
  };

  const navigateMedia = (direction) => {
    if (!selectedProject) return;
    
    const newIndex = currentMediaIndex + direction;
    if (newIndex >= 0 && newIndex < selectedProject.media.length) {
      setCurrentMediaIndex(newIndex);
    }
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.filterContainer}>
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`${styles.filterTag} ${selectedTag === tag ? styles.active : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(project)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') openModal(project);
              }}
            >
              <div 
                className={styles.projectImage}
                style={{ backgroundImage: `url(${getThumbnail(project)})` }}
              />
              <div className={styles.overlay}>
                <div className={styles.projectSkills}>
                  {project.skills.map((skill, index) => (
                    <span key={index} className={styles.skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>{project.brief}</p>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectsModal 
            project={selectedProject}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
            navigateMedia={navigateMedia}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
