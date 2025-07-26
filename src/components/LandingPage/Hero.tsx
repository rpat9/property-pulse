import AnimatedChart from "./helpers/AnimatedChart";
import Typewriter from "./helpers/TypeWriter";

export default function Hero() {

    const metrics = [
        {num: '95%+', label: 'Prediction Accuracy'},
        {num: '20+', label: 'Machine Learning Features'},
        {num: '10,000+', label: 'Properties Analyzed'},
    ]

    return (
        <section className="w-full flex bg-[var(--color-bg)] relative overflow-hidden mb-10">
            <div className="container mx-auto px-4 sm:px-6">
                
                <div className="flex flex-col lg:hidden">
                    <div className="flex-1 flex flex-col justify-center py-12">

                        <div className="text-center space-y-6">
                            <span className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)] block">
                                <Typewriter text="Property Pulse" />
                            </span>

                            <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-text-primary)] leading-tight">
                                AI-Powered Real Estate Intelligence
                            </h1>

                            <p className="text-lg sm:text-xl text-[var(--color-text-primary)] max-w-md mx-auto">
                                Make informed property decisions backed by data-driven insights.
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center gap-6">
                            <button 
                                className="button-primary hover-size"
                            >
                                Try Demo
                            </button>

                            <button
                                className="button-primary hover-size"
                            >
                                Explore Insights
                            </button>
                        </div>

                    </div>
                    
                    <div className="flex-1 flex items-center justify-center pl-6">
                        <div className="w-full max-w-sm h-80 pb-10">
                            <AnimatedChart />
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center pb-10">

                        {metrics.map((metric) => {
                            return (
                                <div  
                                    key={metric.label} 
                                    className="metric-cards"
                                >
                                    <h1 className="text-[var(--color-primary)] text-2xl font-bold">{metric.num}</h1>
                                    <p className="text-sm">{metric.label}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>


                <div className="hidden lg:flex gap-12 items-center">

                    <div className="space-y-8 pt-30">

                        <span className="text-5xl font-bold text-[var(--color-text-primary)] block">
                            <Typewriter text="Property Pulse" />
                        </span>

                        <h1 className="text-5xl font-bold text-[var(--color-text-primary)] leading-tight">
                            AI-Powered Real Estate Intelligence
                        </h1>

                        <p className="text-xl text-[var(--color-text-primary)] max-w-lg">
                            Make informed property decisions backed by data-driven insights.
                        </p>

                        <div className="flex gap-6">
                            <button 
                                className="button-primary hover-size"
                            >
                                Try Demo
                            </button>

                            <button
                                className="button-primary hover-size"
                            >
                                Explore Insights
                            </button>
                            
                        </div>

                        <div className="flex gap-2">
                            
                            {metrics.map((metric) => {
                                return (
                                    <div 
                                        className="metric-cards cursor-default" 
                                        title={`${metric.num} ${metric.label}`}
                                        key={metric.label}
                                    >
                                        <h1 className="text-[var(--color-primary)] text-3xl font-bold">{metric.num}</h1>
                                        <p className="text-sm">{metric.label}</p>
                                    </div>
                                )
                            })}
                        
                        </div>

                    </div>
                    
                    <div className="flex items-center justify-center">
                        <div className="pl-12 w-full max-w-2xl h-96 lg:h-[500px] xl:h-[600px]">
                            <AnimatedChart />
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}