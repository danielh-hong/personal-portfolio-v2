import { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import { Send, Check, AlertCircle } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  
  useEffect(() => {
    let map = null;
    const loadMap = async () => {
      if (!window.L) {
        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
        
        // Load Leaflet JS
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      // Remove existing map if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Create new map instance
      map = L.map(mapRef.current).setView([43.6532, -79.3832], 12);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add custom styling based on theme
      const tiles = document.querySelectorAll('.leaflet-tile-pane');
      tiles.forEach(tile => {
        tile.style.filter = theme === 'dark' 
          ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)'
          : 'none';
      });
    };

    loadMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [theme]); // Re-run when theme changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://formspree.io/f/moqggkay', {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
    
    setLoading(false);
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.contactGrid}>
        {/* Left side - Contact form */}
        <motion.div 
          className={styles.formSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.contactInfo}>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get in Touch
            </motion.h1>
            <motion.div 
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p>If you're interested in collaboration, have a project in mind, or just want to chat about tech and ideas, I'd love to hear from you!</p>
              <p>Feel free to send me a message below or reach out via email at your@email.com.</p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <motion.div 
              className={styles.formGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className={`${styles.formGroup} ${focused === 'name' ? styles.focused : ''}`}>
                <input
                  type="text"
                  name="name"
                  required
                  className={styles.input}
                  placeholder="Your Name"
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                />
              </div>

              <div className={`${styles.formGroup} ${focused === 'email' ? styles.focused : ''}`}>
                <input
                  type="email"
                  name="email"
                  required
                  className={styles.input}
                  placeholder="Your Email"
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                />
              </div>
            </motion.div>

            <motion.div 
              className={`${styles.formGroup} ${focused === 'message' ? styles.focused : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <textarea
                name="message"
                required
                className={styles.textarea}
                placeholder="Your Message"
                rows="6"
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
              />
            </motion.div>

            <motion.button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className={styles.loading}>
                  <span className={styles.loadingDot}></span>
                  <span className={styles.loadingDot}></span>
                  <span className={styles.loadingDot}></span>
                </span>
              ) : (
                <>
                  <Send className={styles.buttonIcon} />
                  Send Message
                </>
              )}
            </motion.button>

            {status && (
              <motion.div 
                className={`${styles.alert} ${styles[status]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {status === 'success' ? (
                  <>
                    <Check className={styles.alertIcon} />
                    Message sent successfully!
                  </>
                ) : (
                  <>
                    <AlertCircle className={styles.alertIcon} />
                    Failed to send message. Please try again.
                  </>
                )}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Right side - Map */}
        <motion.div 
          className={styles.mapSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div ref={mapRef} className={styles.map} id="map"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;