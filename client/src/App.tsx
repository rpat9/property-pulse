import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import FAQ from "./components/LandingPage/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect } from "react";

function App() {

    useEffect(() =>{

        const checkHealth = async () => {
            try {
                const res = await fetch("http://localhost:8080/health");
                const data = await res.json();
                console.log(`${data.health}`);
            } catch (err) {
                console.error("Failed to connect to backend:", err);
            }
        };

        checkHealth();
    }, []);

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
                    <Route path="/about-us" element={<About />} />
                </Routes>
            </main>

        </Router>
    )
}

export default App;