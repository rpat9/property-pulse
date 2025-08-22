import { TrendingUpDown, House, ChartCandlestick, NotebookPen, MoveUpRight } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export default function Features() {

    const navigate = useNavigate();

    const features = [
        {
            linkto:"price-estimates",
            icon: <TrendingUpDown className="text-[var(--color-primary)]" size="30"/>,
            label: "Accurate Price Estimates",
            description: "Powered by real-time data and comps"
        },
        {
            linkto: "neighborhood-analysis",
            icon: <House className="text-[var(--color-primary)]" size="30" />,
            label: "Neighborhood Analysis",
            description: "Crime, walk score, schools, more"
        },
        {
            linkto: "investment-metrics",
            icon: <ChartCandlestick className="text-[var(--color-primary)]" size="30" />,
            label: "Investment Risk Metrics",
            description: "Market volatility, price trend, ROI"
        },
        {
            linkto: "property-comparison",
            icon: <NotebookPen className="text-[var(--color-primary)]" size="30" />,
            label: "Data-Driven Comparisions",
            description: "Compare homes side-by-side intelligently"
        }
    ]

    const handleFeaturesClick = (serviceId: string) => {
        navigate(`/services#${serviceId}`);
    }

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative sm:mb-10">
            <div className="container mx-auto px-4 sm:px-6">
                
                <div className="flex flex-col lg:hidden">
                    <div className="flex flex-col gap-4 justify-center pb-10">

                        {features.map((feature) => {
                            return (
                                <div 
                                    key={feature.label} 
                                    className="metric-cards flex flex-col h-full"
                                    onClick={() => handleFeaturesClick(feature.linkto)}
                                >
                                    <div className="flex justify-end mb-4">
                                        <MoveUpRight size="20"/>
                                    </div>

                                    <div className="flex flex-col items-center justify-center flex-grow text-center mb-4">

                                        <div className="mb-3">
                                            {feature.icon}
                                        </div>

                                        <div className="font-bold text-xl text-[var(--color-text-primary)]">
                                            {feature.label}
                                        </div>

                                        <p className="mt-2 text-sm text-[var(--color-text-primary)]">{feature.description}</p>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>

                <div className="hidden lg:flex gap-12 items-stretch justify-center w-full">

                    {features.map((feature) => {
                        return (
                            <div 
                                key={feature.label} 
                                className="metric-cards fade-in flex flex-col flex-1 cursor-pointer hover-size"
                                onClick={() => handleFeaturesClick(feature.linkto)}
                            >
                                <div className="flex justify-end mb-4">
                                    <MoveUpRight size="20"/>
                                </div>

                                <div className="flex flex-col items-center justify-center flex-grow text-center mb-4 p-4 space-y-2">

                                    <div className="mb-3">
                                        {feature.icon}
                                    </div>

                                    <div className="font-bold text-xl text-[var(--color-text-primary)]">
                                        {feature.label}
                                    </div>

                                    <p className="mt-2 text-sm text-[var(--color-text-primary)]">{feature.description}</p>

                                </div>

                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </section>
    )
}