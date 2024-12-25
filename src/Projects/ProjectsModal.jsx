// ProjectsModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { 
  FaTimes, FaGithub, FaExternalLinkAlt, 
  FaChevronLeft, FaChevronRight,
  FaCalendar
} from 'react-icons/fa';
import styles from './ProjectsModal.module.css';
import MediaViewer from './MediaViewer'; // Import the new MediaViewer component

const DateDisplay = ({ startDate, endDate }) => {
  if (!startDate && !endDate) return null;

  const formatDate = (date) => {
    return date ? dayjs(date).format('MMMM YYYY') : '';
  };

  const isOngoing = startDate && !endDate;
  
  return (
    <div className={styles.dateContainer}>
      <FaCalendar />
      <span>
        {formatDate(startDate)}
        {startDate && endDate && ' - '}
        {formatDate(endDate)}
        {isOngoing && <span className={styles.ongoingBadge}>Ongoing</span>}
      </span>
    </div>
  );
};

const ProjectsModal = ({ project, currentMediaIndex, setCurrentMediaIndex, navigateMedia, closeModal }) => {
  if (!project) return null;

  const currentMedia = project.media[currentMediaIndex];

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <motion.div
        className={styles.modalContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Left side - Media Section */}
        <div className={styles.mediaSection}>
          <div className={styles.mediaWrapper}>
            {currentMedia && <MediaViewer media={currentMedia} />}
          </div>
          
          <button
            className={`${styles.navigationButton} ${styles.prevButton}`}
            onClick={() => navigateMedia(-1)}
            disabled={currentMediaIndex === 0}
            aria-label="Previous media"
          >
            <FaChevronLeft />
          </button>
          
          <button
            className={`${styles.navigationButton} ${styles.nextButton}`}
            onClick={() => navigateMedia(1)}
            disabled={currentMediaIndex === project.media.length - 1}
            aria-label="Next media"
          >
            <FaChevronRight />
          </button>

          <div className={styles.paginationDots}>
            {project.media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentMediaIndex(idx)}
                className={`${styles.paginationDot} ${
                  idx === currentMediaIndex ? styles.active : ''
                }`}
                aria-label={`Go to media ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Content Section */}
        <div className={styles.contentSection}>
          <button
            onClick={closeModal}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <h2 className={styles.title}>{project.title}</h2>
          
          <DateDisplay 
            startDate={project.startDate} 
            endDate={project.endDate}
          />

          {project.links && (
            <div className={styles.links}>
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}

          {project.brief && (
            <div className={styles.description}>
              <h3>Project Overview</h3>
              <p>{project.brief}</p>
            </div>
          )}

          {currentMedia.description && (
            <div className={styles.description}>
              <h3>About this view</h3>
              <p>{currentMedia.description}</p>
            </div>
          )}

          <div className={styles.skills}>
            <h3>Technologies Used</h3>
            <div className={styles.skillTags}>
              {project.skills.map(skill => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.caption}>
            {currentMedia.caption}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProjectsModal);
