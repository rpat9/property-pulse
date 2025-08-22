import { useState, useEffect } from "react";
import { TrendingUpDown, House, ChartCandlestick, NotebookPen, ArrowRight, LineChart, Building2, Banknote, Search, BarChart, Target, PieChart, ListFilter } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Services() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<string>(
        location.hash ? location.hash.slice(1) : ''
    );

    useEffect(() => {
        const hash = location.hash.slice(1);
        setActiveSection(hash || 'price-estimates');
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const services = [
        {
            id: "price-estimates",
            icon: <TrendingUpDown className="text-[var(--color-primary)]" size="30"/>,
            title: "Accurate Price Estimates",
            description: "AI-driven property valuation utilizing comprehensive market data and property attributes",
            features: [
                {
                    icon: <LineChart size="24" className="text-[var(--color-primary)]" />,
                    title: "Property Valuation",
                    points: [
                        "Precise property valuation using 7 key property attributes (bedrooms, bathrooms, sqft, year built, etc.)",
                        "Real-time market adjustments based on days on market and listing status",
                        "Property type-specific analysis (single family, condo, townhouse, etc.)",
                        "Location-based valuation incorporating latitude and longitude data",
                        "Historical price trend analysis with property timeline tracking"
                    ]
                },
                {
                    icon: <Building2 size="24" className="text-[var(--color-primary)]" />,
                    title: "Feature Analysis",
                    points: [
                        "Detailed evaluation of property features and amenities",
                        "Image-based property condition assessment",
                        "Property description semantic analysis",
                        "Automated property type classification",
                        "Custom feature importance scoring"
                    ]
                }
            ]
        },
        {
            id: "neighborhood-analysis",
            icon: <House className="text-[var(--color-primary)]" size="30" />,
            title: "Neighborhood Analysis",
            description: "Detailed location intelligence using precise geographical data",
            features: [
                {
                    icon: <Search size="24" className="text-[var(--color-primary)]" />,
                    title: "Location Analytics",
                    points: [
                        "Precise geocoding with latitude and longitude analysis",
                        "Zip code market trends and demographics",
                        "City and state-level market analysis",
                        "Street-level property clustering",
                        "Geographic price distribution mapping"
                    ]
                },
                {
                    icon: <Banknote size="24" className="text-[var(--color-primary)]" />,
                    title: "Market Insights",
                    points: [
                        "Property tax analysis by location",
                        "Rental market potential by area",
                        "Local market dynamics and trends",
                        "Property density and competition analysis",
                        "Market saturation assessment"
                    ]
                }
            ]
        },
        {
            id: "investment-metrics",
            icon: <ChartCandlestick className="text-[var(--color-primary)]" size="30" />,
            title: "Investment Risk Metrics",
            description: "Comprehensive investment analysis powered by our AI prediction engine",
            features: [
                {
                    icon: <BarChart size="24" className="text-[var(--color-primary)]" />,
                    title: "AI Predictions",
                    points: [
                        "Investment scoring (0-100) with multiple factors",
                        "Cash flow potential assessment",
                        "Property appreciation forecasting",
                        "Risk level evaluation and scoring",
                        "Confidence-level indicators for predictions"
                    ]
                },
                {
                    icon: <Target size="24" className="text-[var(--color-primary)]" />,
                    title: "Financial Analysis",
                    points: [
                        "Predicted rental income calculations",
                        "Capitalization rate forecasting",
                        "Cash flow modeling and analysis",
                        "ROI projections with confidence intervals",
                        "Investment grade scoring"
                    ]
                }
            ]
        },
        {
            id: "property-comparison",
            icon: <NotebookPen className="text-[var(--color-primary)]" size="30" />,
            title: "Data-Driven Comparisons",
            description: "Advanced property comparison tools leveraging our comprehensive database",
            features: [
                {
                    icon: <PieChart size="24" className="text-[var(--color-primary)]" />,
                    title: "Comparison Metrics",
                    points: [
                        "Property type-based comparison",
                        "Square footage and room count analysis",
                        "Year built and condition comparison",
                        "Price per square foot benchmarking",
                        "Feature set differential analysis"
                    ]
                },
                {
                    icon: <ListFilter size="24" className="text-[var(--color-primary)]" />,
                    title: "Market Position",
                    points: [
                        "Days on market comparison",
                        "Listing status tracking",
                        "Published vs unpublished property analysis",
                        "Historical price changes",
                        "Market activity scoring"
                    ]
                }
            ]
        }
    ];

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mt-14">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
                        Our Services
                    </h1>
                    <p className="text-lg text-[var(--color-text-primary)] max-w-3xl mx-auto mb-8">
                        Leverage our AI-powered tools to make smarter real estate decisions
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {services.map(service => (
                            <button
                                key={service.id}
                                onClick={() => scrollToSection(service.id)}
                                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${activeSection === service.id 
                                    ? 'bg-[var(--color-primary)] text-white' 
                                    : 'bg-[var(--color-card)] text-[var(--color-text-primary)]'
                                }`}
                            >
                                {service.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detailed Service Sections */}
                {services.map(service => (
                    <motion.div
                        key={service.id}
                        id={service.id}
                        className="mb-16 scroll-mt-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="metric-cards p-8">
                            <div className="flex items-center gap-4 mb-6">
                                {service.icon}
                                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                                    {service.title}
                                </h2>
                            </div>
                            
                            <p className="text-lg text-[var(--color-text-primary)] mb-8">
                                {service.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            {feature.icon}
                                            <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {feature.points.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="flex items-start gap-3 text-[var(--color-text-primary)]"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <ArrowRight size={18} className="mt-1 flex-shrink-0 text-[var(--color-primary)]" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}