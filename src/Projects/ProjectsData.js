// Define media types
export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'pdf'
};

// Define project tags for filtering
export const TAGS = [
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

// Sample projects array - fully updated with media descriptions
export const projects = [
  // Quadcopter Design
  {
    id: 1,
    title: 'Quadcopter Fuselage Design',
    brief: 'Autonomous drone system with advanced stabilization',
    tags: ['Robotics', 'Engineering'],
    skills: ['CAD', 'SolidWorks', 'PID Controllers', 'Python'],
    thumbnail: '/quadcopter/thumbnail.jpg',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/quadcopter/1.jpg',
        caption: 'Complete quadcopter assembly with custom frame design',
        description: 'Detailed view of the quadcopter assembly, highlighting the custom-designed frame and stabilization components.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/quadcopter/2.jpg',
        caption: 'Flight controller board and sensor array',
        description: 'Close-up of the flight controller board integrated with multiple sensors for autonomous navigation.'
      }
    ],
    links: {

    }
  },

  // Pocket Fridge
  {
    id: 2,
    title: 'Pocket Fridge (AI Project)',
    brief: 'AI-powered app to manage fridge inventory and suggest recipes',
    tags: ['Engineering', 'Web Development', 'AI'],
    skills: ['MERN Stack', 'React Native', 'Python', 'Vertex AI', 'MongoDB', 'Express.js', 'Node.js', 'Flask'],
    thumbnail: '/pocket_fridge/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/1.png',
        caption: "Pocket Fridge app's different pages mockup",
        description: "This image showcases the various pages of the Pocket Fridge app, including the inventory scanner and recipe suggestions."
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/2.png',
        caption: 'GenAI technologies used in Pocket Fridge',
        description: "An overview of the GenAI technologies integrated into Pocket Fridge, highlighting Vertex AI models."
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/3.jpg',
        caption: 'AI Algorithm Implementation',
        description: "Detailed view of the AI algorithms managing inventory and recipe suggestions."
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pocket_fridge/4.jpg',
        caption: 'Virtual Fridge Interface',
        description: "Visualization of the virtual fridge interface powered by AI."
      }
    ],
    links: {
      github: 'https://github.com/genai-genesis/Gemini-AI-Implementation-GenAI2024',
      live: 'https://devpost.com/software/pocket-fridge'
    }
  },

  // EcoSort
  {
    id: 3,
    title: 'EcoSort: SmartWaste Assistant',
    brief: 'Automatic, voice-controlled waste dispenser',
    tags: ['Engineering', 'Hackathon', 'IoT'],
    skills: ['Python', 'Raspberry Pi', 'Arduino', 'Machine Learning', 'Voice Recognition', 'Google Speech API'],
    thumbnail: '/ecosort/thumbnail.jpg',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/ecosort/1.jpg',
        caption: 'EcoSort SmartWaste Assistant Prototype',
        description: 'Prototype of the EcoSort SmartWaste Assistant showcasing its voice-controlled waste categorization mechanism.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/ecosort/2.jpg',
        caption: 'EcoSort Technical Diagram',
        description: 'Technical diagram illustrating the components and workflow of the EcoSort system.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/ecosort/3.jpg',
        caption: 'EcoSort Technical Diagram',
        description: 'Technical diagram illustrating the components and workflow of the EcoSort system.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/ecosort/3.jpg',
        caption: 'EcoSort Technical Diagram',
        description: 'Technical diagram illustrating the components and workflow of the EcoSort system.'
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
    tags: ['Engineering', 'Mechanical Design'],
    skills: ['SolidWorks', 'CAD', 'Aerodynamics', 'Team Collaboration'],
    thumbnail: '/utwind/thumbnail.jpg',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/1.png',
        caption: 'Initial nacelle design with aerodynamics considerations',
        description: 'First draft of the nacelle design emphasizing aerodynamic efficiency and structural integrity.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/2.jpg',
        caption: 'SolidWorks render of nacelle design',
        description: 'High-fidelity SolidWorks render showcasing the final nacelle design with accessibility features.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/3.jpg',
        caption: 'Team members working on SolidWorks design',
        description: 'Our team collaborating on the SolidWorks design, discussing modifications and improvements.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/4.png',
        caption: 'Team members working on SolidWorks design',
        description: 'Our team collaborating on the SolidWorks design, discussing modifications and improvements.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/utwind/5.jpg',
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
    tags: ['Engineering', 'Design', 'Teamwork'],
    skills: ['CAD', 'SolidWorks', 'Prototyping', 'Team Collaboration'],
    thumbnail: '/praxis_I/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_I/1.jpg',
        caption: 'Praxis I Alpha Release Presentation',
        description: 'Presentation slides from the Praxis I Alpha Release, outlining project objectives and designs.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_I/2.png',
        caption: 'Initial helmet storage solutions sketches',
        description: 'Hand-drawn sketches of initial helmet storage solutions explored during the brainstorming phase.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_I/3.png',
        caption: 'Initial helmet storage solutions sketches',
        description: 'Hand-drawn sketches of initial helmet storage solutions explored during the brainstorming phase.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/praxis_I/4.pdf',
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
    tags: ['Engineering', 'Sustainability', 'Design'],
    skills: ['CAD', 'SolidWorks', 'Sustainable Design', 'Machine Learning'],
    thumbnail: '/praxis-ii/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis-ii/one-pager.png',
        caption: 'Praxis II Final Design One Pager',
        description: 'One-page summary of the final design, highlighting key features and sustainability aspects.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis-ii/poster.png',
        caption: 'Praxis II Project Poster',
        description: 'Project poster showcasing the design process, features, and benefits of the vermicompost separation system.'
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
    tags: ['Engineering', 'Structures', 'Materials'],
    skills: ['SolidWorks', 'CAD', 'Structural Analysis', 'Team Collaboration'],
    thumbnail: '/civ-bridge/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/civ-bridge/final-design.png',
        caption: 'Final bridge design and dimensions',
        description: 'Final design schematics and dimensions of the matboard bridge, focusing on structural integrity.'
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'QG1LaxiMgBY',
        caption: 'Civ Bridge Timelapse and Testing',
        description: 'Timelapse video documenting the construction and testing phase of the Civ Bridge project.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/civ-bridge/iterations.pdf',
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
    tags: ['Web Development', 'Design', 'Engineering'],
    skills: ['HTML', 'CSS', 'JavaScript', 'particles.js', 'FancyBox'],
    thumbnail: '/stopwatch/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/stopwatch/interface.png',
        caption: 'Aesthetic Stopwatch Interface',
        description: 'Screenshot of the stopwatch interface, showcasing its customizable and aesthetic design.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/stopwatch/demo.png',
        caption: 'Stopwatch on Laptop Screen',
        description: 'Image of the Aesthetic Stopwatch running on a laptop, demonstrating its responsiveness and design.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/aesthetic-stopwatch',
      live: 'https://aesthetic-stopwatch.netlify.app/'
    }
  },

  // Pendulum Analysis
  {
    id: 9,
    title: 'Pendulum Analysis',
    brief: 'Research paper analyzing the swing dynamics of a pendulum',
    tags: ['Research', 'Physics', 'Engineering'],
    skills: ['Data Analysis', 'Research', 'Technical Writing'],
    thumbnail: '/pendulum/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/pendulum/visualization.png',
        caption: 'Pendulum swing data visualization',
        description: 'Graphical representation of pendulum swing data, illustrating oscillation periods and amplitude changes.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/pendulum/research-paper.pdf',
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
    id: 10,
    title: 'Model Mania 2019',
    brief: 'SolidWorks model for the 2019 Model Mania design challenge',
    tags: ['Engineering', 'CAD', '3D Modeling'],
    skills: ['SolidWorks', 'CAD', '3D Printing'],
    thumbnail: '/model-mania/thumbnail.png',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/model-mania/cad-model.png',
        caption: 'Model Mania 2019 CAD Screenshot',
        description: 'Screenshot of the SolidWorks model created for the 2019 Model Mania design challenge.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/model-mania-2019',
      live: 'https://modelmania2019.designproject.com'
    }
  },

  // The Legend of Pakicetus (Animated Short)
  {
    id: 11,
    title: 'The Legend of Pakicetus (Animated Short)',
    brief: 'Animated short film about the first whale on land',
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
    id: 12,
    title: 'Nociception - The Perception of Pain',
    brief: 'Animated video explaining how pain is perceived by the body',
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
    id: 13,
    title: 'Biking - The Best Form of City Transportation',
    brief: 'Animated video promoting biking as the best form of transportation',
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
    id: 14,
    title: "Peto's Paradox",
    brief: 'Animated video exploring the biological concept of Peto\'s Paradox',
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

  // Excavator
  {
    id: 15,
    title: 'Excavator (My First Ever Project)',
    brief: 'Hydraulics-powered excavator made from recycled materials',
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
    id: 16,
    title: 'Personal Website',
    brief: 'My personal portfolio website built with web technologies',
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
];

