import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import FAQ from "./components/LandingPage/FAQ";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const LandingPage = () => {
    return (
      <div>
        <Hero />
        <Features />
        <FAQ />
      </div>
    )
  }

  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />
      
      {/* Main content wrapper with top padding to account for fixed navbar */}
      <main className="pt-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add more routes here as needed */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </main>
    </Router>
  )
}

export default App;