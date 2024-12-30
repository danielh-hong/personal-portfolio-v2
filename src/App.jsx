import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import Landing from './Landing'
import MouseTrail from './MouseTrail'
import Navbar from './Navbar'
import About from './About'
import Sidebar from './Sidebar'
import SidebarMobile from './SidebarMobile'
import Projects from './Projects/Projects'
import Resume from './Resume'
import Contact from './Contact'
import LightBackground from './Backgrounds/LightBackground'
import DarkBackground from './Backgrounds/DarkBackground'
import './App.css'

// Background component that switches based on theme
const ThemeBackground = () => {
  const { theme } = useContext(ThemeContext);
  const [mounting, setMounting] = useState(false);
  
  useEffect(() => {
    setMounting(true);
    const timer = setTimeout(() => setMounting(false), 50);
    return () => clearTimeout(timer);
  }, [theme]);

  if (mounting) return null;
  
  return theme === 'light' ? <LightBackground /> : <DarkBackground />;
};

// Wrapper component that handles the layout logic
const AppContent = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  // Separate layout for regular pages
  const PageLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992)

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 992)
      }

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    
    return (
      <>
        <Navbar />
        <div className="content-wrapper">
          {isMobile ? <SidebarMobile /> : <Sidebar />}
          <main className="main-content">
            <div className="main-content-inner">
              {children}
            </div>
          </main>
        </div>
      </>
    )
  }

  return (
    <div className="app">
      <ThemeBackground />
      <MouseTrail />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/projects"
          element={
            <PageLayout>
              <Projects />
            </PageLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PageLayout>
              <About />
            </PageLayout>
          }
        />
        <Route
          path="/resume"
          element={
            <PageLayout>
              <Resume />
            </PageLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PageLayout>
              <Contact />
            </PageLayout>
          }
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App