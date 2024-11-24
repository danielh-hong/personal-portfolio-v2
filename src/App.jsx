import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import Landing from './Landing'
import MouseTrail from './MouseTrail'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import About from './About'
import Projects from './Projects'
import './App.css'

// Wrapper component that handles the layout logic
const AppContent = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  // Separate layout for regular pages
  const PageLayout = ({ children }) => (
    <>
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </>
  )

  return (
    <div className="app">
      <MouseTrail />
      <Routes>
        {/* Landing page route */}
        <Route path="/" element={<Landing />} />
        {/* Projects page with PageLayout */}
        <Route
          path="/projects"
          element={
            <PageLayout>
              <Projects />
            </PageLayout>
          }
        />
        {/* About page with PageLayout */}
        <Route
          path="/about"
          element={
            <PageLayout>
              <About />
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