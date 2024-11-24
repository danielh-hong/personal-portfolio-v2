// Navbar.jsx
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/resume', label: 'Resume' }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.lineContainer}>
        <div className={styles.line} />
      </div>
      
      <ul className={styles.navItems}>
        {navItems.map(({ path, label }, index) => (
          <li key={path} className={styles.navItemWrapper}>
            {index > 0 && <span className={styles.dot} />}
            <Link 
              to={path}
              className={`${styles.navLink} ${location.pathname === path ? styles.active : ''}`}
            >
              {label}
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
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <FaSun className={styles.sunIcon} />
        ) : (
          <FaMoon className={styles.moonIcon} />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
