import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import styles from './Resume.module.css';

const Resume = () => {
  const education = {
    school: "University of Toronto (UofT)",
    degree: "BASc in Engineering Science",
    location: "Toronto, ON",
    duration: "Sep 2023 -- Apr 2028",
    gpa: "4.0 GPA",
    achievements: [
      "Frank Howard Admission Scholarship ($5,000)",
      "University of Toronto Excellence Award ($7,500)",
      "Anthony A. Brait In-course Scholarship ($5,815)",
      "National Book Award",
      "2x Dean's List",
      "Varsity Track and Field",
      "Engineering Society"
    ]
  };

  const experience = [
    {
      title: "Microfluidics Lab Researcher",
      company: "UofT Laboratory of Complex Fluids",
      location: "Toronto, ON",
      duration: "May 2024 -- Sep 2024",
      points: [
        "Investigated the relationship between substrate elasticity and microfluidic island growth in emulsions using Reflection Interference Contrast Microscopy (RICM)",
        "Designed and built a custom setup using motorized linear stages and Arduino for fluid-material interaction studies",
        "Developed camera algorithms using grayscale imaging to detect shim movement and dynamically adjust linear stages"
      ]
    },
    {
      title: "UWind & UTAT Team Member",
      company: "University of Toronto Engineering Design Team",
      location: "Toronto, ON",
      duration: "Dec 2023 -- Aug 2024",
      points: [
        "Designed the nacelle of a small-scale wind turbine using Ansys and SolidWorks",
        "Achieved 1st Place Overall at the International Wind Turbine Competition (ISWTC)",
        "Designed and optimized quadcopter fuselage bulkheads and stringers for the 2024 National UAS competition"
      ]
    }
  ];

  const projects = [
    {
      title: "LureLore",
      subtitle: "Winner @ HackTheNorth ($5000+ prize)",
      description: "Memorabilia app for fishing enthusiasts with AI fish identification and 3D interactive aquarium",
      tech: "MERN, Gemini AI, Three.js, Leaflet.js",
      link: "#"
    },
    {
      title: "Basemint",
      subtitle: "Winner @ HawkHacks2024 ($3,000 prize)",
      description: "Web3 esports marketplace built on NEAR blockchain for fan engagement and NFT trading",
      tech: "NEAR, React, Node.js, Mintbase Wallet",
      link: "#"
    },
    {
      title: "Pocket Fridge",
      subtitle: "Winner @ Google AI Hackathon",
      description: "AI-powered food management app with receipt scanning and recipe suggestions",
      tech: "MERN Stack, React Native, Vertex AI",
      link: "https://devpost.com/software/pocket-fridge"
    }
  ];

  const skills = {
    software: "Python, C, System Verilog, RISC-V Assembly, SolidWorks, MATLAB, Java, CSS, JavaScript, HTML, MERN Stack, Adobe Suite",
    languages: "English, Chinese, French",
    interests: "High Jump, Basketball, Chess"
  };

  return (
    <motion.div 
      className={styles.resumeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.header 
        className={styles.header}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Daniel Hong</h1>
        <div className={styles.contactInfo}>
          <a href="mailto:danielh.toronto@gmail.com" className={styles.contactItem}>
            <FaEnvelope /> danielh.toronto@gmail.com
          </a>
          <a href="https://daniel-hong.org" className={styles.contactItem}>
            daniel-hong.org
          </a>
          <span className={styles.contactItem}>
            <FaPhone /> (647) 614-2306
          </span>
          <span className={styles.contactItem}>
            <FaMapMarkerAlt /> Toronto, ON
          </span>
          <a href="https://www.linkedin.com/in/danielh-hong/" className={styles.contactItem}>
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </motion.header>

      {/* Education Section */}
      <motion.section 
        className={styles.section}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2>Education</h2>
        <div className={styles.educationCard}>
          <div className={styles.eduHeader}>
            <div>
              <h3>{education.school}</h3>
              <p>{education.degree}</p>
            </div>
            <div className={styles.eduMeta}>
              <p>{education.duration}</p>
              <p>{education.location}</p>
              <p className={styles.gpa}>{education.gpa}</p>
            </div>
          </div>
          <ul className={styles.achievements}>
            {education.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        className={styles.section}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className={styles.experienceCard}>
            <div className={styles.expHeader}>
              <div>
                <h3>{exp.title}</h3>
                <p className={styles.company}>{exp.company}</p>
              </div>
              <div className={styles.expMeta}>
                <p>{exp.duration}</p>
                <p>{exp.location}</p>
              </div>
            </div>
            <ul className={styles.expPoints}>
              {exp.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        className={styles.section}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Projects</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={styles.projectCard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3>{project.title}</h3>
              <p className={styles.projectSubtitle}>{project.subtitle}</p>
              <p className={styles.projectDescription}>{project.description}</p>
              <p className={styles.techStack}>Tech Stack: {project.tech}</p>
              {project.link && (
                <a href={project.link} className={styles.projectLink}>
                  View Project <FaGithub />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className={styles.section}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Skills & Interests</h2>
        <div className={styles.skillsContainer}>
          <div className={styles.skillCategory}>
            <h3>Software & Technologies</h3>
            <p>{skills.software}</p>
          </div>
          <div className={styles.skillCategory}>
            <h3>Languages</h3>
            <p>{skills.languages}</p>
          </div>
          <div className={styles.skillCategory}>
            <h3>Interests</h3>
            <p>{skills.interests}</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Resume;