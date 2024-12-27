// SidebarMobile.jsx
import React, { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiYoutube, FiDownload, FiMapPin, FiChevronDown } from 'react-icons/fi';
import styles from './SidebarMobile.module.css';

const SidebarMobile = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.mobileSidebar} ${isExpanded ? styles.expanded : ''}`}>
      {/* Header Card */}
      <div className={styles.headerCard} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.profileContainer}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarWrapper}>
              <img src="/pfp.png" alt="Daniel Hong" className={styles.avatarImg} />
            </div>
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.username}>Daniel Hong</h1>
            <div className={styles.location}>
              <FiMapPin /> Toronto, Ontario
            </div>
          </div>
        </div>
        <button 
          className={styles.expandButton}
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
        >
          <FiChevronDown />
        </button>
      </div>

      {/* Expandable Content */}
      <div className={styles.contentContainer}>
        <nav className={styles.nav}>
          {/* Connect Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeader}>Connect</h2>
            <ul className={styles.linkList}>
              <li>
                <a 
                  href="https://github.com/danielh-hong" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span className={styles.iconWrapper}>
                    <FiGithub />
                  </span>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/danielh-hong/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span className={styles.iconWrapper}>
                    <FiLinkedin />
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:danielh.toronto@gmail.com"
                  className={styles.link}
                >
                  <span className={styles.iconWrapper}>
                    <FiMail />
                  </span>
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/yourchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <span className={styles.iconWrapper}>
                    <FiYoutube />
                  </span>
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </section>

          {/* Resume Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeader}>Resume</h2>
            <ul className={styles.linkList}>
              <li>
                <a 
                  href="/resume.pdf" 
                  download
                  className={`${styles.link} ${styles.downloadLink}`}
                >
                  <span className={styles.iconWrapper}>
                    <FiDownload />
                  </span>
                  <span>Download CV</span>
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </div>
    </div>
  );
};

export default SidebarMobile;