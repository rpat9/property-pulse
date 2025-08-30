import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { login, isLoading } = useAuth();
  
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(formData.email, formData.password);
    };    

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mt-14">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex gap-4 items-center justify-center mb-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                        Login to Property Pulse
                    </h1>
                </div>

                <div className="max-w-md mx-auto bg-[var(--color-card)] border border-[var(--color-outline)] rounded-lg shadow-md p-6 text-[var(--color-text-primary)]">
                
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                required
                                disabled={isLoading}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-text-primary)] bg-[var(--color-card)]"
                                style={{ color: 'var(--color-text-primary)' }}
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
                                name="password"
                                required
                                value={formData.password}
                                disabled={isLoading}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-text-primary)] bg-[var(--color-card)]"
                                style={{ color: 'var(--color-text-primary)' }}
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