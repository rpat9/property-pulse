# Client Components README

## Table of Contents

- [Overview](#overview)
- [Core Components](#core-components)
  - [Navbar](#navbar)
  - [ProtectedRoute](#protectedroute)
- [Landing Page Components](#landing-page-components)
  - [Hero](#hero)
  - [Features](#features)
  - [FAQ](#faq)
- [Helper Components](#helper-components)
  - [AnimatedChart](#animatedchart)
  - [TypeWriter](#typewriter)
- [Page Components](#page-components)
- [Context Providers](#context-providers)

## Overview

This directory contains the UI components for the Property Pulse application. Each component is designed to be reusable and modular, making it easy to maintain and update the application.

## Core Components

### Navbar

The Navbar component serves as the main navigation interface across all pages. It provides:
- Responsive design with mobile menu toggle
- Dark/light theme toggle functionality
- Dynamic links based on authentication state
- User profile menu with logout functionality
- Active tab highlighting

```jsx
<Navbar />
```

### ProtectedRoute

A wrapper component that protects routes requiring authentication:
- Redirects unauthenticated users to login
- Shows loading state during auth checks
- Preserves attempted URL for post-login redirect

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/user/profile/home" element={<UserProfileHome />} />
</Route>
```

## Landing Page Components

### Hero

The Hero component is the top section of the landing page featuring:
- Typewriter animation for the main title
- Responsive layout for all device sizes
- Animated data visualization chart
- Call-to-action buttons
- Key metrics display

```jsx
<Hero />
```

### Features

The Features component showcases the application's key capabilities:
- Interactive feature cards with icons
- Direct navigation to detailed service pages
- Responsive grid layout for different screen sizes

```jsx
<Features />
```

### FAQ

The FAQ component presents common questions in an interactive format:
- Carousel for desktop view
- Expandable list for mobile view
- Auto-responsive based on screen width

```jsx
<FAQ />
```

## Helper Components

### AnimatedChart

A reusable SVG-based chart component that creates an animated data visualization:
- Building-style visualization with animation
- Customizable sizing and colors
- Purely CSS/SVG based animation (no charting library dependency)

```jsx
<AnimatedChart />
```

### TypeWriter

Creates a typewriter text animation effect:
- Letter-by-letter animation using Framer Motion
- Customizable text and timing
- Enhances visual interest on the landing page

```jsx
<Typewriter text="Property Pulse" />
```

## Page Components

The application includes several full-page components:
- **About** - Company information and mission
- **Contact** - User contact form
- **Login** - Authentication form
- **Signup** - User registration
- **Services** - Detailed service information
- **UserProfileHome** - Protected user dashboard

## Context Providers

### AuthContext

Manages authentication state across the application:
- User login/signup functionality
- Profile data management
- Authentication state persistence
- Protected route control

```jsx
<AuthProvider>
  {children}
</AuthProvider>
```

## Usage

Components are structured for easy import and composition:

```jsx
import Navbar from "./components/Navbar";
import Hero from "./components/LandingPage/Hero";
import { useAuth } from "./hooks/useAuth";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Additional components */}
    </>
  );
}
```
```