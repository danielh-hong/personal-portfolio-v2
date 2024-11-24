// src/Portfolio/projects/ecoSort.js
export default {
  id: 'eco-sort',
  title: 'EcoSort: SmartWaste Assistant',
  category: ['Engineering'],
  date: '2024/02/17 - 2024/02/18',
  thumbnail: '/assets/images/project_thumbnails/makeuoft2024/makeuoft_3.jpg',
  images: [
    '/assets/images/project_thumbnails/makeuoft2024/makeuoft_3.jpg',
    '/assets/images/project_thumbnails/makeuoft2024/makeuoft_2.jpg',
    '/assets/images/project_thumbnails/makeuoft2024/team_work.jpg'
  ],
  description: `
    Voice-controlled automatic waste dispenser created at MakeUoft 2024. Uses machine learning
    to categorize waste items and automate bin selection.
  `,
  sections: [
    {
      title: '💻 Technical Details',
      content: `
        Integrates IR motion detection, voice recognition via Google Speech API, 
        and a custom-trained Naïve Bayes classifier for waste categorization.
        Arduino controls servo motors for bin operation.
      `
    },
    {
      title: '👥 Team Collaboration',
      content: `
        First hackathon experience working with Quinn Agrawal, Omar Shousha, and 
        Shervin Darmanki Farahani. Despite limited experience, we achieved a working prototype.
      `
    }
  ],
  technologies: [
    'Python',
    'Raspberry Pi',
    'Arduino',
    'Google Speech API',
    'Machine Learning',
    'Servo Motors'
  ],
  links: [
    {
      text: 'Project Page',
      url: 'https://devpost.com/software/ecosort-smartwaste-assistant'
    }
  ]
}
