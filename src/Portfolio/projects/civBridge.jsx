// src/Portfolio/projects/civBridge.jsx
export default {
  id: 'civ-bridge',
  title: 'CIV102 Bridge Design',
  category: ['Engineering'],
  date: '2023/11/01 - 2023/12/30',
  thumbnail: '/assets/images/project_thumbnails/civ_bridge/holding_bridge_new.png',
  images: [
    '/assets/images/project_thumbnails/civ_bridge/Holding Bridge 4x3.png',
    '/assets/images/project_thumbnails/civ_bridge/I made the thing.png',
    '/assets/images/project_thumbnails/civ_bridge/Desmos Bridge.png'
  ],
  description: `
    Designed and built a 2m bridge using matboard and contact cement for the
    Structures and Materials course final project.
  `,
  sections: [
    {
      title: 'Design Process',
      content: `
        Created a bridge theoretically capable of supporting 1300N, balancing
        multiple failure modes including compression, tension, and thin plate buckling.
      `
    },
    {
      title: 'Learning Experience',
      content: `
        Though the bridge failed earlier than calculated, it provided valuable
        insights about the difference between theoretical and practical engineering.
      `
    }
  ],
  technologies: [
    'Structural Analysis',
    'CAD Design',
    'Materials Engineering',
    'Physical Construction'
  ],
  video: 'https://www.youtube.com/embed/QG1LaxiMgBY?autoplay=1&mute=1'
}
