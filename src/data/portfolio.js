export const skills = {
  Programming: ['C', 'Java', 'Python', 'JavaScript', 'SQL'],

  Frontend: ['HTML', 'CSS', 'React', 'Tailwind CSS'],

  Backend: ['Node.js', 'Express.js'],

  Database: ['MySQL', 'MongoDB'],

  Tools: [
    'Git',
    'GitHub',
    'VS Code',
    'Vite',
    'Eclipse IDE',
    'Code::Blocks',
  ],
}

export const projects = [
  {
    title: 'SpendWise',
    subtitle: 'Full-Stack Expense Tracker',

    description:
      'A full-stack personal finance and expense tracking application that allows users to record and categorize income and expenses, analyze transactions with interactive charts, and monitor their financial health in real time.',

    tech: [
      'React',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Recharts',
      'REST API',
    ],

    highlights: [
      'Interactive financial dashboard with real-time income, expense & balance metrics',
      'Dynamic transaction categorization, filtering, sorting, and monthly analytics charts',
      'REST API backend deployed on Render with persistent MongoDB database storage',
    ],

    live: 'https://spend-wise-expense-tracker-brown.vercel.app',

    github: 'https://github.com/srikarmalla/SpendWise-Expense-Tracker',
  },

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

    highlights: [
      'Vehicle listing and browsing workflow',
      'REST API backend with relational MySQL schema',
      'Responsive full-stack user experience',
    ],

    live: null,

    github: 'https://github.com/srikarmalla/rideswap',
  },

  {
    title: 'Smart Temperature-Based Fan/AC Recommendation System',
    subtitle: 'STM32 Embedded System',

    description:
      'An embedded temperature monitoring and control system using an STM32F401CCU6 and LM35 sensor to monitor temperature, display readings on a 16×2 LCD, and provide fan or AC recommendations.',

    tech: [
      'STM32F401CCU6',
      'Embedded C',
      'LM35',
      '16×2 LCD',
      'UART',
      'HC-05 Bluetooth',
    ],

    highlights: [
      'Real-time analog temperature sampling via ADC',
      'Formatted 16×2 LCD screen driver integration',
      'Serial UART telemetry & Bluetooth communication',
    ],

    live: null,

    github: 'https://github.com/srikarmalla',
  },

  {
    title: 'Drum Kit',
    subtitle: 'Interactive Web Drum Kit',

    description:
      'An interactive browser-based drum kit that lets users play seven different drum sounds using keyboard shortcuts or mouse clicks, with responsive design and visual feedback.',

    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Web Audio API',
    ],

    highlights: [
      'Zero-latency Web Audio API sound synthesis',
      'Dual keyboard & pointer event listeners',
      'Responsive visual key press feedback',
    ],

    live: null,

    github: 'https://github.com/srikarmalla/drum-kit',
  },
]

export const education = [
  {
    degree: 'B.Tech – Computer Science & Engineering',

    board: null,

    school: 'Amrita Vishwa Vidyapeetham, Coimbatore',

    period: '2024 – 2028',

    detail:
      'Computer Science & Engineering student at Amrita School of Computing.',
  },

  {
    degree: 'Intermediate – MPC',

    board: 'Board of Intermediate Education, Andhra Pradesh',

    school: 'Narayana Junior College, Vellanki, Visakhapatnam',

    period: '2022 – 2024',

    detail:
      'Mathematics, Physics & Chemistry.',
  },

  {
    degree: 'Secondary School',

    board: 'CBSE (Central Board of Secondary Education)',

    school: 'Narayana Residential School, Tallavalasa, Visakhapatnam',

    period: '2022',

    detail:
      'Completed Class 10 under the CBSE curriculum.',
  },
]
