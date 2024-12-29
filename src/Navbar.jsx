// Navbar.jsx
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { Sun, Moon, User, Briefcase, FileText } from 'lucide-react'; // Added icons
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const navItems = [
    { path: '/about', label: 'About', icon: User },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/resume', label: 'Resume', icon: FileText }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.navContent}>
          <div className={styles.linksContainer}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`${styles.link} ${
                  location.pathname === path ? styles.activeLink : ''
                }`}
                onMouseEnter={() => setHoveredPath(path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <Icon className={styles.linkIcon} />
                <span className={styles.linkText}>{label}</span>
                {(location.pathname === path || hoveredPath === path) && (
                  <div className={styles.activeIndicator} />
                )}
              </Link>
            ))}
          </div>

          <div className={styles.divider}></div>

          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <Sun className={styles.icon} />
            ) : (
              <Moon className={styles.icon} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;