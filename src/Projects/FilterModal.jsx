import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, SortAsc, SortDesc, Filter } from 'lucide-react';
import styles from './FilterModal.module.css';

const FilterModal = ({ 
  isOpen, 
  onClose, 
  tags, 
  selectedTags, 
  setSelectedTags,
  sortOrder,
  setSortOrder 
}) => {
  useEffect(() => {
    if (isOpen) {
      // Get current scroll position
      const scrollY = window.scrollY;
      
      // Add styles to prevent background scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    return () => {
      // Cleanup when component unmounts
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <motion.div 
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div 
        className={styles.modalContent}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Filter & Sort</h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.section}>
            <h3>Sort by Date</h3>
            <div className={styles.sortButtons}>
              <button
                className={`${styles.sortButton} ${sortOrder === 'asc' ? styles.active : ''}`}
                onClick={() => setSortOrder('asc')}
              >
                <SortAsc size={18} />
                Oldest First
              </button>
              <button
                className={`${styles.sortButton} ${sortOrder === 'desc' ? styles.active : ''}`}
                onClick={() => setSortOrder('desc')}
              >
                <SortDesc size={18} />
                Newest First
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Filter by Category</h3>
            <div className={styles.tagGrid}>
              {tags.filter(tag => tag !== 'All').map(tag => (
                <button
                  key={tag}
                  className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.active : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.resetButton}
            onClick={() => {
              setSelectedTags([]);
              setSortOrder('desc');
            }}
          >
            Reset Filters
          </button>
          <button 
            className={styles.applyButton}
            onClick={handleClose}
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterModal;