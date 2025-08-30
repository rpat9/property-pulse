import Navbar from "./components/Navbar";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import FAQ from "./components/LandingPage/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import UserProfileHome from "./pages/UserProfileHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <AuthProvider>
                <Navbar />

                <main className="pt-8">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/contact-us" element={<Contact />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/services" element={<Services />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/user/profile/home" element={<UserProfileHome />} />
                        </Route>
                    </Routes>
                </main>

            </AuthProvider>
        </Router>
    );
    
}

export default App;