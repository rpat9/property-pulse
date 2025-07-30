import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import FAQ from "./components/LandingPage/FAQ";
import Contact from "./components/Contact";
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
      
      <Navbar />
      
      <main className="pt-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </main>

    </Router>
  )
}

export default App;