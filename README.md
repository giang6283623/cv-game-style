# 🎮 CV Game Style - Interactive Portfolio

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🎯 Transform your boring CV into an exciting RPG adventure! An interactive, game-style portfolio website built with React and TypeScript.

![Game Preview](https://img.shields.io/badge/Status-In%20Development-yellow)

## ✨ Features

- 🎮 **Interactive Game Elements** - Navigate your CV like an RPG character
- 🏰 **Dungeon-Style Navigation** - Explore different sections as game levels
- ⚔️ **Character Animations** - Idle, running, jumping, slashing animations
- 📊 **Skill Bars** - Display your skills as game stats
- 🎯 **Achievement System** - Showcase accomplishments as game achievements
- 🌟 **Smooth Animations** - Built with Framer Motion for fluid transitions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Pixel Art Style** - Retro gaming aesthetic with modern tech

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/CV-GAME-STYLE.git
   cd CV-GAME-STYLE
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to see the application running.

## 🎮 How to Play/Navigate

### Game Controls

| Key                 | Action            |
| ------------------- | ----------------- |
| `←` / `A`           | Move Left         |
| `→` / `D`           | Move Right        |
| `↑` / `W` / `Space` | Jump              |
| `X`                 | Attack/Interact   |
| `Click`             | Navigate Sections |

### Navigation Map

```
🏠 Home
├── 💼 Experience (Career Dungeon)
├── ⚡ Skills (Skill Tree)
├── 📚 Education (Academy Tower)
├── 🏆 Achievements (Trophy Room)
└── 📧 Contact (Guild Hall)
```

## 🛠️ Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality              |

## 📁 Project Structure

```
CV-GAME-STYLE/
├── public/
│   └── assets/
│       ├── characters/     # Character sprites
│       ├── backgrounds/    # Background images
│       └── icons/         # Game icons
├── src/
│   ├── components/
│   │   ├── game/          # Game-specific components
│   │   │   ├── GameCharacter.tsx
│   │   │   ├── DialogBox.tsx
│   │   │   ├── SkillBar.tsx
│   │   │   └── ...
│   │   ├── GameLayout.tsx
│   │   └── PixelGame.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ExperiencePage.tsx
│   │   ├── SkillsPage.tsx
│   │   └── ...
│   ├── data/
│   │   └── cvData.ts      # Your CV information
│   ├── styles/
│   │   ├── game.css       # Game-specific styles
│   │   └── Portfolio.css  # Portfolio styles
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## 🎨 Customization Guide

### 1. Update Your Personal Information

Edit the `src/data/cvData.ts` file with your information:

```typescript
export const cvData = {
  name: "Your Name",
  title: "Your Title",
  experience: [...],
  skills: [...],
  education: [...],
  // ... more data
};
```

### 2. Customize Character Sprites

Replace the sprite sheets in `public/assets/characters/` with your preferred character:

- Idle animation: `Idle/` folder
- Running animation: `Running/` folder
- Jump animation: `Jump Start/` folder
- Attack animation: `Slashing/` folder

### 3. Modify Theme Colors

Edit the CSS variables in `src/styles/game.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --background-color: #your-color;
  /* ... more variables */
}
```

### 4. Add New Sections

1. Create a new page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/GameLayout.tsx`

## 🔧 Tech Stack

- **Framework:** React 19.1.0
- **Language:** TypeScript 5.8.3
- **Build Tool:** Vite 6.3.5
- **Routing:** React Router DOM 7.7.1
- **Animations:** Framer Motion 12.23.12
- **Icons:** React Icons 5.5.0
- **HTTP Client:** Axios 1.11.0
- **Type Effects:** Typed.js 2.1.0

## 📦 Building for Production

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Preview the build locally**

   ```bash
   npm run preview
   ```

3. **Deploy to your hosting service**

   The build output will be in the `dist/` folder.

### Deployment Options

- **Vercel:** `vercel deploy`
- **Netlify:** Drag and drop `dist/` folder
- **GitHub Pages:** Use GitHub Actions workflow
- **Custom Server:** Serve the `dist/` folder with any static server

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Character sprites and pixel art assets
- React and Vite communities
- Inspiration from retro RPG games

## 📧 Contact

For questions or feedback, please reach out through the contact form in the application or create an issue on GitHub.

---

<p align="center">
  Made with ❤️ and lots of ☕
</p>

<p align="center">
  <a href="#">Back to Top ↑</a>
</p>
