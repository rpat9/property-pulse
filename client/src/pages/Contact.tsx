import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Contact() {

    type FormField = {
        field: keyof typeof formData;
        placeholder: string;
        type?: string;
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        inquiryType: "",
        leadSource: "",
        message: "",
    });

    const textFormFields: FormField[] = [
        { field: 'firstName', placeholder: 'Enter First Name'},
        { field: 'lastName', placeholder: 'Enter Last Name'},
        { field: 'email', placeholder: 'Enter Email', type: 'email'},
        { field: 'phoneNumber', placeholder: 'Enter Phone Number', type: 'tel'}
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.success("Message sent!");

        setFormData({
            firstName: "", lastName: "", email: "", phoneNumber: "",
            inquiryType: "", leadSource: "", message: ""
        });
    }

    return (
        <section className="mt-12 w-full flex bg-[var(--color-bg)] relative overflow-hidden mb-10 fade-in">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="mt-2 sm:mt-8 text-[var(--color-text-primary)] space-y-2">
                    <h1 className="text-2xl sm:text-4xl font-bold">Let's Connect</h1>

                    <p className="text-sm sm:text-lg">Use the form below to get in touch. Whether you are investor, or simply curious about what property pulse has to offer, we are here to answer your questions.</p>
                </div>

                <div className="mt-4 lg:hidden">

                    <form 
                        onSubmit={handleSend}
                        className="flex flex-col p-2 rounded-lg border-1 border-[var(--color-outline)] mb-6 gap-2 items-center"
                    >

                        {textFormFields.map(({ field, placeholder, type = 'text'}) => (
                            <input
                                key={field}
                                name={field}
                                type={type}
                                placeholder={placeholder}
                                className="input border-1 border-[var(--color-primary)] rounded-lg p-4 mb-2 text-[var(--color-text-primary)] w-full "
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        ))}

                        <textarea
                            placeholder="Enter your message here"
                            className="input border-1 border-[var(--color-primary)] rounded-lg p-4 mb-2 text-[var(--color-text-primary)] w-full "
                            rows={5}
                        >

                        </textarea>

                        <button
                            type="submit"
                            className="button-primary"
                        >
                            Connect
                        </button>

                    </form>

                </div>

                <div className="hidden lg:block mt-4">
                    <form 
                        onSubmit={handleSend}
                        className="flex flex-col p-6 rounded-lg border-1 border-[var(--color-outline)] mb-6 gap-4"
                    >
                        
                        <div className="grid grid-cols-3 gap-4">

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    First Name
                                </label>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter First Name"
                                    className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    Last Name
                                </label>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your Email"
                                    className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-3 gap-4">

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    Phone
                                </label>
                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Enter Phone Number"
                                    className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    Inquiry Type
                                </label>
                                <select
                                    name="inquiryType"
                                    className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full cursor-pointer"
                                    value={formData.inquiryType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Inquiry Type</option>
                                    <option value="investment">Investment</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Support</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    How Did You Hear About Us?
                                </label>
                                <select
                                    name="leadSource"
                                    className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full cursor-pointer"
                                    value={formData.leadSource}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="google">Google</option>
                                    <option value="social">Social Media</option>
                                    <option value="referral">Referral</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                placeholder="Enter your Message here"
                                rows={4}
                                className="input border-1 border-[var(--color-primary)] rounded-lg p-4 text-[var(--color-text-primary)] w-full resize-none"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        
                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="button-primary hover-size"
                            >
                                Connect
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </section>
    )
}