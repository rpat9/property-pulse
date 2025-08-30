# Pages & Hooks

## Table of Contents

- [Pages Overview](#pages-overview)
- [Pages](#pages)
  - [About](#about)
  - [Contact](#contact)
  - [Login](#login)
  - [Signup](#signup)
  - [Services](#services)
  - [UserProfileHome](#userprofilehome)
- [Hooks](#hooks)
  - [useAuth](#useauth)

## Pages Overview

This directory contains the page-level components for the Property Pulse application. Each page is a self-contained component that renders a specific section of the application, with responsive design for all device sizes.

## Pages

### About

The About page presents the company vision and mission with:
- Core principles with animated icons
- Technology stack explanation
- Company mission and vision statements
- Future development roadmap
- Responsive layout with visual hierarchy

### Contact

The Contact page provides a comprehensive contact form with:
- Responsive design with optimized mobile and desktop layouts
- Form validation for required fields
- Success notifications via React Hot Toast
- Multiple form fields including dropdown selectors
- Clean form state management

### Login

The Login page handles user authentication with:
- Email and password validation
- Integration with AuthContext for login processing
- Loading state management during authentication
- Error handling with toast notifications
- Redirect to previous page after successful login
- Link to signup for new users

### Signup

The Signup page facilitates new user registration with:
- Complete user information collection
- Password confirmation and validation
- Form state management
- Integration with AuthContext for registration processing
- Responsive form layout
- Success/error feedback via toast notifications

### Services

The Services page showcases our comprehensive suite of real estate analysis tools with:
- Tab-based navigation for service categories
- Smooth scroll functionality for section navigation
- Detailed feature breakdowns with icons
- Animation effects using Framer Motion
- URL hash navigation for direct section access

Each service section features:
- Detailed capabilities breakdowns
- Animated list items
- Responsive grid layouts
- Visual hierarchy with icons

### UserProfileHome

The UserProfileHome page is a protected route that displays the user's dashboard:
- Only accessible to authenticated users
- Personal user information display
- Account management options
- Will contain future property tracking features

## Hooks

### useAuth

The useAuth custom hook provides access to authentication functionality throughout the application:

```jsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, signup, logout, isLoading } = useAuth();
  
  // Use auth functions and state in your component
}
```

Key features:
- User authentication state management
- Login and signup functionality
- User profile data access
- Loading state for authentication processes
- Protected route integration

## Usage

Pages are integrated with React Router for navigation:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import UserProfileHome from "./pages/UserProfileHome";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/user/profile/home" element={<UserProfileHome />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

### Services Page Navigation

The Services page supports URL hash navigation for direct access to specific sections:

```javascript
// Example URLs for direct section access
/services#price-estimates
/services#neighborhood-analysis
/services#investment-metrics
/services#property-comparison
```

Last updated: 2025-08-30