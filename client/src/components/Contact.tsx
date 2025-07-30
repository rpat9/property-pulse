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

    const handleSend = () => {
        toast.success("Message sent!")
    }

    return (
        <section className="mt-12 w-full flex bg-[var(--color-bg)] relative overflow-hidden mb-10">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="mt-2 sm:mt-8 text-[var(--color-text-primary)] space-y-2 fade-in">
                    <h1 className="text-2xl sm:text-4xl font-bold">Let's Connect</h1>

                    <p className="text-sm sm:text-lg">Use the form below to get in touch. Whether you are investor, or simply curious about what property pulse has to offer, we are here to answer your questions.</p>
                </div>

                <div className="mt-4 flex flex-col lg:hidden">

                    <form 
                        onSubmit={handleSend}
                        className="p-4 rounded-lg border-1 border-[var(--color-outline)] mb-6 gap-4 items-center"
                    >

                        {textFormFields.map(({ field, placeholder, type = 'text'}) => (
                            <input
                                key={field}
                                name={field}
                                type={type}
                                placeholder={placeholder}
                                className="input border-1 border-[var(--color-primary)] rounded-lg p-4 mb-2 text-var[(--color-text-primary)]"
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        ))}

                    </form>

                </div>

            </div>
        </section>
    )
}