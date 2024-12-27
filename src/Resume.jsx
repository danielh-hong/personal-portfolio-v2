// Resume.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import styles from './Resume.module.css';

const Resume = () => {
  const education = {
    school: "University of Toronto (UofT)",
    degree: "BASc in Electrical & Computer Engineering (Engineering Science)",
    location: "Toronto, ON",
    duration: "Sep 2023 — Apr 2028",
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
      title: "Summer Research Intern - Microfluidics Lab",
      company: "UofT Laboratory of Complex Fluids",
      location: "Toronto, ON",
      duration: "May 2024 — Sep 2024",
      points: [
        "Investigated the relationship between substrate elasticity and microfluidic island growth in emulsions using Reflection Interference Contrast Microscopy (RICM), discovering new phenomena of water-induced wetting and island formation",
        "Designed and built a 100 µm metal shim control system with custom-designed motorized linear stages, Arduino, and stepper drivers",
        "Developed camera algorithms in MATLAB using grayscale imaging techniques to detect shim movement in real time"
      ]
    },
    {
      title: "UWind & UTAT Team Member",
      company: "University of Toronto Engineering Design Teams",
      location: "Toronto, ON",
      duration: "Dec 2023 — Aug 2024",
      points: [
        "Designed the nacelle of a small-scale wind turbine using Ansys and SolidWorks, optimizing for component accessibility and aerodynamics",
        "Achieved 1st Place Overall at the International Wind Turbine Competition (ISWTC) in the Netherlands",
        "Designed and optimized quadcopter fuselage bulkheads and stringers, enhancing structural integrity by 150%"
      ]
    },
    {
      title: "GEARS Mentor",
      company: "Department of Engineering Science, UofT",
      location: "Toronto, ON",
      duration: "Sep 2024 — Current",
      points: [
        "Lead weekly sessions with 10—20+ engineering science students, covering advanced topics such as low-level programming, data structures, algorithms, and circuit analysis",
        "Provide step-by-step guidance for debugging algorithms, deriving equations, and solving circuit problems"
      ]
    }
  ];

  const projects = [
    {
      title: "LureLore",
      subtitle: "1st Place @ HackTheNorth ($5000)",
      description: "Created an immersive fishing memory platform with AI fish identification and interactive 3D aquarium",
      tech: "MERN, Gemini AI, Three.js, Leaflet.js",
      link: "https://github.com/danielh-hong/hackthenorth2024",
      devpost: "https://devpost.com/software/lurelore"
    },
    {
      title: "EngSci 2T7 Major Survey",
      subtitle: "Full Stack Web Application",
      description: "Built and deployed platform enabling 250+ Engineering Science students to track major preferences with real-time visualization",
      tech: "MERN Stack, Vercel, Render",
      link: "https://github.com/danielh-hong/2t7-major-survey",
      live: "https://2t7-major-survey.vercel.app/vote"
    },
    {
      title: "MarketBaseMint",
      subtitle: "1st Place @ HawkHacks ($3,000)",
      description: "Built decentralized NFT marketplace for e-sports tickets on NEAR Protocol with full trading functionality",
      tech: "NEAR Blockchain, React, TypeScript",
      link: "https://github.com/audgeviolin07/marketbasemint",
      live: "https://marketbasemint.vercel.app/"
    }
  ];

  const skills = {
    technical: "Python, JavaScript/TypeScript, C/C++, Java, RISC-V Assembly, System Verilog, React.js, Node.js, Express.js, Next.js, HTML/CSS, Tailwind CSS, MongoDB, Render, Git, CI/CD, Postman, MATLAB, SolidWorks, Ansys, Arduino, Raspberry Pi",
    languages: "English (Native), Chinese (Fluent), French (Intermediate)"
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
            <span>daniel-hong.org</span>
          </a>
          <a href="https://www.linkedin.com/in/danielh-hong/" className={styles.contactItem}>
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </motion.header>

      {/* Rest of the component remains the same, continuing with Education section... */}
      
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
              <div className={styles.projectLinks}>
                {project.link && (
                  <a href={project.link} className={styles.projectLink}>
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.devpost && (
                  <a href={project.devpost} className={styles.projectLink}>
                    DevPost
                  </a>
                )}
                {project.live && (
                  <a href={project.live} className={styles.projectLink}>
                    Live Site
                  </a>
                )}
              </div>
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
        <h2>Skills</h2>
        <div className={styles.skillsContainer}>
          <div className={styles.skillCategory}>
            <h3>Technical Skills</h3>
            <p>{skills.technical}</p>
          </div>
          <div className={styles.skillCategory}>
            <h3>Languages</h3>
            <p>{skills.languages}</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Resume;