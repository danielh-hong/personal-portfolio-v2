// ProjectsData.js
// Define media types
export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'pdf'
};

// Define project tags for filtering
export const TAGS = [
  'All',
  'Full Stack Software Development',
  'Hardware Projects',
  'Machine Learning',
  'Robotics',
  'Engineering',
  'Design',
  'AI',
  'Hackathon',
  'Education',
  'Physics',
  'Transportation',
  'Research'
];

// Sample projects array - fully updated with media descriptions
export const projects = [
  // Lurelore, HackTheNorth2024, Finalist
  {
    id: 19,
    title: 'LureLore',
    brief: 'Finalist ($5,000) at Hack the North (Canada\'s largest hackathon) for creating an immersive fishing memory platform where catches become interactive 3D experiences. I contributed 99.7% of the codebase, working on both frontend & backend.',
    tags: ['Web Development', 'AI', '3D Graphics', 'Full Stack', 'Hackathon', 'MERN'],
    skills: [
      'React',
      'Three.js',
      'MongoDB',
      'Express.js',
      'Node.js',
      'Gemini AI',
      'Leaflet.js',
      'RESTful APIs'
    ],
    thumbnail: '/lurelore/thumbnail.jpg',
    startDate: '2024-09',
    endDate: '2024-09',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/lurelore/1.jpg',
        caption: '3D Interactive Aquarium Dashboard',
        description: 'Main dashboard featuring a custom-designed Three.js-powered aquarium where each catch comes to life as an interactive 3D model. Users can click any fish to view detailed catch information, upload photos for AI identification, or capture new catches. Built 99.7% of the codebase including the entire 3D visualization system.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/lurelore/2.jpg',
        caption: 'Winning Presentation at Hack the North',
        description: 'Presenting to 1000+ attendees after winning first place ($5000) at Hack the North 2024, Canada\'s largest hackathon. Project was judged by distinguished panel including OpenAI\'s Head of Engineering and AWS\'s Senior Manager of Startup Solutions.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/lurelore/3.jpg',
        caption: 'Interactive Fishing Map',
        description: 'Location-based feature built with Leaflet.js showing where users have caught fish across the world, complete with detailed catch information and statistics for each location. Implemented real-time catch tracking and custom achievement system.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/lurelore/4.jpg',
        caption: 'Catch Information Modal',
        description: 'Detailed catch information interface showing AI-identified fish species, catch statistics, and custom achievement tracking. Developed during an intense 36-hour hackathon with just one teammate, showcasing rapid learning and development capabilities.'
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'IiKA0Ij20ZM',
        caption: 'LureLore Demo Video',
        description: 'Quick project demonstration video scrapped together during the last minutes of the hackathon showcasing the core features and functionality of LureLore. Because of this video we nearly missed the deadline!'
      },
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'I5dP9mbnx4M',
        caption: 'Winning Presentation at Hack the North',
        description: 'Live recording of our first-place winning presentation in front of 1000+ attendees at Hack the North, demonstrating the complete platform and its impact.'
      }
    ],
    links: {
      github: 'https://github.com/danielh-hong/LureLore',
      live: 'https://devpost.com/software/lurelore'
    }
  },


  // 2t7 Engsci Survey, Engsci 2t7 Survey
  {
    id: 18,
    title: 'EngSci 2T7 Major Survey',
    brief: 'Full-stack MERN application enabling 250+ Engineering Science students to track and visualize major preferences, achieving 95% class participation with 1000+ unique visits',
    tags: ['Web Development', 'Full Stack', 'Data Visualization'],
    skills: [
      'React',
      'MongoDB',
      'Express.js',
      'Node.js',
      'RESTful APIs',
      'Recharts',
      'Data Visualization',
      'Frontend Development'
    ],      thumbnail: '/2t7_survey/thumbnail.png',
    startDate: '2024-10',
    endDate: '2024-12',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/2t7_survey/1.png',
        caption: 'Voting Page',
        description: 'Interactive voting interface featuring a custom-designed drag-and-drop ranking system with validation. Users can easily rank their major preferences with a smooth, intuitive interface. Submissions are stored in a Mongo DB backend. Implements cookie-based validation to prevent duplicate submissions. Features a dynamic background pattern made using custom CSS animations. https://2t7-major-survey.vercel.app/vote'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/2t7_survey/2.png',
        caption: 'Results Page',
        description: 'Data visualization dashboard built with Recharts, showing real-time major preference trends across 250+ Engineering Science students. Features interactive charts, multi-parameter search functionality, and detailed statistics. Backend powered by MongoDB with RESTful APIs for efficient data aggregation and real-time updates. Achieved 95% class participation with 1000+ unique visits.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/2t7_survey/3.png',
        caption: 'About Page',
        description: 'About page explaining the platform\'s purpose and functionality. Features a responsive design using custom React components. Also features a contact page.'
      }
    ],
    links: {
      github: 'https://github.com/danielh-hong/2t7-major-survey',
      live: 'https://2t7-major-survey.vercel.app/results'
    },
  },
    
  // Hackathon Project HawkHacks Basemint Cryptocurrency
  {
    id: 17,
    title: 'Market Basemint',
    brief: 'Decentralized NFT Marketplace for E-sports Tickets & Rewards made & deployed on the NEAR Protocol mainnet, winning 1st ($3,000) at the Hawkhacks Hackathon',
    tags: ['Robotics', 'Engineering', 'Hackathon', 'Web Development'],
    skills: ['Typescript', 'React', 'NEAR Blockchain', 'Cryptocurrency', 'Web3', 'Full Stack Development'],
    thumbnail: '/market_basemint/thumbnail.png',
    startDate: '2023-05',
    endDate: '2024-05',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/market_basemint/1.png',
        caption: 'Screenshot of the website.',
        description: 'Screenshot of the site, featuring the modal cryptocurrency wallet connection UI. The transaction mechanisms are fully functional, and all NFT\'s are connected to the mainnet of the 8-billion dollar NEAR cryptocurrency network. The live site can be viewed at https://marketbasemint.vercel.app/'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/market_basemint/2.jpg',
        caption: 'Picture of my team at the hackathon.',
        description: 'This project won my team first place at the Hawkhacks cryptocurrency hackathon, winning $3,000 dollars.'
      },
    ],
    links: {
      github: 'https://github.com/audgeviolin07/marketbasemint',
      live: 'https://marketbasemint.vercel.app/'
    }
  },


  // Quadcopter Design
  {
    id: 16,
    title: 'Quadcopter Fuselage Design',
    brief: 'Helped design the fuselage and bulkheads of a quadcopter drone system for the Univesity of Toronto Aerospace Team using Solidworks',
    tags: ['Robotics', 'Engineering'],
    skills: ['CAD', 'SolidWorks', 'PID Controllers', 'Python'],
    thumbnail: '/quadcopter/thumbnail.jpg',
    startDate: '2023-09',
    endDate: '2024-01',
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
    id: 15,
    title: 'Pocket Fridge (AI Project)',
    brief: 'AI-powered app to manage fridge inventory and suggest recipes, winning first place in the Sustainability category at the Google Genesis AI Hackathon.',
    tags: ['Engineering', 'Web Dev', 'AI'],
    skills: ['MERN Stack', 'React Native', 'Python', 'Vertex AI', 'MongoDB', 'Express.js', 'Node.js', 'Flask'],
    thumbnail: '/pocket_fridge/thumbnail.png',
    startDate: '2024-03',
    endDate: '2024-03',
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
    id: 14,
    title: 'EcoSort: SmartWaste Assistant',
    brief: 'Automatic, voice-controlled waste dispenser',
    tags: ['Engineering', 'Hackathon', 'IoT'],
    skills: ['Python', 'Raspberry Pi', 'Arduino', 'Machine Learning', 'Voice Recognition', 'Google Speech API'],
    thumbnail: '/ecosort/thumbnail.jpg',
    startDate: '2024-02',
    endDate: '2024-02',
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
    id: 13,
    title: 'Wind Turbine Nacelle',
    brief: 'Design of accessible nacelle for wind turbines made with Solidworks.',
    tags: ['Engineering', 'Mechanical Design'],
    skills: ['SolidWorks', 'CAD', 'Aerodynamics', 'Team Collaboration'],
    thumbnail: '/utwind/thumbnail.jpg',
    startDate: '2023-09',
    endDate: '2024-05',
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
    id: 12,
    title: 'Praxis I',
    brief: 'Designing a helmet storage solution for bike commuters',
    tags: ['Engineering', 'Design', 'Teamwork'],
    skills: ['CAD', 'SolidWorks', 'Prototyping', 'Team Collaboration'],
    thumbnail: '/praxis_I/thumbnail.png',
    startDate: '2023-09',
    endDate: '2024-01',
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
    id: 11,
    title: 'Praxis II',
    brief: 'Design of an efficient vermicompost worm separation system for Allan Gardens',
    tags: ['Engineering', 'Sustainability', 'Design'],
    skills: ['CAD', 'SolidWorks', 'Sustainable Design', 'Machine Learning'],
    thumbnail: '/praxis_II/1.png',
    startDate: '2024-01',
    endDate: '2024-05',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_II/1.png',
        caption: 'CAD Render created with Solidworks of our Final Worm-Wheel Design.',
        description: 'WormWheel Vermicompost Device created for Allen Gardens, as part of the Praxis-II Course Project.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_II/2.jpg',
        caption: 'My Praxis team.',
        description: 'My Praxis team practicing for the final showcase of our Vermicompost Device.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/praxis_II/3.png',
        caption: 'Poster I designed',
        description: 'The 6 foot x 3 foot Poster of our Worm Wheel device highlighting key features and sustainability aspects.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/praxis_II/4.pdf',
        caption: 'PDF Featuring Worm Wheel Features',
        description: 'A PDF I designed detailing all the key features of the Worm Wheel Vermicomposting device.'
      }
    ],
    links: {
      github: 'https://github.com/yourusername/praxis_II',
      live: 'https://praxis2.designproject.com'
    }
  },

  // Civ Bridge
  {
    id: 10,
    title: 'Civ Bridge',
    brief: 'Design and testing of a matboard bridge for structural integrity',
    tags: ['Engineering', 'Structures', 'Materials'],
    skills: ['SolidWorks', 'CAD', 'Structural Analysis', 'Team Collaboration'],
    thumbnail: '/civ_bridge/thumbnail.png',
    startDate: '2023-11',
    endDate: '2024-01',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/civ_bridge/1.png',
        caption: 'Final bridge design and dimensions',
        description: 'Final design schematics and dimensions of the matboard bridge, optimized for the in-class test.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/civ_bridge/2.png',
        caption: 'Holding the Civ Bridge',
        description: 'My team holding our civ bridge on the day of the final bridge test.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/civ_bridge/3.jpg',
        caption: 'Creating the bridge',
        description: 'A picture of my teammate carefully cutting on the different pieces of the matboard bridge using our limited materials.'
      },
      {
        type: MEDIA_TYPES.PDF,
        url: '/civ_bridge/4.pdf',
        caption: 'All Bridge Cross Section Iterations',
        description: 'PDF details the 9 iterations made of the cross section of the matboard, each made in order to optimize the design.'
      }
    ],
    links: {

    }
  },

  // Aesthetic Stopwatch
  {
    id: 9,
    title: 'Customizable, Aesthetic Stopwatch',
    brief: 'My first ever JS Project: a web-based customizable stopwatch.',
    tags: ['Web Dev', 'Design', 'Engineering'],
    skills: ['HTML', 'CSS', 'Vanilla JavaScript', 'particles.js', 'FancyBox'],
    thumbnail: '/aesthetic_stopwatch/1.png',
    startDate: '2024-04',
    endDate: '2024-05',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/aesthetic_stopwatch/1.png',
        caption: 'Aesthetic Stopwatch Interface on Laptop',
        description: 'This stop watch project was my first ever web development project, and uses Vanilla J.S, & CSS.'
      },
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/aesthetic_stopwatch/2.png',
        caption: 'Stopwatch on Laptop Screen',
        description: 'Image of the Aesthetic Stopwatch running on a an ipad..'
      }
    ],
    links: {
      github: 'https://github.com/danielh-hong/browser_stopwatch',
      live: 'https://aesthetic-stopwatch.netlify.app/'
    }
  },

  // Pendulum Analysis
  {
    id: 8,
    title: 'Pendulum Analysis',
    brief: 'PHY180 Paper analyzing the swing dynamics of a pendulum',
    tags: ['Research', 'Physics', 'Engineering'],
    skills: ['Data Analysis', 'Research', 'Technical Writing'],
    thumbnail: '/pendulum_analysis/thumbnail.png',
    startDate: '2023-09',
    endDate: '2023-12',
    media: [
      {
        type: MEDIA_TYPES.PDF,
        url: '/pendulum_analysis/1.pdf',
        caption: 'Pendulum swing data final paper',
        description: 'Report on the swing of a pendulum, made for the PHY180 Engsci course.'
      },

    ]
  },

  // The Legend of Pakicetus (Animated Short)
  {
    id: 6,
    title: 'The Legend of Pakicetus (Animated Short)',
    brief: 'Animated short film about the first whale on land made with After Effects & Premiere Pro',
    tags: ['Animation', 'Video Production', 'Storytelling'],
    skills: ['After Effects', 'Illustrator', 'Photoshop', 'Premiere Pro', 'Media Encoder'],
    thumbnail: '/pakicetus/thumbnail.png',
    startDate: '2022-04',
    endDate: '2022-06',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '8I9feeSzREQ',
        caption: 'The Legend of Pakicetus on YouTube',
        description: 'An animated short film I made for the culminating of my AP Design course that tells the story of Pakicetus, the first whale to venture onto land.'
      }
    ],
    links: {
      live: 'https://youtu.be/8I9feeSzREQ'
    }
  },

  // Nociception - The Perception of Pain
  {
    id: 5,
    title: 'Nociception - The Perception of Pain',
    brief: 'Animated video for the 2020 Breakthrough Junior Challenge explaining how pain is perceived by the body',
    tags: ['Education', 'Animation', 'Biology'],
    skills: ['Illustrator', 'Photoshop', 'After Effects', 'Premiere Pro'],
    thumbnail: '/nociception/thumbnail.png',
    startDate: '2021-05',
    endDate: '2021-07',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '/ZZlT_Oz8HyI?si=_KZf-hfCe1QvqD-U',
        caption: 'Watch Nociception on YouTube',
        description: 'Animated explanation of nociception and how the body perceives pain.'
      }
    ],
    links: {
      live: 'https://www.youtube.com/watch?v=ZZlT_Oz8HyI&t=4s'
    }
  },

  // Biking - The Best Form of City Transportation
  {
    id: 4,
    title: 'Biking - The Best Form of City Transportation',
    brief: 'Animated video promoting biking as the best form of transportation',
    tags: ['Advocacy', 'Animation', 'Transportation'],
    skills: ['Illustrator', 'Photoshop', 'After Effects', 'Premiere Pro'],
    thumbnail: '/biking_video/thumbnail.png',
    startDate: '2022-05',
    endDate: '2022-07',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'y_c79vshk14',
        caption: '"Biking - The Best Form of City Transportation" on YouTube',
        description: 'Animated advocacy video promoting biking as the most efficient and sustainable form of city transportation made for my 11th grade english culminating.'
      }
    ],
    links: {
      live: 'https://youtu.be/y_c79vshk14?si=Rt8v7-Tx5k_8oc_u'
    }
  },

  // Peto's Paradox
  {
    id: 3,
    title: "Peto's Paradox",
    brief: 'Animated video exploring the biological concept of Peto\'s Paradox, & my first animated video made for the 2020 Junior Breakthrough Challenge.',
    tags: ['Biology', 'Animation', 'Education'],
    skills: ['After Effects', 'Illustrator', 'Photoshop', 'Premiere Pro'],
    thumbnail: '/petos_paradox/thumbnail.png',
    startDate: '2020-03',
    endDate: '2021-06',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: '2Xf_u02zm8k',
        caption: 'Watch Peto\'s Paradox on YouTube',
        description: 'Animated exploration of Peto\'s Paradox and its implications in biology. This video was made for the 2020 Breakthrough Junior Challenge and placed me in the top 5% of over 5,000 competitors. This video was made during the COVID-19 lockdown and is quite memorable to me.'
      }
    ],
    links: {
      live: 'https://youtu.be/2Xf_u02zm8k?si=lyKa23qDK47Q-2AO'
    }
  },

  // Excavator
  {
    id: 2,
    title: 'Excavator',
    brief: 'Hydraulics-powered excavator made from recycled materials (my first ever engineering project)!',
    tags: ['Engineering', 'Robotics', 'Hydraulics'],
    skills: ['Basic Engineering', 'Hydraulics', 'Recycled Materials'],
    thumbnail: '/excavator/thumbnail.png',
    startDate: '2017-02',
    endDate: '2017-06',
    media: [
      {
        type: MEDIA_TYPES.VIDEO,
        youtubeId: 'JOrUQsLdYow',
        caption: 'Watch Excavator Project on YouTube',
        description: 'Video showcasing the hydraulics-powered excavator I made with my dad completely out of recycled materials in 5th grade. This project holds a dear place in my heart.'
      }
    ],
    links: {
      live: 'https://youtu.be/JOrUQsLdYow?si=JBFLzW-WEgpy9yk1'
    }
  },

  // OLd Personal Website
  {
    id: 1,
    title: 'Old Personal Website',
    brief: 'My first personal portfolio website built with vanilla JS & CSS, made off of CodeWithSadee\'s template.',
    tags: ['Web Dev', 'Design'],
    skills: ['HTML', 'CSS', 'Vanilla JavaScript', 'particles.js', 'FancyBox'],
    thumbnail: '/old_website/thumbnail.png',
    startDate: '2024-02',
    endDate: '2024-10',
    media: [
      {
        type: MEDIA_TYPES.IMAGE,
        url: '/old_website/thumbnail.png',
        caption: 'Personal Website Homepage',
        description: 'Screenshot of the homepage of my old personal website, highlighting the interactive particles background and navigation.',
        thumbnail: '/old_website/thumbnail.png',
      }
    ],
    links: {
      github: 'https://github.com/danielh-hong/personal-portfolio',
      live: 'https://daniel-hong.netlify.app/'
    }
  }
];
