import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
// import Metrics from "./components/LandingPage/Metrics";
// import Featured from "./components/LandingPage/Featured";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const LandingPage = () => {
    return (
      <div>
        <Hero />
        {/* <Metrics /> */}
        {/* <Featured /> */}
      </div>
    )
  }

  return (
    <Router>
      {/* Navbar will appear on all pages */}
      <Navbar />
      
      {/* Main content wrapper with top padding to account for fixed navbar */}
      <main className="pt-20">
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