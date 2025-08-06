export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    address: string;
    linkedin: string;
    avatar?: string;
  };
  objective: string;
  experience: Experience[];
  education: Education[];
  skills: {
    technical: string[];
    soft: string[];
  };
  awards: Award[];
  certificates: Certificate[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  techStack: string[];
  achievements?: string[];
  features?: {
    miniApp?: string[];
    dashboard?: string[];
  };
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export const cvData: CVData = {
  personalInfo: {
    name: "BUI VAN GIANG",
    title: "R&D Engineer / FE Developer",
    dateOfBirth: "22-09-1992",
    phone: "08164*****",
    email: "giang*******@gmail.com",
    address: "Thoi An Ward, Ho Chi Minh City, Vietnam",
    linkedin: "https://www.linkedin.com/in/buivangiang1992/",
    avatar: "/assets/characters/hero-idle.png",
  },
  objective:
    "Highly motivated professional with diverse skills and multidisciplinary experience, seeking a challenging position to leverage my technical expertise and problem-solving abilities. I aim to contribute effectively to team performance and organizational success while continuously developing my skills and embracing new technologies.",
  experience: [
    {
      id: "exp1",
      company: "QI Technologies Corporation / Sao Bac Dau Technologies",
      position: "R&D Engineer",
      period: "Apr 2020 - Present",
      current: true,
      responsibilities: [
        "Deployed, tested, and integrated an intelligent truck monitoring system (SVMS – product) with early warnings for driver drowsiness, phone use while driving, and unsafe following distances",
        "Built a front-end system for Human Resources Management System (System PX1 – product) as SaaS and On-premises versions",
        "Managed and operated cloud servers, overseeing performance, security, and reliability",
        "Conducted R&D to integrate new technologies into ongoing and future projects",
        "Gathered and analyzed client requirements and feedback",
        "Delivered presentations and conducted live demonstrations for customers and partners",
        "Developed a POC AI chatbot using locally-hosted processing in English and Vietnamese",
      ],
      techStack: [
        "React JS",
        "NextJS",
        "Functional programming",
        "Docker",
        "Proxmox",
        "Material UI",
        "DataGrid Pro",
        "Linux",
        "ADAS",
        "MDVRs",
        "AWS",
        "Snyk",
        "Cursor",
        "JetBrains",
        "Figma",
        "GitMind",
        "Git",
        "Lucidchart",
      ],
      achievements: [
        "Strong ability to work both independently and collaboratively",
        "Excellent at motivating, sharing knowledge, and improving team morale",
        "Quick adaptability to new technologies and methodologies",
        "Effective problem-solving and analytical thinking",
        "Proficient in gathering and analyzing client requirements",
      ],
    },
    {
      id: "exp2",
      company: "ZAMI APP - Zalo Mini App F&B",
      position: "Senior Front-End Developer Collaborator",
      period: "Mar 2024 - Present",
      current: true,
      responsibilities: [
        "Developed multi-industry Zalo Mini App focusing on F&B using React and TypeScript",
        "Designed state management architecture using MobX-State-Tree",
        "Built custom native components with Tailwind CSS",
        "Integrated Zalo Mini Program SDK for authentication and multi-payment methods",
        "Built comprehensive Admin Dashboard from scratch",
        "Integrated AI chatbot for dish suggestions and customer assistance",
        "Integrated AI Chatbot and AI Incident Analysis for Smart Garage project",
      ],
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Axios",
        "NextJS",
        "Material UI",
        "DataGrid Pro",
        "MobX-State-Tree",
        "Zustand",
        "Vite",
        "Zalo Mini Program SDK",
        "Framer Motion",
        "Git",
      ],
      features: {
        miniApp: [
          "F&B ordering system with smart cart management",
          "Integrated loyalty and voucher system",
          "Profile and order history management",
          "Interactive mini games for user engagement",
          "Google Maps Places API integration",
        ],
        dashboard: [
          "Product management",
          "Store configuration",
          "Game settings",
          "Loyalty and rewards management",
          "Branch location management",
          "Point redemption system",
          "Content management system",
        ],
      },
      achievements: [
        "Optimized app performance through native custom components",
        "Built modular store architecture for easy scalability",
        "Successfully implemented multi-payment system integrated with Zalo SDK",
      ],
    },
    {
      id: "exp3",
      company: "Personal Project",
      position: "Electronic Scale Data Reader",
      period: "Sep 2024",
      current: false,
      responsibilities: [
        "Developed desktop application using Python and PyQt5",
        "Implemented real-time data display and COM port configuration",
        "Utilized multithreading for non-blocking operations",
        "Created standalone executable and installer using PyInstaller and NSIS",
      ],
      techStack: [
        "Python",
        "PyQt5",
        "PySerial",
        "Socket programming",
        "Threading",
        "HTTP Server",
        "PyInstaller",
        "NSIS",
      ],
      achievements: [
        "Designed for integration with weighing station systems and laundry industry",
        "User-friendly GUI for technical users",
        "Network functionality for LAN accessibility",
        "Production-ready software packages",
      ],
    },
    {
      id: "exp4",
      company: "Venus Corporation",
      position: "Full Stack Developer",
      period: "Feb 2019 - Apr 2020",
      current: false,
      responsibilities: [
        "Edited, upgraded, and developed new functions for ERP system",
        "Managed server and database infrastructure",
        "Provided IT support to other departments",
      ],
      techStack: [
        "PHP",
        "CodeIgniter",
        "MySQL",
        "PHPExcel",
        "Bitbucket",
        "Ubuntu",
        "JetBrains",
        "XAMPP",
        "MySQL WorkBench",
        "Lucidchart",
        "Base",
        "Trello",
      ],
    },
    {
      id: "exp5",
      company: "Nhat Ngon Company",
      position: "System Admin",
      period: "Dec 2018 - Feb 2019",
      current: false,
      responsibilities: [
        "Supported checking and fixing hardware and software errors",
        "Provided consultation and technical support to customers and partners",
      ],
      techStack: [],
    },
    {
      id: "exp6",
      company: "Mat Bao Corporation",
      position: "Technical Support",
      period: "Oct 2017 - Dec 2018",
      current: false,
      responsibilities: [
        "Provided consulting support",
        "Resolved issues related to website errors, hosting, domains, DNS, cloud servers",
        "Installed, upgraded, and migrated servers for customers",
      ],
      techStack: [],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY",
      degree: "Bachelor of Computer Science",
      field: "Information Technology",
      period: "2012 - 2016",
    },
  ],
  skills: {
    technical: [
      "React",
      "NextJS",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Node.js",
      "Python",
      "PHP",
      "Docker",
      "AWS",
      "Git",
      "Linux",
      "Material UI",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Webpack",
    ],
    soft: [
      "Team Leadership",
      "Problem Solving",
      "Communication",
      "Project Management",
      "Client Relations",
      "Adaptability",
      "Knowledge Sharing",
      "Analytical Thinking",
    ],
  },
  awards: [
    {
      id: "award1",
      title: "3rd Place - CNSEC Teams",
      organization: "Student Contest on Information Security",
      year: "2015",
      description: "National Competition in the South region",
    },
    {
      id: "award2",
      title: "Security Award",
      organization: "VNISA",
      year: "2015-2016",
      description: "An award granted by VNISA",
    },
  ],
  certificates: [
    {
      id: "cert1",
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      year: "2022",
    },
    {
      id: "cert2",
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      year: "2022",
    },
    {
      id: "cert3",
      title:
        "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
      issuer: "Microsoft",
      year: "2022",
    },
  ],
};
