export const skills = {
  Programming: ['C', 'Java', 'Python', 'JavaScript', 'SQL'],

  Frontend: ['HTML', 'CSS', 'React', 'Tailwind CSS'],

  Backend: ['Node.js', 'Express.js'],

  Database: ['MySQL'],

  Tools: ['Git', 'GitHub', 'VS Code', 'Vite'],

  Embedded: [
    'STM32',
    'Embedded C',
    'UART',
    'LCD',
    'LM35',
    'Sensors',
  ],
}

export const projects = [
  {
    title: 'RideSwap',
    subtitle: 'Vehicle Rental Platform',

    description:
      'A full-stack vehicle rental platform designed to connect vehicle owners and renters through a simple and responsive web interface.',

    tech: [
      'React',
      'Node.js',
      'Express.js',
      'MySQL',
    ],

    live: null,

    github: 'https://github.com/srikarmalla',
  },

  {
    title: 'Smart Temperature-Based Fan/AC Recommendation System',
    subtitle: 'STM32 Embedded System',

    description:
      'An embedded system that reads temperature using an LM35 sensor connected to an STM32F401CCU6, displays the temperature on a 16×2 LCD and provides fan or AC recommendations through UART.',

    tech: [
      'STM32F401CCU6',
      'Embedded C',
      'LM35',
      'LCD',
      'UART',
    ],

    live: null,

    github: 'https://github.com/srikarmalla',
  },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering',

    school: 'Amrita Vishwa Vidyapeetham, Coimbatore',

    period: '2023 – 2027',

    detail:
      'Computer Science & Engineering student at Amrita School of Computing.',
  },
]