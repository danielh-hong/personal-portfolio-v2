// Navbar.jsx
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/resume', label: 'Resume' }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.lineContainer}>
          <div className={styles.line} />
        </div>

        <ul className={styles.navItems}>
          {navItems.map(({ path, label }, index) => (
            <li key={path} className={styles.navItem}>
              {index > 0 && <div className={styles.divider} />}
              <Link
                to={path}
                className={`${styles.navLink} ${
                  location.pathname === path ? styles.active : ''
                }`}
                onMouseEnter={() => setHoveredPath(path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                <span className={styles.linkText}>{label}</span>
                {(location.pathname === path || hoveredPath === path) && (
                  <div className={styles.activeBackground} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.lineContainer}>
          <div className={styles.line} />
        </div>

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
    </nav>
  );
};

export default Navbar;

