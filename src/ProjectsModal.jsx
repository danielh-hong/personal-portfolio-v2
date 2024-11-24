// ProjectsModal.jsx
import React, { useState, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTimes, FaGithub, FaExternalLinkAlt, 
  FaChevronLeft, FaChevronRight,
  FaYoutube, FaFilePdf,
  FaSearchPlus, FaSearchMinus, FaUndo
} from 'react-icons/fa';
import styles from './ProjectsModal.module.css';

// Define media types constant
export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'pdf'
};

// Lazy load heavy components
const TransformWrapper = React.lazy(() => import("react-zoom-pan-pinch").then(module => ({ default: module.TransformWrapper })));
const TransformComponent = React.lazy(() => import("react-zoom-pan-pinch").then(module => ({ default: module.TransformComponent })));
const YouTube = React.lazy(() => import('react-youtube'));
const Document = React.lazy(() => import('react-pdf').then(module => ({ default: module.Document })));
const Page = React.lazy(() => import('react-pdf').then(module => ({ default: module.Page })));

// Loading fallback component
const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

const MediaViewer = ({ media }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback((e) => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  if (!media) return null;

  switch (media.type) {
    case MEDIA_TYPES.IMAGE:
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <TransformWrapper
            initialScale={0.5}
            centerZoomedOut={true}
            centerOnInit={true}
            alignContent="center"
            justifyContent="center"
            minScale={0.5}
            maxScale={3}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className={styles.imageControls}>
                  <button onClick={() => zoomIn(0.2)} aria-label="Zoom In">
                    <FaSearchPlus />
                  </button>
                  <button onClick={() => zoomOut(0.2)} aria-label="Zoom Out">
                    <FaSearchMinus />
                  </button>
                  <button onClick={resetTransform} aria-label="Reset Zoom">
                    <FaUndo />
                  </button>
                </div>
                
                {isLoading && !imageError && <LoadingSpinner />}
                
                <TransformComponent>
                  <img 
                    src={media.url}
                    alt={media.caption}
                    className={`${styles.modalImage} ${isLoading ? styles.hidden : ''}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  {imageError && (
                    <div className={styles.errorMessage}>
                      Failed to load image
                    </div>
                  )}
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </Suspense>
      );

    case MEDIA_TYPES.VIDEO:
      return (
        <Suspense fallback={<LoadingSpinner />}>
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
              onError={() => console.error('YouTube player error')}
            />
          </div>
        </Suspense>
      );

    case MEDIA_TYPES.PDF:
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <div className={styles.pdfWrapper}>
            <Document
              file={media.url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={<LoadingSpinner />}
              error={
                <div className={styles.errorMessage}>
                  Failed to load PDF
                </div>
              }
            >
              <Page 
                pageNumber={pageNumber}
                loading={<LoadingSpinner />}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={1.0}
              />
            </Document>
            {numPages && (
              <div className={styles.pdfControls}>
                <button 
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </button>
                <span>Page {pageNumber} of {numPages}</span>
                <button 
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </Suspense>
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
  const handleModalClick = useCallback((e) => {
    if (e.target.classList.contains(styles.modal)) {
      closeModal();
    }
  }, [closeModal]);

  if (!project) return null;

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
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          className={styles.closeButton}
          onClick={closeModal}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className={styles.modalHeader}>
          <h2 id="modal-title">{project.title}</h2>
          <div className={styles.modalSkills}>
            {project.skills.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.modalImageContainer}>
          <MediaViewer media={currentMedia} />

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

        <div className={styles.imageCaption}>{currentMedia.caption}</div>

        <div className={styles.mediaDescription}>
          <p>{currentMedia.description || 'No description available.'}</p>
        </div>

        <div className={styles.modalTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProjectsModal);
