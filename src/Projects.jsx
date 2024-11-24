// Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Projects.module.css';
import ProjectsModal from './ProjectsModal';

// Configure PDF worker
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Define media types
const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'pdf'
};

// Define project tags for filtering
const TAGS = [
  'All',
  'Web Development',
  'Machine Learning',
  'Robotics',
  'Engineering',
  'Design',
  'AI',
  'Hackathon',
  'IoT',
  'Sustainability',
  'Advocacy',
  'Biology',
  'Education',
  'Physics',
  'Transportation',
  'Research'
];

// Helper function to get thumbnail
const getThumbnail = (project) => {
  // Priority 1: Dedicated thumbnail field
  if (project.thumbnail) return project.thumbnail;
  
  // Priority 2: Media item marked as thumbnail and of type IMAGE
  const thumbnailItem = project.media.find(item => item.isThumbnail && item.type === MEDIA_TYPES.IMAGE);
  if (thumbnailItem) return thumbnailItem.thumbnail || thumbnailItem.url;
  
  // Priority 3: First image media item
  const firstImage = project.media.find(item => item.type === MEDIA_TYPES.IMAGE);
  if (firstImage) return firstImage.thumbnail || firstImage.url;
  
  // Priority 4: First media item (if exists)
  if (project.media.length > 0) {
    const firstMedia = project.media[0];
    if (firstMedia.type === MEDIA_TYPES.IMAGE && firstMedia.thumbnail) return firstMedia.thumbnail;
    // For videos or PDFs, return a default media type icon or image
    return '/path/to/default-media-thumbnail.png'; // Update with your actual default media thumbnail path
  }
  
  // Fallback: Default thumbnail
  return '/path/to/default-thumbnail.jpg'; // Ensure this path points to your default thumbnail image
};

// Sample projects array - fully updated with media descriptions
const projects = [
  // Quadcopter Design
  {
    id: 1,
    title: 'Quadcopter Design',
    brief: 'Autonomous drone system with advanced stabilization',
    description: 'A complete quadcopter system featuring autonomous flight capabilities, custom PID controllers, and advanced stabilization algorithms. Developed as part of the UTAT Aerial Robotics team.',
    tags: ['Robotics', 'Engineering'],
    skills: ['CAD', 'SolidWorks', 'PID Controllers', 'Python'],
    thumbnail: '/quadcopter/thumbnail.png', // Dedicated thumbnail
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/quadcopter/1.png',
        caption: 'Complete quadcopter assembly with custom frame design',
        description: 'Detailed view of the quadcopter assembly, highlighting the custom-designed frame and stabilization components.',
        thumbnail: '/quadcopter/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/quadcopter/2.png',
        caption: 'Flight controller board and sensor array',
        description: 'Close-up of the flight controller board integrated with multiple sensors for autonomous navigation.',
        thumbnail: '/quadcopter/2.png'
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'VIDEO_ID_HERE',
        caption: 'Flight test demonstration',
        description: 'A video demonstrating the quadcopter\'s autonomous flight capabilities and stabilization performance.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/quadcopter/technical-specs.pdf',
        caption: 'Technical specifications',
        description: 'Comprehensive technical specifications of the quadcopter system, including hardware components and software algorithms.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/quadcopter',
      live: 'https://project-website.com'
    }
  },

  // Pocket Fridge (AI Project)
  {
    id: 2,
    title: 'Pocket Fridge (AI Project)',
    brief: 'AI-powered app to manage fridge inventory and suggest recipes',
    description: `Pocket Fridge is an app developed during the Google GenAI Genesis Hackathon (2024) that allows users to scan receipts to identify food items and track their expiration dates. It features a 'virtual fridge' where the app curates recipes using AI based on the contents. Built with the MERN stack and integrated with Vertex AI models.`,
    tags: ['Engineering', 'Web Development', 'AI'],
    skills: ['MERN Stack', 'React Native', 'Python', 'Vertex AI', 'MongoDB', 'Express.js', 'Node.js', 'Flask'],
    thumbnail: '/pocket_fridge/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/1.png',
        caption: "Pocket Fridge app's different pages mockup",
        description: "This image showcases the various pages of the Pocket Fridge app, including the inventory scanner and recipe suggestions.",
        thumbnail: '/pocket_fridge/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/2.png',
        caption: 'GenAI technologies used in Pocket Fridge',
        description: "An overview of the GenAI technologies integrated into Pocket Fridge, highlighting Vertex AI models.",
        thumbnail: '/pocket_fridge/2.png'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/3.jpg',
        caption: 'GenAI technologies used in Pocket Fridge',
        description: "Detailed view of the AI algorithms managing inventory and recipe suggestions.",
        thumbnail: '/pocket_fridge/3.jpg'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/4.jpg',
        caption: 'GenAI technologies used in Pocket Fridge',
        description: "Visualization of the virtual fridge interface powered by AI.",
        thumbnail: '/pocket_fridge/4.jpg'
      },
    ],
    links: {
      github: 'https://github.com/yourusername/pocket-fridge',
      live: 'https://devpost.com/software/pocket-fridge'
    }
  },

  // EcoSort: SmartWaste Assistant
  {
    id: 3,
    title: 'EcoSort: SmartWaste Assistant',
    brief: 'Automatic, voice-controlled waste dispenser',
    description: `EcoSort: SmartWaste Assistant is an automatic, voice-controlled waste dispenser developed for the MakeUoft Hackathon (2024). It categorizes waste into garbage, compost, or recycling using voice recognition and a self-trained machine learning algorithm. Built with Raspberry Pi, Arduino, and a Naïve Bayes classifier.`,
    tags: ['Engineering', 'Hackathon', 'IoT'],
    skills: ['Python', 'Raspberry Pi', 'Arduino', 'Machine Learning', 'Voice Recognition', 'Google Speech API'],
    thumbnail: '/ecosort/thumbnail.jpg', // Update with correct path if different
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/ecosort/1.jpg',
        caption: 'EcoSort SmartWaste Assistant Prototype',
        description: 'Prototype of the EcoSort SmartWaste Assistant showcasing its voice-controlled waste categorization mechanism.',
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/ecosort/2.jpg',
        caption: 'EcoSort Technical Diagram',
        description: 'Technical diagram illustrating the components and workflow of the EcoSort system.',
        thumbnail: '/ecosort/2.jpg'
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'YkVNaKjuS3E',
        caption: 'EcoSort Project Demo',
        description: 'A comprehensive demonstration of the EcoSort SmartWaste Assistant in action.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/ecosort-smartwaste-assistant',
      live: 'https://devpost.com/software/ecosort-smartwaste-assistant'
    }
  },

  // Wind Turbine Nacelle
  {
    id: 4,
    title: 'Wind Turbine Nacelle',
    brief: 'Design of accessible nacelle for wind turbines',
    description: `As a mechanical member of the University of Toronto Wind Design Team, I contributed to designing the nacelle of the turbine, focusing on aerodynamics and accessibility. The design includes an accessible side opening for gearbox maintenance and a top hatch for circuitry access, enhancing the overall functionality and maintainability of the turbine.`,
    tags: ['Engineering', 'Mechanical Design'],
    skills: ['SolidWorks', 'CAD', 'Aerodynamics', 'Team Collaboration'],
    thumbnail: '/utwind/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/1.png',
        caption: 'Initial nacelle design with aerodynamics considerations',
        description: 'First draft of the nacelle design emphasizing aerodynamic efficiency and structural integrity.',
        thumbnail: '/utwind/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/2.png',
        caption: 'SolidWorks render of nacelle design',
        description: 'High-fidelity SolidWorks render showcasing the final nacelle design with accessibility features.',
        thumbnail: '/utwind/2.png'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/3.png',
        caption: 'Team members working on SolidWorks design',
        description: 'Our team collaborating on the SolidWorks design, discussing modifications and improvements.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/wind-turbine-nacelle',
      live: 'https://utwind.designproject.com'
    }
  },

  // Praxis I
  {
    id: 5,
    title: 'Praxis I',
    brief: 'Designing a helmet storage solution for bike commuters',
    description: `Praxis I was my introduction to Engineering Design and teamwork in the Engineering Science program. Our team designed the 'Locker Solution,' a secure and user-friendly helmet storage box that attaches to existing bike locks. The project involved brainstorming, prototyping, and CAD design to create an effective solution for bike commuters.`,
    tags: ['Engineering', 'Design', 'Teamwork'],
    skills: ['CAD', 'SolidWorks', 'Prototyping', 'Team Collaboration'],
    thumbnail: '/praxis_I/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_I/1.png',
        caption: 'Praxis I Alpha Release Presentation',
        description: 'Presentation slides from the Praxis I Alpha Release, outlining project objectives and designs.',
        thumbnail: '/praxis_I/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_I/2.png',
        caption: 'Initial helmet storage solutions sketches',
        description: 'Hand-drawn sketches of initial helmet storage solutions explored during the brainstorming phase.',
        thumbnail: '/praxis_I/2.png'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/praxis_I/design-brief.pdf',
        caption: 'Praxis I Design Brief',
        description: 'Comprehensive design brief detailing the requirements and specifications for the Helmet Storage Solution.'
      }
    ],
    links: {
      live: 'https://praxis1.designproject.com'
    }
  },

  // Praxis II
  {
    id: 6,
    title: 'Praxis II',
    brief: 'Designing an efficient vermicompost worm separation system',
    description: `In Praxis II, I collaborated with Samuel Ho, Allan Zhou, and Ran Chi to design a system for separating red wiggler worms from vermicompost with minimal manual labor for Allan Gardens. The project focused on creating a sustainable and efficient solution tailored to the needs of older volunteers.`,
    tags: ['Engineering', 'Sustainability', 'Design'],
    skills: ['CAD', 'SolidWorks', 'Sustainable Design', 'Machine Learning'],
    thumbnail: '/praxis_II/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_II/1.png',
        caption: 'Praxis II Final Design One Pager',
        description: 'One-page summary of the final design, highlighting key features and sustainability aspects.',
        thumbnail: '/praxis_II/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_II/2.png',
        caption: 'Praxis II Project Poster',
        description: 'Project poster showcasing the design process, features, and benefits of the vermicompost separation system.',
        thumbnail: '/praxis_II/2.png'
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '8pEG_k_MoH0',
        caption: 'Praxis II Final Presentation',
        description: 'Final presentation video detailing the project development, challenges faced, and solutions implemented.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/praxis-ii',
      live: 'https://praxis2.designproject.com'
    }
  },

  // Civ Bridge
  {
    id: 7,
    title: 'Civ Bridge',
    brief: 'Design and testing of a matboard bridge for structural integrity',
    description: `For my Structures and Materials Class (CIV102), I worked with my team 'No Stress, Maybe Strain' to design a 2m bridge using limited matboard and contact cement. The bridge was tested for weight-bearing capacity, ultimately highlighting the difference between theoretical calculations and practical application in engineering.`,
    tags: ['Engineering', 'Structures', 'Materials'],
    skills: ['SolidWorks', 'CAD', 'Structural Analysis', 'Team Collaboration'],
    thumbnail: '/civ_bridge/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/civ_bridge/1.png',
        caption: 'Final bridge design and dimensions',
        description: 'Final design schematics and dimensions of the matboard bridge, focusing on structural integrity.',
        thumbnail: '/civ_bridge/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'QG1LaxiMgBY',
        caption: 'Civ Bridge Timelapse and Testing',
        description: 'Timelapse video documenting the construction and testing phase of the Civ Bridge project.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/civ_bridge/bridge-iterations.pdf',
        caption: 'Bridge Design Iterations',
        description: 'Document detailing the various design iterations and improvements made throughout the project.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/civ-bridge',
      live: 'https://civbridge.designproject.com'
    }
  },

  // Aesthetic Stopwatch
  {
    id: 8,
    title: 'Customizable, Aesthetic Stopwatch',
    brief: 'A web-based customizable stopwatch with aesthetic design',
    description: `The Aesthetic Stopwatch is a personal project to explore web development and design. It features a customizable background, start/stop, and reset buttons, built using HTML, CSS, and JavaScript. The project utilizes the particles.js library for an interactive background and FancyBox for media popups.`,
    tags: ['Web Development', 'Design', 'Engineering'],
    skills: ['HTML', 'CSS', 'JavaScript', 'particles.js', 'FancyBox'],
    thumbnail: '/aesthetic_stopwatch/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/aesthetic_stopwatch/1.png',
        caption: 'Aesthetic Stopwatch Interface',
        description: 'Screenshot of the stopwatch interface, showcasing its customizable and aesthetic design.',
        thumbnail: '/aesthetic_stopwatch/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/aesthetic_stopwatch/2.png',
        caption: 'Stopwatch on Laptop Screen',
        description: 'Image of the Aesthetic Stopwatch running on a laptop, demonstrating its responsiveness and design.',
        thumbnail: '/aesthetic_stopwatch/2.png'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/aesthetic-stopwatch',
      live: 'https://aesthetic-stopwatch.netlify.app/'
    }
  },

  // Quadcopter Fuselage
  {
    id: 9,
    title: 'Quadcopter Fuselage',
    brief: 'Design and assembly of quadcopter fuselage for UAV competition',
    description: `As a member of the University of Toronto Aerospace Team, I designed the quadcopter fuselage using SolidWorks. The design included custom stringers, bulkheads, and flooring. Although the drone crashed during testing for the Unmanned Aerial Systems national competition in Montreal (2024), the project provided valuable hands-on experience in UAV design and assembly.`,
    tags: ['Engineering', 'Aerospace', 'Robotics'],
    skills: ['SolidWorks', 'CAD', '3D Modeling', 'Assembly'],
    thumbnail: '/quadcopter/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/quadcopter/fuselage.jpeg',
        caption: 'SolidWorks render of quadcopter fuselage',
        description: 'High-resolution SolidWorks render of the quadcopter fuselage, highlighting its structural components.',
        thumbnail: '/quadcopter/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/quadcopter/fuselage_wireframe.jpg',
        caption: 'Wireframe view of quadcopter design',
        description: 'Wireframe visualization of the quadcopter fuselage design, showcasing internal structures and layout.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/quad-fuselage',
      live: 'https://utat-quadcopter.designproject.com'
    }
  },

  // Pendulum Analysis
  {
    id: 10,
    title: 'Pendulum Analysis',
    brief: 'Research paper analyzing the swing dynamics of a pendulum',
    description: `This research paper presents an analysis of pendulum swing dynamics using original data. It explores the factors affecting oscillation periods and amplitude variations, providing insights into the underlying physics principles.`,
    tags: ['Research', 'Physics', 'Engineering'],
    skills: ['Data Analysis', 'Research', 'Technical Writing'],
    thumbnail: '/pendulum_analysis/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pendulum_analysis/1.png',
        caption: 'Pendulum swing data visualization',
        description: 'Graphical representation of pendulum swing data, illustrating oscillation periods and amplitude changes.',
        thumbnail: '/pendulum_analysis/thumbnail.png',
        isThumbnail: true
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/pendulum_analysis/pendulum_report.pdf',
        caption: 'Pendulum Analysis Research Paper',
        description: 'Comprehensive research paper detailing the methodology, data analysis, and conclusions of the pendulum swing dynamics study.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/pendulum-analysis',
      live: 'https://pendulum-analysis.research.com'
    }
  },

  // Model Mania 2019
  {
    id: 11,
    title: 'Model Mania 2019',
    brief: 'SolidWorks model for the 2019 Model Mania design challenge',
    description: `Model Mania 2019 was my first SolidWorks project, where I designed a model to meet the specific requirements of the 2019 Model Mania design challenge. This project laid the foundation for my skills in 3D modeling and CAD design.`,
    tags: ['Engineering', 'CAD', '3D Modeling'],
    skills: ['SolidWorks', 'CAD', '3D Printing'],
    thumbnail: '/model_mania/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/model_mania/model_mania_thumbnail.png',
        caption: 'Model Mania 2019 CAD Screenshot',
        description: 'Screenshot of the SolidWorks model created for the 2019 Model Mania design challenge.',
        thumbnail: '/model_mania/thumbnail.png',
        isThumbnail: true
      }
    ],
    links: {
      github: 'https://github.com/yourusername/model-mania-2019',
      live: 'https://modelmania2019.designproject.com'
    }
  },

  // The Legend of Pakicetus (Animated Short)
  {
    id: 12,
    title: 'The Legend of Pakicetus (Animated Short)',
    brief: 'Animated short film about the first whale on land',
    description: `The Legend of Pakicetus is an animated short film I created in 2023 using After Effects, Illustrator, Photoshop, Premiere Pro, and Media Encoder. The film narrates the story of Pakicetus, the first whale on land, blending creativity with animation techniques.`,
    tags: ['Animation', 'Video Production', 'Storytelling'],
    skills: ['After Effects', 'Illustrator', 'Photoshop', 'Premiere Pro', 'Media Encoder'],
    thumbnail: '/pakicetus/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '8I9feeSzREQ',
        caption: 'Watch The Legend of Pakicetus on YouTube',
        description: 'An animated short film that tells the story of Pakicetus, the first whale to venture onto land.'
      }
    ],
    links: {
      live: 'https://youtu.be/8I9feeSzREQ'
    }
  },

  // Nociception - The Perception of Pain
  {
    id: 13,
    title: 'Nociception - The Perception of Pain',
    brief: 'Animated video explaining how pain is perceived by the body',
    description: `Nociception is an animated video I created for the Junior Breakthrough Challenge in 2021. It explores the biological mechanisms of pain perception using a mix of animation and multimedia elements. The video ranked in the top 10% of the competition.`,
    tags: ['Education', 'Animation', 'Biology'],
    skills: ['Illustrator', 'Photoshop', 'After Effects', 'Premiere Pro'],
    thumbnail: '/nociception/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '8I9feeSzREQ',
        caption: 'Watch Nociception on YouTube',
        description: 'Animated explanation of nociception and how the body perceives pain.'
      }
    ],
    links: {
      live: 'https://youtu.be/8I9feeSzREQ'
    }
  },

  // Biking - The Best Form of City Transportation
  {
    id: 14,
    title: 'Biking - The Best Form of City Transportation',
    brief: 'Animated video promoting biking as the best form of transportation',
    description: `This animated video, created in 2022, advocates for biking as the optimal form of city transportation. It combines recorded footage, animations, and stock footage to convey the benefits of biking, utilizing Illustrator, Photoshop, After Effects, and Premiere Pro.`,
    tags: ['Advocacy', 'Animation', 'Transportation'],
    skills: ['Illustrator', 'Photoshop', 'After Effects', 'Premiere Pro'],
    thumbnail: '/biking/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'y_c79vshk14',
        caption: 'Watch Biking - The Best Form of City Transportation on YouTube',
        description: 'Animated advocacy video promoting biking as the most efficient and sustainable form of city transportation.'
      }
    ],
    links: {
      live: 'https://youtu.be/y_c79vshk14?si=Rt8v7-Tx5k_8oc_u'
    }
  },

  // Peto's Paradox
  {
    id: 15,
    title: "Peto's Paradox",
    brief: 'Animated video exploring the biological concept of Peto\'s Paradox',
    description: `Peto's Paradox is an animated video I created in 2020 for the Junior Breakthrough Challenge. It delves into the biological phenomenon where larger animals do not exhibit higher cancer rates than smaller ones, using a mix of animation and multimedia to explain the concept. The video placed in the top 5% internationally.`,
    tags: ['Biology', 'Animation', 'Education'],
    skills: ['After Effects', 'Illustrator', 'Photoshop', 'Premiere Pro'],
    thumbnail: '/petos_paradox/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '2Xf_u02zm8k',
        caption: 'Watch Peto\'s Paradox on YouTube',
        description: 'Animated exploration of Peto\'s Paradox and its implications in biology.'
      }
    ],
    links: {
      live: 'https://youtu.be/2Xf_u02zm8k?si=lyKa23qDK47Q-2AO'
    }
  },

  // Excavator (My First Ever Project)
  {
    id: 16,
    title: 'Excavator (My First Ever Project)',
    brief: 'Hydraulics-powered excavator made from recycled materials',
    description: `This is my first engineering project, created in 5th grade. The excavator features a shampoo lid bucket and a cardboard body, utilizing hydraulics to mimic real excavator movements. It was built entirely from recycled materials, showcasing early interest and skills in engineering and mechanics.`,
    tags: ['Engineering', 'Robotics', 'Hydraulics'],
    skills: ['Basic Engineering', 'Hydraulics', 'Recycled Materials'],
    thumbnail: '/excavator/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'JOrUQsLdYow',
        caption: 'Watch Excavator Project on YouTube',
        description: 'Video showcasing the hydraulics-powered excavator made from recycled materials, demonstrating its movement and functionality.'
      }
    ],
    links: {
      live: 'https://youtu.be/JOrUQsLdYow?si=JBFLzW-WEgpy9yk1'
    }
  },

  // Personal Website
  {
    id: 17,
    title: 'Personal Website',
    brief: 'My personal portfolio website built with web technologies',
    description: `This is my personal portfolio website, showcasing my projects, skills, and experiences. Built using HTML, CSS, and JavaScript, it features an interactive particles.js background, FancyBox for media popups, and custom JavaScript for animations. The website is based on codewithsadee's GitHub template and is available on GitHub.`,
    tags: ['Web Development', 'Design'],
    skills: ['HTML', 'CSS', 'JavaScript', 'particles.js', 'FancyBox'],
    thumbnail: '/personal_website/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/personal_website/1.png',
        caption: 'Personal Website Homepage',
        description: 'Screenshot of the homepage of my personal website, highlighting the interactive particles background and navigation.',
        thumbnail: '/personal_website/thumbnail.png',
        isThumbnail: true
      }
    ],
    links: {
      github: 'https://github.com/yourusername/personal-website',
      live: 'https://yourpersonalwebsite.com'
    }
  }
  // ... [Add other projects as needed]
];

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateMedia(-1);
          break;
        case 'ArrowRight':
          navigateMedia(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, currentMediaIndex, selectedProject]);

  const filteredProjects = projects.filter(project => 
    selectedTag === 'All' || project.tags.includes(selectedTag)
  );

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentMediaIndex(0);
    document.body.style.overflow = 'unset';
  };

  const navigateMedia = (direction) => {
    if (!selectedProject) return;
    
    const newIndex = currentMediaIndex + direction;
    if (newIndex >= 0 && newIndex < selectedProject.media.length) {
      setCurrentMediaIndex(newIndex);
    }
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.filterContainer}>
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`${styles.filterTag} ${selectedTag === tag ? styles.active : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(project)}
              tabIndex={0} // For accessibility
              onKeyPress={(e) => {
                if (e.key === 'Enter') openModal(project);
              }}
            >
              <div 
                className={styles.projectImage}
                style={{ backgroundImage: `url(${getThumbnail(project)})` }}
              />
              {/* Overlay with Gradient and Skills */}
              <div className={styles.overlay}>
                <div className={styles.projectSkills}>
                  {project.skills.map((skill, index) => (
                    <span key={index} className={styles.skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>{project.brief}</p>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectsModal 
            project={selectedProject}
            currentMediaIndex={currentMediaIndex}
            setCurrentMediaIndex={setCurrentMediaIndex}
            navigateMedia={navigateMedia}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
