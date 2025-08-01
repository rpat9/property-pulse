import { Brain, Target, Users, Zap, TrendingUp, Shield, Code, Database } from "lucide-react";

export default function About() {
    const principles = [
        {
            icon: <Brain className="text-[var(--color-primary)]" size="32" />,
            title: "AI-First Approach",
            desc: "Every insight powered by advanced machine learning, not outdated rule-based systems."
        },
        {
            icon: <Shield className="text-[var(--color-primary)]" size="32" />,
            title: "Transparency Over Profits",
            desc: "No hidden agendas or commission bias — just honest, data-driven analysis."
        },
        {
            icon: <TrendingUp className="text-[var(--color-primary)]" size="32" />,
            title: "Future-Focused Insights",
            desc: "Predictive analytics that help you understand where markets are heading."
        },
        {
            icon: <Users className="text-[var(--color-primary)]" size="32" />,
            title: "Leveling the Playing Field",
            desc: "Making institutional-grade analysis accessible to everyone, not just the wealthy."
        }
    ];

    const techStack = [
        {
            icon: <Code className="text-[var(--color-primary)]" size="24" />,
            title: "Advanced ML Models",
            detail: "Ensemble methods, neural networks, and time-series forecasting"
        },
        {
            icon: <Database className="text-[var(--color-primary)]" size="24" />,
            title: "Real-Time Data Pipeline",
            detail: "Processing millions of data points from 15+ sources daily"
        },
        {
            icon: <Zap className="text-[var(--color-primary)]" size="24" />,
            title: "Lightning-Fast Analysis",
            detail: "Sub-second property evaluations with confidence scoring"
        }
    ];

    return (
        <section className="mt-5 px-4 sm:px-8 md:px-16 py-12 max-w-7xl mx-auto">
        
            <div className="text-center mb-16 text-[var(--color-text-primary)] fade-in">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Redefining Real Estate with <span className="text-[var(--color-primary)]">Intelligence</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto">
                    Property Pulse was built to guide your real estate journey with data and transparency, not guesswork. Property Pulse empowers you with intelligent insigiths every step of the way.
                </p>
            </div>

            
            <div className="mb-16 text-[var(--color-text-primary)] fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    What problem does Property Pulse Solve?
                </h2>
                <div className="max-w-4xl mx-auto space-y-4 text-base leading-relaxed text-center">
                    <p>
                        Real estate has always been an information game. The players with the best data, insights, and analytics consistently outperform those relying on gut instinct or outdated comparable sales. Yet for decades, this advantage was reserved for institutional investors and large brokerages.
                    </p>
                    <p>
                        <strong>Here is a simple question</strong>: What if everyone had access to the same caliber of data-driven insights? What if a first-time homebuyer could evaluate properties with 
                        the same analytical rigor as a hedge fund?
                    </p>
                    <p>
                        Property Pulse was built to answer that question — combining cutting-edge AI, comprehensive data sources, and intuitive design to democratize real estate intelligence.
                    </p>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 text-center text-[var(--color-text-primary)]">
                    Core Principles
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {principles.map((principle, index) => (
                        <div key={index} className="metric-cards text-center">
                            <div className="flex justify-center mb-4">
                                {principle.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-3 text-[var(--color-primary)]">
                                {principle.title}
                            </h3>
                            <p className="text-sm text-[var(--color-text-primary)]">
                                {principle.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mb-16 fade-in">
                <h2 className="text-2xl font-semibold mb-8 text-center text-[var(--color-text-primary)]">
                    The Technology Behind the Magic
                </h2>
                
                <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                    {techStack.map((tech, index) => (
                        <div key={index} className="metric-cards text-center">
                            <div className="flex justify-center mb-3">
                                {tech.icon}
                            </div>
                            <h4 className="font-semibold text-base mb-3 text-[var(--color-primary)]">
                                {tech.title}
                            </h4>
                            <p className="text-sm text-[var(--color-text-primary)] mb-1">
                                {tech.detail}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center max-w-3xl mx-auto text-[var(--color-text-primary)]">
                    <p className="text-base">
                        Built on modern cloud infrastructure with enterprise-grade security, our platform processes over 50,000+ data points daily to deliver insights that were previously impossible to generate at scale.
                    </p>
                </div>
            </div>

            <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 text-center text-[var(--color-text-primary)]">
                    Property Pulse Mission & Vision
                </h2>

                <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">

                    <div className="flex flex-col justify-evenly metric-cards text-center space-y-2">
                        <div className="flex justify-center gap-2">
                            <Target className="text-[var(--color-primary)]" size="24" />

                            <h3 className="font-semibold text-lg text-[var(--color-primary)]">
                                Mission
                            </h3>
                        </div>
                        
                        <p className="text-sm text-[var(--color-text-primary)]">
                            To empower every real estate decision with transparent, intelligent, and actionable insights that eliminate guesswork and bias.
                        </p>
                    </div>

                    <div className="flex flex-col justify-evenly metric-cards text-center space-y-2">
                        <div className="flex justify-center gap-2">
                            <Brain className="text-[var(--color-primary)]" size="24" />

                            <h3 className="font-semibold text-lg text-[var(--color-primary)]">
                                Vision
                            </h3>
                        </div>
                        
                        <p className="text-sm text-[var(--color-text-primary)]">
                            A world where every person has access to institutional-grade real estate intelligence, making property markets more efficient and equitable.
                        </p>
                    </div>

                </div>
            </div>

            <div className="text-center text-[var(--color-text-primary)] fade-in">
                <h2 className="text-2xl font-semibold mb-4">
                    What's Next for Property Pulse
                </h2>

                <p className="max-w-3xl mx-auto text-base mb-6">
                    Development focuses on continuously pushing the boundaries of what's possible in real estate technology. 
                    From predictive market analytics to personalized investment recommendations, this is the future of property intelligence.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 text-sm">
                    <div className="bg-[var(--color-card)] p-4 rounded-lg border border-[var(--color-outline)]">
                        <h1 className="text-lg font-bold text-[var(--color-primary)]">Advanced Analytics</h1>
                        <p>Portfolio Optimization</p>
                    </div>
                    <div className="bg-[var(--color-card)] p-4 rounded-lg border border-[var(--color-outline)]">
                        <h1 className="text-lg font-bold text-[var(--color-primary)]">Predictive Models</h1> 
                        <p>Market Timing Insights</p>
                    </div>
                    <div className="bg-[var(--color-card)] p-4 rounded-lg border border-[var(--color-outline)]">
                        <h1 className="text-lg font-bold text-[var(--color-primary)]">Developer Tools</h1> 
                        <p>Risk assessment APIs</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button className="button-primary hover-size">
                        Join Our Journey
                    </button>
                    <button className="button-primary hover-size">
                        View Live Demo
                    </button>
                </div>
            </div>

        </section>
    )
}