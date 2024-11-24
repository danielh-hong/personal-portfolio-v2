// components/pages/About.jsx
import { FaGraduationCap, FaCode, FaMusic, 
  FaRunning, FaCamera, FaPlaneDeparture } from 'react-icons/fa'
import { motion } from 'framer-motion'
import styles from './About.module.css'

const About = () => {
return (
<motion.div 
className={styles.about}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
>
<div className={styles.codeBlock}>
 <div className={styles.line}>
   <span className={styles.comment}>// Hello World! Welcome to my portfolio</span>
 </div>
 
 <div className={styles.line}>
   <span className={styles.keyword}>const</span>
   <span className={styles.variable}> developer</span>
   <span className={styles.operator}> = </span>
   <span className={styles.curly}>{'{'}</span>
 </div>

 <div className={`${styles.line} ${styles.indented}`}>
   <span className={styles.property}>name:</span>
   <span className={styles.string}>"Daniel"</span>,
 </div>

 <div className={`${styles.line} ${styles.indented}`}>
   <span className={styles.property}>title:</span>
   <span className={styles.string}>"Engineering Science Student"</span>,
 </div>

 <div className={`${styles.line} ${styles.indented}`}>
   <span className={styles.property}>university:</span>
   <span className={styles.string}>"University of Toronto"</span>,
 </div>

 <div className={`${styles.line} ${styles.indented}`}>
   <span className={styles.property}>interests:</span>
   <span className={styles.bracket}>[</span>
   <span className={styles.string}>"Aerospace"</span>,
   <span className={styles.string}>"Robotics"</span>,
   <span className={styles.string}>"Machine Learning"</span>,
   <span className={styles.string}>"Software Development"</span>
   <span className={styles.bracket}>]</span>,
 </div>
 <div className={styles.curly}>{'}'}</div>
</div>

<div className={styles.infoCards}>
 <div className={styles.card}>
   <FaGraduationCap className={styles.icon} />
   <h3>Education</h3>
   <p>Engineering Science at UofT, specializing in robotics and aerospace systems.</p>
 </div>

 <div className={styles.card}>
   <FaPlaneDeparture className={styles.icon} />
   <h3>Current Projects</h3>
   <p>Working on quadcopter design with UTAT and wind turbine nacelle design with UWind.</p>
 </div>

 <div className={styles.card}>
   <FaCode className={styles.icon} />
   <h3>Technical Skills</h3>
   <p>SolidWorks, Machine Learning, Full-Stack Development, Robotics</p>
 </div>
</div>

<div className={styles.personalSection}>
 <h2>Beyond Engineering</h2>
 <div className={styles.interests}>
   <div className={styles.interest}>
     <FaMusic className={styles.icon} />
     <span>10+ years of piano & violin</span>
   </div>
   <div className={styles.interest}>
     <FaRunning className={styles.icon} />
     <span>Former Varsity Track athlete (190cm High Jump)</span>
   </div>
   <div className={styles.interest}>
     <FaCamera className={styles.icon} />
     <span>Hobbyist photographer</span>
   </div>
 </div>
</div>

<div className={styles.quote}>
 "Life is all about creating the best version of myself"
</div>
</motion.div>
)
}

export default About