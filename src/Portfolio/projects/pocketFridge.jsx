// src/Portfolio/projects/pocketFridge.js
export default {
  id: 'pocket-fridge',
  title: 'Pocket Fridge (AI Project)',
  category: ['Engineering'],
  date: '2024/03/30 - 2024/03/31',
  thumbnail: '/assets/images/project_thumbnails/gen_AI_2024/app/Pocket Fridge Figma.png',
  images: [
    '/assets/images/project_thumbnails/gen_AI_2024/app/Pocket Fridge Figma.png',
    '/assets/images/project_thumbnails/gen_AI_2024/GenAI_technologies.png',
    '/assets/images/project_thumbnails/gen_AI_2024/pictures/demo.JPG',
    '/assets/images/project_thumbnails/gen_AI_2024/pictures/mog.jpg',
    '/assets/images/project_thumbnails/gen_AI_2024/pictures/Win.jpg'
  ],
  description: `
    Pocket Fridge is an app I created with Brian Zhang, Patrick Huang, and Sally Jeong
    for the Google GenAI Genesis Hackathon (2024). By scanning receipts, it tracks food
    expiration dates and suggests AI-curated recipes.
  `,
  sections: [
    {
      title: '🧠 Initial Brainstorming',
      content: `
        The idea emerged from our experiences as university students, recognizing the challenges
        of meal planning and food management. The project, though ambitious, required integrating
        multiple AI models we had never worked with before.
      `
    },
    {
      title: '🛠️ Technical Implementation',
      content: `
        Built using the MERN stack (MongoDB, Express.js, React Native, Node.js) with Vertex AI
        integration. Features cloud-deployed Flask API for receipt analysis and recipe generation.
      `
    },
    {
      title: '🏆 Achievement',
      content: `
        Won the Best AI in Climate Change and Sustainability Award at the hackathon.
      `
    }
  ],
  technologies: [
    'MERN Stack',
    'React Native',
    'MongoDB',
    'Express.js',
    'Node.js',
    'Google Cloud',
    'Vertex AI',
    'Gemini Pro Vision',
    'Flask'
  ],
  links: [
    {
      text: 'Project Link',
      url: 'https://devpost.com/software/pocket-fridge'
    }
  ]
}

