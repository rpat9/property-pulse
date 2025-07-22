import AnimatedChart from "./AnimatedChart";
import Typewriter from "./TypeWriter";

export default function Hero() {
    return (
        <section className="min-h-auto w-[100%] flex bg-[var(--color-bg)]">
            <div className="grid sm:grid-cols-2 gap-12 items-center border-[var(--color-outline)]">

                <div className="flex ml-10">
                    
                    <div className="px-6 pt-15">

                        <h1 className="text-5xl font-bold text-[var(--color-text-primary)] mt-10 mb-2">
                            <Typewriter text="Property Pulse" />
                        </h1>

                        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">
                            AI-Powered Real Estate Intelligence
                        </h1>

                        <p className="text-xl text-[var(--color-text-primary)] pt-6">Make informed property decisions backed by data-driven insights.</p>

                    </div>

                    <div className="pl-10 absolute left-3/5 w-[600px] h-[600px]">
                        <AnimatedChart />
                    </div>

                </div>
                
                
            </div>
            
        </section>
    )
}