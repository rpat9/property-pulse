# Property Pulse Frontend

A modern React application for real estate investment analysis, built with TypeScript and Vite.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Architecture](#architecture)
- [Styling](#styling)
- [Documentation](#documentation)

## 🎯 Overview

Property Pulse is a real estate investment analysis platform that helps investors evaluate properties, analyze market trends, and make data-driven decisions.

## ✨ Features

- User authentication (signup/login)
- Property search and filtering
- Investment analysis tools
- AI-powered property predictions
- Responsive design for all devices
- Dark/Light mode support

## 💻 Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Routing:** React Router v6
- **State Management:** React Context + Hooks
- **Form Handling:** React Hook Form
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/rpat9/property-pulse.git

# Navigate to client directory
cd property-pulse/client

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
client/
├── public/                 # Static files
├── src/
│   ├── assets/             # Images, icons, and other assets
│   ├── components/         # React components
│   │   ├── helpers/        # Shared UI components
│   │   ├── LandingPage/    # Layout components
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API service modules
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
```

## ⚙️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run tests
npm run test
```

### Code Quality Tools

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 🏗️ Architecture

### Component Organization

- **Feature-based structure**
  - `/components` - Reusable UI components
  - `/pages` - Route-level components
  - `/context` - Global state management
  - `/services` - API integrations
  - `/hooks` - Custom React hooks

### State Management

- AuthContext for user authentication
- React Router for navigation state
- Local component state with useState
- Custom hooks for reusable logic

## 🎨 Styling

### CSS Organization

- Global themes in `themes.css`
- Component styles in `components.css`
- CSS variables for theming:
  ```css
  :root {
    --color-text-primary: #1F2937;
    --color-text-secondary: #6B7280;
    --color-bg: #f1f6fa;
    --color-primary: #2563eb;
    /* and more... */
  }

  .dark {
    --color-text-primary: #F9FAFB;
    --color-text-secondary: #D1D5DB;
    --color-bg: #111827;
    /* and more... */
  }

### TailwindCSS Configuration

Custom theme configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      }
    }
  }
}
```

### CSS Organization

- Global styles in `src/styles/index.css`
- Component-specific styles using Tailwind classes
- CSS variables for theming

## 📚 Documentation

- [Components](src/components/README.md)
- [Pages](src/pages/README.md)
- [State Management](docs/state-management.md)
- [API Integration](docs/api-integration.md)

## 🤝 Contributing

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes

### Commit Guidelines

Follow conventional commits:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
```

### Pull Request Process

1. Create feature/bugfix branch
2. Make changes and test
3. Submit PR against develop
4. Get code review
5. Merge after approval