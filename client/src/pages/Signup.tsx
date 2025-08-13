import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: ""
                }),
            });
        
            const data = await response.json();
            
            if (response.ok) {
                toast.success(data.message || "Signup successful!");
                localStorage.setItem("token", data.token);
                navigate('/');
            } else {
                toast.error(data.message || "Signup failed");
            }

        } catch (error) {
            console.error('Error during signup:', error);
            toast.error("Signup failed. Please try again later.");
        }
        
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    return (

        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mt-14">

            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex gap-4 items-center justify-center mb-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                        Signup for Property Pulse
                    </h1>
                </div>

                <div className="max-w-md mx-auto bg-[var(--color-bg)] border border-[var(--color-outline)] rounded-lg shadow-md p-6 text-[var(--color-text-primary)]">

                    <div className="flex flex-col justify-center space-y-4">

                        <form 
                            onSubmit={handleSignup}
                            className="flex flex-col gap-4"
                        >

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
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
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="button-primary hover-size items-center"
                            >
                                Signup
                            </button>

                        </form>

                        <Link
                            to="/login"
                            className="text-[var(--color-primary)] hover:underline flex justify-center"
                        >
                            Already have an account? Login here
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
}