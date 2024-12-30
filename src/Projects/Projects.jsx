import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Filter, Search } from 'lucide-react';
import styles from './Projects.module.css';
import ProjectsModal from './ProjectsModal';
import FilterModal from './FilterModal';
import { projects, TAGS } from './ProjectsData';
import dayjs from 'dayjs';

// Memoized project card component for better performance
const ProjectCard = memo(({ project, onClick }) => {
  const thumbnail = project.thumbnail || 
    project.media.find(item => item.type === 'image')?.url || 
    '/images/project-placeholder.png';

  const formatDate = (startDate, endDate) => {
    const formatToMonth = (date) => {
      return date ? dayjs(date).format('MMM YYYY') : '';
    };

    // Handle missing dates
    if (!startDate && !endDate) return '';
    
    // Handle single date cases
    if (startDate && !endDate) return formatToMonth(startDate);
    if (!startDate && endDate) return formatToMonth(endDate);

    // Both dates - same
    if (startDate === endDate) return formatToMonth(startDate);

    // Both dates - different
    return `${formatToMonth(startDate)} - ${formatToMonth(endDate)}`;
  };

  const formattedDate = formatDate(project.startDate, project.endDate);
  
  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick(project);
      }}
    >
      <div className={styles.projectImage}>
        <img 
          src={thumbnail} 
          alt={project.title}
          loading="lazy"
        />
        <div className={styles.skillsOverlay}>
          {project.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className={styles.overlaySkill}>
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className={styles.moreSkills}>
              +{project.skills.length - 3}
            </span>
          )}
        </div>
        <div className={styles.dateOverlay}>
          {formattedDate}
        </div>
      </div>
      
      <div className={styles.projectInfo}>
        <h3>{project.title}</h3>
        <p>{project.brief}</p>
        
        <div className={styles.projectMeta}>
          <div className={styles.projectTags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          {project.links && Object.keys(project.links).length > 0 && (
            <div className={styles.projectLinks}>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={styles.linkIcon}
                  aria-label="View GitHub repository"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={styles.linkIcon}
                  aria-label="View live project"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('featured'); // default 'featured' projects which is by id # in projectsdata.js
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(['All']);


  // Memoized filter function
  const getFilteredProjects = useCallback(() => {
    return projects
      .filter(project => {
        const matchesSearch = searchTerm === '' || 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.skills.some(skill => 
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          );
        
        const matchesTags = selectedTags.includes('All') || 
          selectedTags.every(tag => project.tags.includes(tag));
        
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'featured':
            return b.id-a.id; // Sort by ID for featured
          case 'desc':
            return new Date(b.endDate || b.startDate) - new Date(a.endDate || a.startDate);
          case 'asc':
            return new Date(a.endDate || a.startDate) - new Date(b.endDate || b.startDate);
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedTags, sortOrder]);
  

  const filteredProjects = getFilteredProjects();

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
    setIsProjectModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateMedia = useCallback((direction) => {
    if (!selectedProject) return;
    const newIndex = currentMediaIndex + direction;
    if (newIndex >= 0 && newIndex < selectedProject.media.length) {
      setCurrentMediaIndex(newIndex);
    }
  }, [selectedProject, currentMediaIndex]);

  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.controlsWrapper}>
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            className={styles.filterButton}
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter size={20} />
            Filter & Sort
          </button>
        </div>
      </div>

      <div className={styles.projectsContainer}>
        <div className={styles.projectsGrid}>
          <AnimatePresence>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isProjectModalOpen && selectedProject && (
            <ProjectsModal 
              project={selectedProject}
              currentMediaIndex={currentMediaIndex}
              setCurrentMediaIndex={setCurrentMediaIndex}
              navigateMedia={navigateMedia}
              closeModal={handleCloseModal}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            tags={TAGS}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            totalProjects={filteredProjects.length}  // Add this line
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;