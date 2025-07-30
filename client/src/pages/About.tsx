export default function About() {
    return (
        <section className="mt-12 w-full flex bg-[var(--color-bg)] relative overflow-hidden mb-10 fade-in">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Mobile Design */}
                <div>

                </div>

                {/* Desktop Design */}
                <div className="hidden lg:flex mt-4 items-center">

                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Make Smarter Real Estate Decisions with  
                            <span className="text-[var(--color-primary)]"> AI</span>
                        </h1>
                        <p className="text-lg text-[var(--color-text-primary)]">
                            At Property Pulse, we believe data and transparency should guide your real estate journey —
                            not guesswork. Our platform empowers you with intelligent insights every step of the way.
                        </p>
                    </div>
                    
                </div>

            </div>
        </section>
    )
}