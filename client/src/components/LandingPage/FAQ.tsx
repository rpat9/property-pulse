import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function FAQ() {
    const [currentlyVisible, setCurrentlyVisible] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    const questions = [
        {
            question: "How does your AI evaluate property value?",
            answer: "Our AI analyzes market trends, comparable properties, neighborhood data, and historical sales to estimate a property's fair market value with predictive confidence scores.",
        },
        {
            question: "Where do you get your real estate data?",
            answer: "We use publicly available data from trusted sources, including real estate APIs, open municipal records, and housing market datasets to ensure broad and accurate coverage.",
        },
        {
            question: "Is this a listing site or an investment analysis tool?",
            answer: "Our platform is focused on AI-powered analysis, not sales. Think of us as a smart assistant that helps buyers, investors, or brokers make better data-driven decisions.",
        },
        {
            question: "Do you store personal or financial data?",
            answer: "No. We do not collect or store any personal or financial information unless explicitly provided. All property evaluations are anonymous and based on public data.",
        },
        {
            question: "How accurate are your price predictions?",
            answer: "Our models achieve strong performance on historical data, but real estate markets are dynamic. We provide confidence intervals and risk factors to help you interpret the results.",
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setCurrentlyVisible(3);
            } else if (window.innerWidth >= 768) {
                setCurrentlyVisible(2);
            } else {
                setCurrentlyVisible(1);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = questions.length - currentlyVisible;

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const visibleQuestions = questions.slice(currentIndex, currentIndex + currentlyVisible);

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mb-10">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex flex-col space-y-2 m-2">
                    <h1 className="text-xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-sm sm:text-lg text-[var(--color-text-primary)]">
                        Find answers to common questions about Property Pulse. We are here to provide clarity and assist you every step of the way.
                    </p>
                </div>

                <div className="mt-4 flex flex-col sm:hidden">
                    <div className="flex flex-col gap-4 justify-center pb-10">

                        {questions.map((faq, index) => {
                            return (
                                <div key={index} className="metric-cards flex flex-col h-full">

                                    <div className="flex flex-col items-center justify-center flex-grow text-center mb-4">

                                        <div className="font-bold text-xl text-[var(--color-text-primary)]">
                                            {faq.question}
                                        </div>

                                        <p className="mt-2 text-sm text-[var(--color-text-primary)]">{faq.answer}</p>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-4 mt-6">
                
                    <button
                        onClick={goToPrevious}
                        className="button-primary disabled:opacity-30 disabled:cursor-not-allowed hover-size"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex items-stretch gap-6 overflow-hidden flex-1">
                        {visibleQuestions.map((faq, index) => (
                            <div
                                key={currentIndex + index}
                                className="flex flex-col justify-between flex-1 bg-[var(--color-card)] text-[var(--color-text-primary)] border-[var(--color-outline)] border-1 p-6 rounded-xl transition-all duration-300 min-h-[200px] sm:min-h-[180px]"
                            >
                                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 line-clamp-3">
                                    {faq.question}
                                </h2>
                                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-4 sm:line-clamp-3">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        className="button-primary disabled:opacity-30 disabled:cursor-not-allowed hover-size"
                        disabled={currentIndex >= maxIndex}
                    >
                        <ChevronRight size={24} />
                    </button>

                </div>
            </div>
        </section>
    );
}