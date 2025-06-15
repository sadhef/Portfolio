import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  kubernetes,
  meta,
  biztras,
  tesla,
  shopify,
  carrent,
  doc,
  biz,
  blade,
  turf,
  jobit,
  tripguide,
  weather,
  threejs,
  cook,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

export const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "Kubernetes",
    icon: kubernetes,
  },
];

export const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Biztras",
    icon: biztras,
    iconBg: "#383E56",
    date: "October 2024 - April 2025",
    points: [
      "Developed a web application using React.js, Express.js, Node.js, MongoDB, PostgreSQL, and Docker for containerization, ensuring a scalable and efficient architecture.",
      "Integrated Python for data science, AI, and machine learning functionalities, utilizing Dash to build interactive data visualizations and dashboards.",
      "Combined React.js for the front-end with Dash in Python to create a seamless user interface, merging the power of React's dynamic components with Python's data-driven insights.",
      "Gained hands-on experience in handling both full-stack web development and data-driven applications, leveraging a diverse tech stack to meet project requirements.",
    ],
  },
];

export const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Mohammed proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Mohammed does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Mohammed optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export const projects = [
  {
    id: 1,
    name: "RiField Turf Booking",
    description:
      "A comprehensive MERN stack turf booking platform featuring multi-portal access, secure authentication, real-time booking management, integrated Razorpay payments, automated notifications, analytics dashboards, and efficient state management using Redux Toolkit. The platform serves both customers and administrators with distinct user experiences.",
    tags: [
      {
        name: "MERN Stack",
        color: "blue-text-gradient",
      },
      {
        name: "Redux",
        color: "green-text-gradient",
      },
      {
        name: "RazorPay",
        color: "pink-text-gradient",
      },
    ],
    image: turf,
    source_code_link: "https://github.com/your-username/rifield-turf-booking",
    live_demo_link: "https://rifield-web-appuser-65d9.vercel.app",
    completionDate: "2024-12-01",
    duration: "3 months",
    teamSize: 2,
    features: [
      "Multi-portal authentication system (User/Admin/Owner)",
      "Real-time turf availability and booking management",
      "Integrated Razorpay payment gateway",
      "Automated email notifications and SMS alerts",
      "Admin analytics dashboard with booking insights",
      "Mobile-responsive design with PWA capabilities",
      "Advanced filtering and search functionality",
      "Booking history and user profile management"
    ]
  },
  {
    id: 2,
    name: "COokiFy",
    description: 
      "A comprehensive recipe discovery platform built with React and Node.js that helps users find recipes based on ingredients they have. Features multilingual support (English, Malayalam, Tamil), voice-controlled cooking instructions, intelligent recipe search with ingredient matching, user reviews and ratings, favorites system, AI chatbot assistance, and detailed nutrition calculation.",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "yellow-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      }
    ],
    image: cook,
    source_code_link: "https://github.com/your-username/cookify",
    live_demo_link: "https://cookifyy.vercel.app/",
    completionDate: "2024-10-15",
    duration: "2.5 months",
    teamSize: 1,
    features: [
      "Multilingual support (English, Malayalam, Tamil)",
      "Voice-controlled cooking instructions",
      "Ingredient-based recipe search and matching",
      "User reviews, ratings, and favorites system",
      "AI-powered chatbot for cooking assistance",
      "Detailed nutrition calculation and dietary info",
      "Social features for recipe sharing",
      "Offline recipe storage capabilities"
    ]
  },
  {
    id: 3,
    name: "CTF Platform",
    description:
      "A comprehensive Capture The Flag (CTF) platform with user authentication, timed challenges, admin dashboard, and cloud reporting features. The platform allows users to solve progressive levels of security challenges within time limits. Includes admin capabilities for managing users, challenges, and progress tracking with community chat system, offline mode support, and specialized cloud dashboard.",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "yellow-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      }
    ],
    image: biz,
    source_code_link: "https://github.com/your-username/ctf-platform",
    live_demo_link: "https://biztrastech.vercel.app/",
    completionDate: "2024-09-20",
    duration: "4 months",
    teamSize: 3,
    features: [
      "Progressive security challenge levels",
      "Real-time leaderboard and scoring system",
      "Admin dashboard for challenge management",
      "Timed challenges with automatic submission",
      "Community chat system for participants",
      "Offline mode support for practice",
      "Cloud monitoring and reporting dashboard",
      "Dark/light theme with responsive design"
    ]
  },
  {
    id: 4,
    name: "BladeRunner",
    description: 
      "A sophisticated engine analysis platform designed for advanced performance optimization and monitoring. BladeRunner provides a secure authentication system with admin approval workflow, interactive dashboards for real-time engine data visualization, and comprehensive analytics tools. Features multiple specialized views including engine variants exploration, performance metrics, and flight speed analysis with containerized deployment.",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "yellow-text-gradient",
      },
      {
        name: "Docker",
        color: "orange-text-gradient",
      },
      {
        name: "Kubernetes",
        color: "purple-text-gradient",
      }
    ],
    image: blade,
    source_code_link: "https://github.com/your-username/bladerunner",
    live_demo_link: "https://bladerunner.greenjets.com/",
    completionDate: "2024-11-30",
    duration: "5 months",
    teamSize: 4,
    features: [
      "Real-time engine performance monitoring",
      "Interactive data visualization dashboards",
      "Engine variant exploration and comparison",
      "Flight speed analysis and optimization",
      "Microsoft authentication integration",
      "Python-based analytics engine",
      "Containerized deployment with Kubernetes",
      "Admin approval workflow system"
    ]
  },
  {
    id: 5,
    name: "Ri-MediConsult",
    description:
      "A comprehensive telemedicine platform built with Next.js and Node.js that connects patients with verified doctors through secure video consultations. Features real-time video calling, credit-based subscription system, doctor verification and profiles, appointment scheduling, medical records storage, flexible payment packages, patient-doctor rating system, and HIPAA-compliant secure data handling.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "yellow-text-gradient",
      },
      {
        name: "ShadCN UI",
        color: "pink-text-gradient",
      }
    ],
    image: doc,
    source_code_link: "https://github.com/your-username/ri-mediconsult",
    live_demo_link: "https://ri-mediconsult.vercel.app/",
    completionDate: "2024-08-15",
    duration: "3.5 months",
    teamSize: 2,
    features: [
      "Secure HD video consultations",
      "Credit-based subscription system",
      "Doctor verification and profile system",
      "Appointment scheduling and management",
      "Electronic medical records storage",
      "Multi-device responsive design",
      "Patient-doctor rating and review system",
      "HIPAA-compliant data security"
    ]
  },
  {
    id: 6,
    name: "RIFILX Movie Website",
    description:
      "A modern React application using Vite and Bootstrap that displays curated movie collections with reusable components including Header, Movie, and MovieList. Features external API integration for fetching movie data, responsive design, movie search and filtering capabilities, and an intuitive user interface for browsing favorite movies and discovering new content.",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Vite",
        color: "green-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "yellow-text-gradient",
      },
      {
        name: "REST API",
        color: "pink-text-gradient",
      }
    ],
    image: weather, // Using weather as placeholder, replace with actual movie project image
    source_code_link: "https://github.com/your-username/rifilx-movie",
    live_demo_link: "https://rifilx-movie.vercel.app/",
    completionDate: "2024-07-10",
    duration: "1.5 months",
    teamSize: 1,
    features: [
      "External movie API integration",
      "Responsive component-based architecture",
      "Advanced search and filtering",
      "Movie details and trailer integration",
      "Favorites and watchlist functionality",
      "Clean and intuitive user interface",
      "Fast loading with Vite build tool",
      "Mobile-first responsive design"
    ]
  }
];

export default {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
};