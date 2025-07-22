import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>("Home");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("about")) setActiveTab("About");
        else if (path.includes("services")) setActiveTab("Services");
        else setActiveTab("Home");
    }, [location.pathname]);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", newMode.toString());
        document.documentElement.classList.toggle("dark");
    };

    const selectedButton = "rounded-2xl bg-[var(--btn-bg-color)] transition ease";

    return (
        <nav className="fixed z-50 p-2 lg:p-4 w-full bg-[var(--color-bg-navbar)]">
            <div className="flex justify-between items-center w-full mx-auto">
                
                <Link to="/" className="text-xl lg:text-3xl hover-size font-bold text-[var(--color-text-primary)]">
                    Property Pulse
                </Link>

                <div className="sm:hidden flex items-center gap-3">
                    <motion.button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="text-[var(--color-text-primary)]"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{delay: 0.4}}
                    >
                        <motion.div
                            animate={{ rotate: isMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </motion.div>
                        
                    </motion.button>

                    <motion.button 
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-[var(--btn-bg-color)] cursor-pointer text-[var(--color-text-primary)] hover-size"
                        title="Toggle theme"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{delay: 0.3}}
                    >
                        <motion.div
                            animate={{ rotate: isDarkMode ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isDarkMode ? <Sun /> : <Moon />}
                        </motion.div>

                    </motion.button>

                </div>

                {isMenuOpen && (
                    <div className="sm:hidden absolute top-[70px] left-0 w-full bg-[var(--color-bg-navbar)] opacity-90 shadow-md px-4 pb-4 z-40">

                        <div className="flex flex-col items-center gap-3">

                            <Link 
                                to="/" 
                                className={`nav-link-mobile hover-size ${activeTab === "Home" ? selectedButton : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <Link 
                                to="/about" 
                                className={`nav-link-mobile hover-size ${activeTab === "About" ? selectedButton : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>

                            <Link 
                                to="/services" 
                                className={`nav-link-mobile hover-size ${activeTab === "Services" ? selectedButton : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Services
                            </Link>

                            <Link 
                                to="/contact" 
                                className="rounded-full px-4 py-2 bg-[var(--color-primary)] text-white font-semibold shadow-md hover:opacity-90 hover-size"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact Us
                            </Link>

                        </div>
                    </div>
                )}

                <div className="hidden sm:flex gap-2 lg:gap-10 items-center">

                    <Link 
                        to="/" 
                        className={`nav-link hover-size ${activeTab === "Home" ? selectedButton : ""}`}
                    >
                        Home
                    </Link>

                    <Link 
                        to="/about" 
                        className={`nav-link hover-size ${activeTab === "About" ? selectedButton : ""}`}
                    >
                        About
                    </Link>

                    <Link 
                        to="/services" 
                        className={`nav-link hover-size ${activeTab === "Services" ? selectedButton : ""}`}
                    >
                        Services
                    </Link>

                </div>

                <div className="hidden sm:flex gap-4 items-center">

                    <Link to="/contact" className="rounded-full px-2 lg:px-4 py-2 bg-[var(--color-primary)] text-white font-semibold shadow-md hover:opacity-90 hover-size">
                        Contact Us
                    </Link>

                    <motion.button 
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-[var(--btn-bg-color)] cursor-pointer text-[var(--color-text-primary)] hover-size"
                        title="Toggle theme"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{delay: 0.3}}
                    >
                        <motion.div
                            animate={{ rotate: isDarkMode ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isDarkMode ? <Sun /> : <Moon />}
                        </motion.div>
                    </motion.button>

                </div>

            </div>
            
        </nav>
    );
}