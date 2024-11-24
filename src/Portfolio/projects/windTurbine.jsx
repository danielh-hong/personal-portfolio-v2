// src/Portfolio/projects/windTurbine.js
export default {
  id: 'wind-turbine',
  title: 'Wind Turbine Nacelle',
  category: ['Engineering'],
  date: '2023/11/05 - Present',
  thumbnail: '/assets/images/project_thumbnails/utwind_nacelle/nacelle_photo.jpg',
  images: [
    '/assets/images/project_thumbnails/utwind_nacelle/nacelle_photo.jpg',
    '/assets/images/project_thumbnails/utwind_nacelle/nacelle_drawing.png',
    '/assets/images/project_thumbnails/utwind_nacelle/nacelle_solidworks_1.jpg',
    '/assets/images/project_thumbnails/utwind_nacelle/me_pointing_nacelle.jpg',
    '/assets/images/project_thumbnails/utwind_nacelle/Nacelle1.png',
    '/assets/images/project_thumbnails/utwind_nacelle/nacelle2.JPG'
  ],
  description: `
    Designed the nacelle (generator and gearbox housing) for UTWind's turbine competing
    in the 2024 International Small Wind Turbine Contest.
  `,
  sections: [
    {
      title: 'Design Process',
      content: `
        Created an innovative design focusing on accessibility with side openings for
        gearbox access and top hatches for circuitry maintenance.
      `
    },
    {
      title: 'Technical Implementation',
      content: `
        Used Solidworks for modeling and Ansys for aerodynamic simulations and optimization.
      `
    }
  ],
  technologies: [
    'Solidworks',
    'Ansys',
    'CAD Design',
    'Aerodynamic Analysis'
  ]
}

