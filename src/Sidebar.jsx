// Sidebar.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        
        {/* User Information Section */}
        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {/* Profile picture from public folder */}
              <img src="/pfp.png" alt="Daniel Hong" className={styles.avatarImg} />
            </div>
          </div>
          <div className={styles.username}>Daniel Hong</div>
          <div className={styles.location}>
            <FaMapMarkerAlt /> Toronto, Ontario
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className={styles.nav}>
          
          {/* Contact Section */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeader}>Contact</h3>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.navLink}
                  aria-label="GitHub Profile"
                >
                  <FaGithub /> <span>GitHub</span>
                </a>
              </li>
              <li className={styles.navItem}>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.navLink}
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
              </li>
              <li className={styles.navItem}>
                <a 
                  href="mailto:your.email@example.com"
                  className={styles.navLink}
                  aria-label="Send Email"
                >
                  <FaEnvelope /> <span>Email</span>
                </a>
              </li>
              <li className={styles.navItem}>
                <a 
                  href="https://youtube.com/yourchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.navLink}
                  aria-label="YouTube Channel"
                >
                  <FaYoutube /> <span>YouTube</span>
                </a>
              </li>
            </ul>
          </section>

          {/* Resume Section */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeader}>Resume</h3>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a 
                  href="/resume.pdf" 
                  download
                  className={styles.navLink}
                  aria-label="Download CV"
                >
                  <FaFileDownload /> <span>Download CV</span>
                </a>
              </li>
            </ul>
          </section>

        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;
