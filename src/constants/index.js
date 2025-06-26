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
  retodo,
  retodo1,
  retodo2,
  retodo3,
  turf,
  jobit,
  tripguide,
  weather,
  threejs,
  cook,
  game,
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
    id: "contact",
    title: "Contact",
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

// Web Applications
export const webApplications = [
  {
    name: "RiField Turf Booking",
    description:
      "A MERN stack turf booking platform with multi-portal access, secure authentication, real-time booking management, Razorpay payments, automated notifications, analytics dashboards, and state management using Redux Toolkit.",
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
    source_code_link: "https://rifield-web-appuser-65d9.vercel.app",
    type: "web"
  },
  {
    name: "COokiFy",
    description: 
      "A recipe discovery platform built with React and Node.js that helps users find recipes based on ingredients they have. Features include multilingual support (English, Malayalam, Tamil), voice-controlled cooking instructions, recipe search with ingredient matching, user reviews and ratings, favorites system, chatbot assistance, and recipe nutrition calculation.",
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
    source_code_link: "https://cookifyy.vercel.app/",
    type: "web"
  },
  {
    name: "CTF Platform",
    description:
    "A comprehensive Capture The Flag (CTF) platform with user authentication, timed challenges, admin dashboard, and cloud reporting features. The platform allows users to solve progressive levels of security challenges within a time limit. It includes admin capabilities for managing users, challenges, and progress tracking. Additional features include a community chat system, offline mode support, responsive design with dark/light themes, and a specialized cloud dashboard for monitoring system status.",
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
    source_code_link: "https://biztrastech.vercel.app/",
    type: "web"
    },
    {
      name: "BladeRunner",
      description: 
          "A sophisticated engine analysis platform designed for advanced performance optimization and monitoring. BladeRunner provides a secure authentication system with admin approval workflow, interactive dashboards for real-time engine data visualization, and comprehensive analytics tools. The platform features multiple specialized views including engine variants exploration, performance metrics, and flight speed analysis. Built with a modern tech stack, it includes responsive design, dark/light theme support, and Microsoft authentication integration. The system architecture consists of a React frontend, Node.js backend, and Python-based analytics engine with containerized deployment via Kubernetes.",
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
              name: "Tailwind CSS",
              color: "pink-text-gradient",
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
      source_code_link: "https://bladerunner.greenjets.com/",
      type: "web"
  },
  {
    name: "Ri-MediConsult",
    description:
    "A comprehensive telemedicine platform built with Next.js and Node.js that connects patients with verified doctors through secure video consultations. Features include real-time video calling, credit-based subscription system, doctor verification and profiles, appointment scheduling and management, medical records storage, flexible payment packages with non-expiring credits, patient-doctor rating system, multi-device responsive design, and HIPAA-compliant secure data handling for seamless healthcare delivery anytime, anywhere.",
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
     name: "ShadeCn Ui",
     color: "pink-text-gradient",
    }
    ],
    image: doc,
    source_code_link: "https://ri-mediconsult.vercel.app/",
    type: "web"
  },
  {
    name: "Ri-Puzzlet",
    description:
    "An interactive AI-powered word puzzle game built with Next.js and React that challenges players with intelligent word guessing gameplay. Features include dual game modes (custom word creation and AI-generated puzzles), Google Gemini AI integration for dynamic word generation, customizable difficulty levels with 3-8 letter words, adjustable attempt limits and time constraints, multiple themed categories (animals, food, technology, sports), real-time feedback with color-coded tile animations, progress tracking with local statistics storage, responsive dark/light mode themes, keyboard and touch input support, and seamless cross-device compatibility for engaging brain training entertainment anywhere, anytime.",
    tags: [
    {
     name: "Next.js",
     color: "blue-text-gradient",
    },
    {
     name: "React.js",
     color: "green-text-gradient",
    },
    {
     name: "Generative AI",
     color: "yellow-text-gradient",
    }
    ],
    image: game,
    source_code_link: "https://ri-puzzle.vercel.app/",
    type: "web"
  }
];

// Mobile Apps
export const mobileApps = [
  {
    name: "Retodo",
    description:
      "An AI-powered todo application featuring voice notes, intelligent task suggestions, and a conversational chatbot assistant named 'Cookie.' Built with Flutter, it offers smart notifications, priority-based organization, and productivity analytics. The app includes voice-to-task conversion, real-time synchronization, and adaptive themes for seamless cross-platform task management and enhanced productivity workflows.",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient",
      },
      {
        name: "AI Assistant",
        color: "green-text-gradient",
      },
      {
        name: "Voice Recognition",
        color: "pink-text-gradient",
      },
      {
        name: "Cross-platform",
        color: "orange-text-gradient",
      },
    ],
    image: retodo,
    screenshots: [retodo1, retodo2, retodo3],
    apk_download_link: "https://drive.google.com/file/d/1BJ1Mw8fONdaKq8y6wfNEW7hMYha9mUIH/view?usp=drive_link",
    features: [
      "AI-powered task suggestions",
      "Voice-to-task conversion",
      "Conversational chatbot assistant 'Cookie'",
      "Smart notifications and reminders",
      "Priority-based task organization",
      "Productivity analytics and insights",
      "Real-time synchronization",
      "Adaptive light/dark themes",
      "Cross-platform compatibility",
      "Offline mode support"
    ],
    type: "mobile"
  },
];

export const projects = webApplications;
export const allProjects = [...webApplications, ...mobileApps];