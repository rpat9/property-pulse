import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Optionally verify token is still valid here
            navigate('/');
        }
    }, [navigate]);

    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch("http://localhost:8080/api/user/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('User logged in:', userData);
                return userData;
            } else {
                console.warn('Could not fetch user profile');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
    
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields!");
            return;
        }
    
        setIsLoading(true);
    
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password
                }),
            });
    
            const data = await response.json();
    
            if (response.ok && data.token) {
                // Success!
                localStorage.setItem("token", data.token);
                await fetchUserProfile(data.token);
                toast.success(data.message || "Welcome back!");
                
                setTimeout(() => {
                    navigate('/');
                }, 1000);
    
            } else {
                // Handle different error status codes
                let errorMessage = data.message || "Login failed";
                
                switch (response.status) {
                    case 400:
                        // Validation errors
                        toast.error(errorMessage);
                        break;
                    case 401:
                        // Invalid credentials or disabled account
                        toast.error(errorMessage);
                        break;
                    case 500:
                        // Server error
                        toast.error("Server error. Please try again later.");
                        break;
                    default:
                        toast.error("Something went wrong. Please try again.");
                }
                
                console.error("Login error:", {
                    status: response.status,
                    message: errorMessage,
                    data
                });
            }
    
        } catch (error) {
            console.error("Network error during login:", error);
            toast.error("Cannot connect to server. Please check your internet connection.");
        } finally {
            setIsLoading(false);
        }
    
        // Clear password for security
        setFormData(prev => ({
            ...prev,
            password: ""
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mt-14">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex gap-4 items-center justify-center mb-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                        Login to Property Pulse
                    </h1>
                </div>

                <div className="max-w-md mx-auto bg-[var(--color-bg)] border border-[var(--color-outline)] rounded-lg shadow-md p-6 text-[var(--color-text-primary)]">
                    
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                required
                                disabled={isLoading}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter your email"
                                autoComplete="email"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                disabled={isLoading}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="button-primary hover-size items-center disabled:opacity-50 disabled:cursor-not-allowed relative"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Logging in...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>

                        <Link
                            to="/signup"
                            className="text-[var(--color-primary)] hover:underline flex justify-center"
                        >
                            Don't have an account? Signup here
                        </Link>

                    </form>
                </div>

            </div>
        </section>
    );
}