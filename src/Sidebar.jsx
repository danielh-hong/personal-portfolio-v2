// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiYoutube, FiDownload, FiMapPin, FiChevronDown } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import mobileStyles from './SidebarMobile.module.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth <= 992;
      setIsMobile(isMobileView);
      if (!isMobileView) setIsCollapsed(false);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const currentStyles = isMobile ? mobileStyles : styles;

  return (
    <aside className={`${currentStyles.sidebar} ${isCollapsed ? currentStyles.collapsed : ''}`}>
      <div className={currentStyles.sidebarContent}>
        {/* Profile Section */}
        <div className={currentStyles.profileSection}>
          <div className={currentStyles.profileInfo}>
            <div className={currentStyles.avatarContainer}>
              <div className={currentStyles.avatarWrapper}>
                <img src="/pfp.png" alt="Daniel Hong" className={currentStyles.avatarImg} />
              </div>
            </div>
            <div className={currentStyles.profileText}>
              <h1 className={currentStyles.username}>Daniel Hong</h1>
              <div className={currentStyles.location}>
                <FiMapPin /> Toronto, Ontario
              </div>
            </div>
          </div>
          
          {isMobile && (
            <button 
              className={`${currentStyles.toggleButton} ${isCollapsed ? currentStyles.collapsed : ''}`}
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiChevronDown />
            </button>
          )}
        </div>

        {/* Collapsible Content */}
        <div className={currentStyles.collapsibleContent}>
          <nav className={currentStyles.nav}>
            {/* Connect Section */}
            <section className={currentStyles.section}>
              <h2 className={currentStyles.sectionHeader}>Connect</h2>
              <ul className={currentStyles.linkList}>
                <li className={currentStyles.linkItem}>
                  <a 
                    href="https://github.com/danielh-hong" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={currentStyles.link}
                  >
                    <span className={currentStyles.iconWrapper}>
                      <FiGithub />
                    </span>
                    <span className={currentStyles.linkText}>GitHub</span>
                  </a>
                </li>
                <li className={currentStyles.linkItem}>
                  <a 
                    href="https://www.linkedin.com/in/danielh-hong/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={currentStyles.link}
                  >
                    <span className={currentStyles.iconWrapper}>
                      <FiLinkedin />
                    </span>
                    <span className={currentStyles.linkText}>LinkedIn</span>
                  </a>
                </li>
                <li className={currentStyles.linkItem}>
                  <a 
                    href="mailto:danielh.toronto@gmail.com"
                    className={currentStyles.link}
                  >
                    <span className={currentStyles.iconWrapper}>
                      <FiMail />
                    </span>
                    <span className={currentStyles.linkText}>Email</span>
                  </a>
                </li>
                <li className={currentStyles.linkItem}>
                  <a 
                    href="https://www.youtube.com/@danielhong2817" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={currentStyles.link}
                  >
                    <span className={currentStyles.iconWrapper}>
                      <FiYoutube />
                    </span>
                    <span className={currentStyles.linkText}>YouTube</span>
                  </a>
                </li>
              </ul>
            </section>

            {/* Resume Section */}
            <section className={currentStyles.section}>
              <h2 className={currentStyles.sectionHeader}>Resume</h2>
              <ul className={currentStyles.linkList}>
                <li className={currentStyles.linkItem}>
                  <a 
                    href="/resume.pdf" 
                    download
                    className={`${currentStyles.link} ${currentStyles.downloadLink}`}
                  >
                    <span className={currentStyles.iconWrapper}>
                      <FiDownload />
                    </span>
                    <span className={currentStyles.linkText}>Download CV</span>
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
