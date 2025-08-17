import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: string;
}

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<string>("Home");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isAuthenticated = !!localStorage.getItem("token");
    
    useEffect(() => {
        const path = location.pathname;

        if (path === "/" || path === "/home") {
            setActiveTab("Home");
        } else if (path.includes("about")) {
            setActiveTab("About");
        } else if (path.includes("services")) {
            setActiveTab("Services");
        } else {
            setActiveTab("");
        }

    }, [location.pathname]);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    useEffect(()=>{
        const fetchUserProfile = async () => {

            const token = localStorage.getItem("token");
            if(!token) {
                setIsLoading(false);
                return;
            }

            try {

                const response = await fetch("http://localhost:8080/api/user/profile", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok){
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }

            } catch (error) {
                console.error('Error fetching user profile');
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setIsLoading(false);
            }

        }

        fetchUserProfile();
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", newMode.toString());
        document.documentElement.classList.toggle("dark");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
        toast.success("Logged out successfully!");
        navigate("/");
    }

    const getUserGreeting = (isMobile: boolean = false) => {
        if(!user) {
            return null;
        }

        if (isMobile) {
            return `Hi, ${user.firstName}!`
        } else {
            const fullName = `${user.firstName} ${user.lastName}`
            return fullName.length > 20 ? `Welcome, ${user.firstName}!` : `Welcome, ${fullName}!`
        }
    }

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
                        className="text-[var(--color-text-primary)] cursor-pointer"
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
                            
                            {isAuthenticated && user && (
                                <div className="text-[var(--color-text-primary)] font-medium py-2">
                                    {getUserGreeting(true)}
                                </div>
                            )}

                            <Link 
                                to="/" 
                                className={`nav-link-mobile hover-size ${activeTab === "Home" ? selectedButton : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>

                            <Link 
                                to="/about-us" 
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

                            {!isAuthenticated ? (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="rounded-full px-4 py-2 bg-[var(--color-primary)] text-white font-semibold shadow-md hover:opacity-90 hover-size"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>

                                    <Link 
                                        to="/signup" 
                                        className="rounded-full px-4 py-2 bg-[var(--color-primary)] text-white font-semibold shadow-md hover:opacity-90 hover-size"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Signup
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="rounded-full px-4 py-2 bg-red-500 text-white font-semibold shadow-md hover:opacity-90 hover-size flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            )}
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
                        to="/about-us" 
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
                    
                    {!isLoading && (
                        <>
                            {!isAuthenticated ? (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="rounded-full px-2 lg:px-4 py-2 bg-[var(--color-primary)] text-white font-semibold shadow-md hover:opacity-90 hover-size"
                                    >
                                        Login
                                    </Link>

                                    <Link 
                                        to="/signup" 
                                        className="rounded-full px-2 lg:px-4 py-2 bg-[var(--color-primary)] text-white font-semibold shadow-md hover:opacity-90 hover-size"
                                    >
                                        Signup
                                    </Link>
                                </>
                            ) : user ? (
                                <div className="relative">
                                    <motion.button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--btn-bg-color)] text-[var(--color-text-primary)] hover-size"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <User size={20} />
                                        <span className="hidden lg:block text-sm font-medium">
                                            {getUserGreeting()}
                                        </span>
                                        <span className="lg:hidden text-sm font-medium">
                                            Hi, {user.firstName}!
                                        </span>
                                    </motion.button>
                                    
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-navbar)] border border-[var(--color-outline)] rounded-lg shadow-lg py-2 z-50">
                                            <div className="px-4 py-2 text-sm text-[var(--color-text-secondary)] border-b border-[var(--color-outline)]">
                                                {user.email}
                                            </div>
                                            
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    // Add navigation to profile page when you create it
                                                    // navigate("/profile");
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--btn-bg-color)] transition-colors"
                                            >
                                                Profile Settings
                                            </button>
                                            
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[var(--btn-bg-color)] transition-colors flex items-center gap-2"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </>
                    )}

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