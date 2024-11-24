import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeContext } from './ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/resume', label: 'Resume' }
  ]

  return (
    <nav className={`${styles.navbar} ${styles.active}`}>
      <div className={styles.navbarLogo}>
        <Link to="/">YourName</Link>
      </div>

      <ul className={styles.navbarNav}>
        {navItems.map(({ path, label }) => (
          <li key={path} className={styles.navItem}>
            <Link 
              to={path} 
              className={`${styles.navLink} ${location.pathname === path ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navbarRight}>
        <div className={styles.themeToggle}>
          <input
            type="checkbox"
            id="theme-toggle"
            className={styles.themeToggleInput}
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <label htmlFor="theme-toggle" className={styles.themeToggleLabel}>
            <FaSun className={styles.sunIcon} />
            <FaMoon className={styles.moonIcon} />
            <span className={styles.themeToggleSlider}></span>
          </label>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
