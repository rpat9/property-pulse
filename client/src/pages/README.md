# Pages

=====================

## Table of Contents

- [Overview](#overview)
- [Pages](#pages)
  - [About](#about)
  - [Contact](#contact)
  - [Login](#login)
  - [Signup](#signup)
  - [Services](#services)

## Overview

This directory contains the page-level components for the client-side application. Each page is a self-contained component that renders a specific section of the application.

## Pages

### About

The About page component renders the "About Us" section of the application. It displays information about the company, its mission, and its values.

### Contact

The Contact page component renders the "Contact Us" section of the application. It displays a contact form that allows users to send messages to the company.

### Login

The Login page component renders the login form for the application. It allows users to enter their credentials and log in to their account.

### Signup

The Signup page component renders the signup form for the application. It allows users to create a new account by entering their information and password.

### Services

The Services page component displays our comprehensive suite of real estate analysis tools and features. It includes:

- **Price Estimates**: AI-driven property valuation using comprehensive market data
- **Neighborhood Analysis**: Location intelligence with geographical insights
- **Investment Risk Metrics**: AI-powered investment analysis and scoring
- **Data-Driven Comparisons**: Advanced property comparison tools

Each service section features:
- Detailed breakdowns of capabilities
- Real-time data analysis features
- Interactive navigation with smooth scrolling
- Responsive design for all devices

## Usage

To use these pages in your application, simply import them into your JavaScript file and render them as needed. For example:

```jsx
import { About, Contact, Login, Signup, Services } from "./pages";

function App() {
  return (
    <div>
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/services" component={Services} />
    </div>
  );
}
```

Note: This is just a sample usage example and may not reflect the actual usage in your application.


### Services Page Navigation

The Services page supports URL hash navigation for direct access to specific sections:

```javascript
// Example URLs for direct section access
/services#price-estimates
/services#neighborhood-analysis
/services#investment-metrics
/services#property-comparison
```