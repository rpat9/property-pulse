import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async () => {

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields!");
            return;
        }

        setFormData({
            email: "",
            password: ""
        });
    }

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mt-14">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex gap-4 items-center justify-center mb-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                        Login to Property Pulse
                    </h1>
                </div>

                <div className="max-w-md mx-auto bg-[var(--color-bg)] border border-[var(--color-outline)] rounded-lg shadow-md p-6 text-[var(--color-text-primary)]">
                    <div className="flex flex-col justify-center space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                value={formData.email}
                                required
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
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
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your password"
                            />
                        </div>
                        
                        <button
                            onClick={handleLogin}
                            className="button-primary hover-size items-center"
                        >
                            Login
                        </button>

                        <Link
                            to="/signup"
                            className="text-[var(--color-primary)] hover:underline flex justify-center"
                        >
                            Don't have an account? Signup here
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
}