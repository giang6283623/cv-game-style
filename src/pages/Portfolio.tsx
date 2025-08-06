import React, { useState } from 'react';
import PixelGame from '../components/PixelGame';
import '../styles/Portfolio.css';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [gameScore, setGameScore] = useState(0);

  const skills = {
    frontend: [
      { name: 'React.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript ES6+', level: 90 },
      { name: 'Vue.js', level: 75 },
      { name: 'Next.js', level: 80 },
    ],
    backend: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'REST APIs', level: 85 },
      { name: 'GraphQL', level: 70 },
    ],
    tools: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'Webpack', level: 75 },
      { name: 'Vite', level: 85 },
      { name: 'Jest/Testing', level: 75 },
      { name: 'CI/CD', level: 70 },
    ],
  };

  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Innovation Corp',
      period: '2022 - Present',
      description: 'Led frontend development for enterprise applications using React and TypeScript',
      achievements: [
        'Improved application performance by 40%',
        'Mentored junior developers',
        'Implemented micro-frontend architecture',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and interactive user interfaces',
      achievements: [
        'Built 15+ responsive web applications',
        'Reduced bundle size by 30%',
        'Introduced automated testing',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2018 - 2020',
      description: 'Full-stack development using MERN stack',
      achievements: [
        'Developed RESTful APIs',
        'Created reusable component library',
        'Participated in agile development',
      ],
    },
  ];

  const projects = [
    {
      name: 'E-Commerce Platform',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      description: 'Full-featured e-commerce platform with payment integration',
      link: '#',
    },
    {
      name: 'Real-time Chat App',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      description: 'Real-time messaging application with video calling',
      link: '#',
    },
    {
      name: 'Task Management System',
      tech: ['Vue.js', 'TypeScript', 'GraphQL', 'Apollo'],
      description: 'Collaborative task management with real-time updates',
      link: '#',
    },
    {
      name: 'Data Visualization Dashboard',
      tech: ['React', 'D3.js', 'Python', 'FastAPI'],
      description: 'Interactive dashboard for data analysis and visualization',
      link: '#',
    },
  ];

  return (
    <div className="portfolio-container">
      {/* Hero Section with Pixel Game */}
      <section className="hero-game-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="glitch-text" data-text="Bui Van Giang">
              Bui Van Giang
            </h1>
            <p className="hero-subtitle pixel-text">
              Frontend Developer & R&D Engineer
            </p>
            <p className="hero-description">
              Passionate about creating interactive web experiences and innovative solutions
            </p>
            <div className="hero-buttons">
              <button className="pixel-button primary">Download CV</button>
              <button className="pixel-button secondary">Contact Me</button>
            </div>
          </div>
          <div className="game-container">
            <PixelGame onScoreUpdate={setGameScore} />
            <div className="game-score">Score: {gameScore}</div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="portfolio-nav">
        <button
          className={`nav-tab ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => setActiveSection('about')}
        >
          About
        </button>
        <button
          className={`nav-tab ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveSection('skills')}
        >
          Skills
        </button>
        <button
          className={`nav-tab ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveSection('experience')}
        >
          Experience
        </button>
        <button
          className={`nav-tab ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveSection('projects')}
        >
          Projects
        </button>
      </nav>

      {/* Content Sections */}
      <div className="portfolio-content">
        {activeSection === 'about' && (
          <section className="about-section fade-in">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-card">
                <div className="about-icon">🎮</div>
                <h3>Game Development Enthusiast</h3>
                <p>
                  Combining web technologies with game development to create engaging user experiences
                </p>
              </div>
              <div className="about-card">
                <div className="about-icon">💻</div>
                <h3>Full-Stack Developer</h3>
                <p>
                  Experienced in both frontend and backend technologies with a focus on React ecosystem
                </p>
              </div>
              <div className="about-card">
                <div className="about-icon">🚀</div>
                <h3>Innovation Driven</h3>
                <p>
                  Always exploring new technologies and methodologies to improve development processes
                </p>
              </div>
              <div className="about-card">
                <div className="about-icon">🎨</div>
                <h3>UI/UX Focused</h3>
                <p>
                  Creating intuitive and visually appealing interfaces with attention to detail
                </p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="skills-section fade-in">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Frontend Development</h3>
                {skills.frontend.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="skill-category">
                <h3>Backend Development</h3>
                {skills.backend.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="skill-category">
                <h3>Tools & Technologies</h3>
                {skills.tools.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'experience' && (
          <section className="experience-section fade-in">
            <h2 className="section-title">Work Experience</h2>
            <div className="timeline">
              {experience.map((job, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{job.title}</h3>
                    <div className="timeline-meta">
                      <span className="company">{job.company}</span>
                      <span className="period">{job.period}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                    <ul className="achievements">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="projects-section fade-in">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="project-link">
                    View Project →
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p>I'm always interested in hearing about new opportunities and challenges.</p>
          <div className="contact-info">
            <a href="mailto:giangbv@example.com" className="contact-item">
              <span className="contact-icon">📧</span>
              giangbv@example.com
            </a>
            <a href="https://github.com/giangbv" className="contact-item">
              <span className="contact-icon">🔗</span>
              GitHub
            </a>
            <a href="https://linkedin.com/in/giangbv" className="contact-item">
              <span className="contact-icon">💼</span>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
