// ProjectsModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTimes, FaGithub, FaExternalLinkAlt, 
  FaChevronLeft, FaChevronRight,
  FaYoutube, FaFilePdf,
  FaSearchPlus, FaSearchMinus, FaUndo
} from 'react-icons/fa';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import YouTube from 'react-youtube';
import { Document, Page } from 'react-pdf';
import styles from './ProjectsModal.module.css';

// Define media types (should match the main Projects component)
const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'pdf'
};

const MediaViewer = ({ media }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // For image loading state

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  switch (media.type) {
    case MEDIA_TYPES.IMAGE:
      return (
        <TransformWrapper
          fitOnInit={true}          // Ensures the image fits within the container on mount
          minScale={0.5}            // Allows zooming out to 50%
          maxScale={3}              // Limits zooming in to 300%
          initialPositionX={0}
          initialPositionY={0}
          wheel={{ step: 0.1 }}     // Smooth zooming with the mouse wheel
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className={styles.imageControls}>
                <button onClick={zoomIn} aria-label="Zoom In">
                  <FaSearchPlus />
                </button>
                <button onClick={zoomOut} aria-label="Zoom Out">
                  <FaSearchMinus />
                </button>
                <button onClick={resetTransform} aria-label="Reset Zoom">
                  <FaUndo />
                </button>
              </div>
              {isLoading && (
                <div className={styles.spinner}></div> 
              )}
              <TransformComponent>
                <img 
                  src={media.url} 
                  alt={media.caption}
                  className={styles.modalImage}
                  onLoad={handleImageLoad}
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop
                    e.target.src = '/path/to/fallback-image.png'; // Update with your fallback image path
                    setIsLoading(false);
                  }}
                  loading="lazy" // Enables native lazy loading
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      );

    case MEDIA_TYPES.VIDEO:
      return (
        <div className={styles.videoWrapper}>
          <YouTube
            videoId={media.youtubeId}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        </div>
      );

    case MEDIA_TYPES.PDF:
      return (
        <div className={styles.pdfWrapper}>
          <div className={styles.pdfControls}>
            <button 
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
              aria-label="Previous Page"
            >
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button 
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
          <Document
            file={media.url}
            onLoadSuccess={onDocumentLoadSuccess}
            className={styles.pdfDocument}
          >
            <Page 
              pageNumber={pageNumber}
              className={styles.pdfPage}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      );

    default:
      return null;
  }
};

const ProjectsModal = ({
  project,
  currentMediaIndex,
  setCurrentMediaIndex,
  navigateMedia,
  closeModal
}) => {
  const handleModalClick = (e) => {
    // Close modal if clicking outside the content
    if (e.target.classList.contains(styles.modal)) {
      closeModal();
    }
  };

  const currentMedia = project.media[currentMediaIndex];

  return (
    <motion.div
      className={styles.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleModalClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        className={styles.modalContent}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3
        }}
      >
        <button 
          className={styles.closeButton}
          onClick={closeModal}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className={styles.modalHeader}>
          <div>
            <h2 id="modal-title">{project.title}</h2>
            <div className={styles.modalSkills}>
              {project.skills.map((skill, index) => (
                <span key={index} className={styles.skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className={styles.modalLinks}>
            {project.links.github && (
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                <FaGithub /> GitHub
              </a>
            )}
            {project.links.live && (
              <a 
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.modalImageContainer}>
          <MediaViewer 
            media={currentMedia}
          />

          <button 
            className={`${styles.navigationButton} ${styles.prev}`}
            onClick={() => navigateMedia(-1)}
            disabled={currentMediaIndex === 0}
            aria-label="Previous media"
          >
            <FaChevronLeft />
          </button>

          <button 
            className={`${styles.navigationButton} ${styles.next}`}
            onClick={() => navigateMedia(1)}
            disabled={currentMediaIndex === project.media.length - 1}
            aria-label="Next media"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Enhanced Pagination Dots */}
        <div className={styles.paginationDots}>
          {project.media.map((item, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${
                index === currentMediaIndex ? styles.activeDot : ''
              }`}
              onClick={() => setCurrentMediaIndex(index)}
              aria-label={`Go to ${item.type} ${index + 1}`}
            >
              {item.type !== MEDIA_TYPES.IMAGE && (
                <span className={styles.mediaTypeIcon}>
                  {item.type === MEDIA_TYPES.VIDEO ? <FaYoutube /> : <FaFilePdf />}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.imageCaption}>
          {currentMedia.caption}
        </div>

        <div className={styles.mediaDescription}>
          <p>{currentMedia.description || "No description available."}</p>
        </div>

        <div className={styles.modalDescription}>
          <p>{project.description}</p>
        </div>

        <div className={styles.modalTags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsModal;
