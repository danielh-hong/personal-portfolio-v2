// MediaViewer.jsx
import React, { useState, useCallback } from 'react';
import { FaSearchPlus, FaSearchMinus, FaUndo } from 'react-icons/fa';
import styles from './MediaViewer.module.css';

const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner} />
  </div>
);

const MediaControls = ({ scale, setScale }) => (
  <div className={styles.mediaControls}>
    <button 
      onClick={() => setScale(prev => Math.min(prev + 0.25, 3))} 
      aria-label="Zoom in"
      className={styles.controlButton}
      disabled={scale >= 3}
    >
      <FaSearchPlus />
    </button>
    <button 
      onClick={() => setScale(prev => Math.max(prev - 0.25, 0.5))} 
      aria-label="Zoom out"
      className={styles.controlButton}
      disabled={scale <= 0.5}
    >
      <FaSearchMinus />
    </button>
    <button 
      onClick={() => setScale(1)} 
      aria-label="Reset zoom"
      className={styles.controlButton}
      disabled={scale === 1}
    >
      <FaUndo />
    </button>
  </div>
);

const MediaViewer = ({ media }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [scale, setScale] = useState(1);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  if (!media) return null;

  switch (media.type) {
    case 'image':
      return (
        <div className={styles.mediaContainer}>
          <MediaControls scale={scale} setScale={setScale} />
          
          {isLoading && !imageError && <LoadingSpinner />}
          
          <div 
            className={styles.imageWrapper} 
            style={{ transform: `scale(${scale})` }}
          >
            <img 
              src={media.url}
              alt={media.caption || 'Project image'}
              className={`${styles.modalImage} ${isLoading ? styles.hidden : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </div>

          {imageError && (
            <div className={styles.errorMessage}>
              Failed to load image
            </div>
          )}
        </div>
      );

    case 'video':
      return (
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${media.youtubeId}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.youtubePlayer}
          />
        </div>
      );

    case 'pdf':
      return (
        <div className={styles.pdfWrapper}>
          <iframe
            src={`${media.url}#toolbar=0&navpanes=0`}
            className={styles.pdfFrame}
            title="PDF Viewer"
          />
        </div>
      );

    default:
      return null;
  }
};

export default React.memo(MediaViewer);