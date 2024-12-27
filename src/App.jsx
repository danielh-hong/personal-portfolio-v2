import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import { useState, useEffect } from 'react' // Add this import
import Landing from './Landing'
import MouseTrail from './MouseTrail'
import Navbar from './Navbar'
import About from './About'
import Sidebar from './sidebar'
import SidebarMobile from './SidebarMobile'
import Projects from './Projects/Projects'
import Resume from './Resume'
import './App.css'

// Wrapper component that handles the layout logic
const AppContent = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  // Separate layout for regular pages
  const PageLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992)

    useEffect(() => {
      // Function to handle window resize
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 992)
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, []) // Empty dependency array means this effect runs once on mount
    
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