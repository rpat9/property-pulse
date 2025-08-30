import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
    const { signup, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Form validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all required fields!");
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

        // Submit form
        await signup(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
            formData.phone || undefined
        );
    };

  // Common input style for all form fields
    const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-text-primary)] bg-[var(--color-card)]";

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mt-14">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex gap-4 items-center justify-center mb-4">
                    <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                        Signup for Property Pulse
                    </h1>
                </div>

                <div className="max-w-md mx-auto bg-[var(--color-card)] border border-[var(--color-outline)] rounded-lg shadow-md p-6 text-[var(--color-text-primary)]">
                    <form 
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={inputStyle}
                                style={{ color: 'var(--color-text-primary)' }}
                                placeholder="Enter your first name"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={inputStyle}
                                style={{ color: 'var(--color-text-primary)' }}
                                placeholder="Enter your last name"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputStyle}
                                style={{ color: 'var(--color-text-primary)' }}
                                placeholder="Enter your email"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Phone (optional)
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={inputStyle}
                                style={{ color: 'var(--color-text-primary)' }}
                                placeholder="Enter your phone number"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={inputStyle}
                                style={{ color: 'var(--color-text-primary)' }}
                                placeholder="Enter your password (min. 6 characters)"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={inputStyle}
                                style={{ color: 'var(--color-text-primary)' }}
                                placeholder="Confirm your password"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <button
                        type="submit"
                        disabled={isLoading}
                        className="button-primary hover-size items-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating account...
                                </div>
                            ) : (
                                "Signup"
                            )}
                        </button>

                        <Link
                        to="/login"
                        className="text-[var(--color-primary)] hover:underline flex justify-center"
                        >
                            Already have an account? Login here
                        </Link>

                    </form>
                </div>
            </div>
        </section>
    );
}