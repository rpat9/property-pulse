import { useState, useEffect } from 'react';

export default function AnimatedChart() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const buildings = [
        { height: 380, delay: 0, color: '#4f46e5' },
        { height: 460, delay: 0.2, color: '#7c3aed' },
        { height: 340, delay: 0.4, color: '#8b5cf6' },
        { height: 520, delay: 0.6, color: '#a78bfa' },
        { height: 420, delay: 0.8, color: '#c4b5fd' },
    ];

    return (
        <div className="w-full h-full">
            <svg
                viewBox="0 0 700 600"
                preserveAspectRatio="xMidYMax meet"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {buildings.map((building, index) => (
                    <g key={index}>
                        
                        <rect
                            x={index * 120 + 40}
                            y={600 - building.height}
                            width={80}
                            height={animate ? building.height : 0}
                            fill={building.color}
                            filter="url(#glow)"
                            style={{
                                transition: `height 1s ease-out ${building.delay}s, y 1s ease-out ${building.delay}s`,
                                transformOrigin: 'bottom',
                            }}
                        />

                        {Array.from({ length: Math.floor(building.height / 40) }, (_, i) => (
                            <rect
                                key={i}
                                x={index * 120 + 60}
                                y={600 - building.height + i * 40 + 14}
                                width={10}
                                height={10}
                                fill="#fbbf24"
                                opacity={animate ? (Math.random() > 0.3 ? 1 : 0.3) : 0}
                                style={{
                                transition: `opacity 0.5s ease-out ${building.delay + 1}s`,
                                }}
                            />
                        ))}

                        <rect
                            x={index * 120 + 35}
                            y={600 - building.height - 12}
                            width={90}
                            height={12}
                            fill={building.color}
                            opacity={animate ? 1 : 0}
                            style={{
                                transition: `opacity 0.5s ease-out ${building.delay + 0.5}s`,
                            }}
                        />
                    </g>
                ))}

                <circle
                    cx="150"
                    cy="80"
                    r="6"
                    fill="#10b981"
                    opacity={animate ? 1 : 0}
                    style={{ transition: 'opacity 1s ease-out 2s' }}
                >
                    <animate attributeName="cy" values="80;60;80" dur="3s" repeatCount="indefinite" />
                </circle>

                <circle
                    cx="600"
                    cy="100"
                    r="5"
                    fill="#f59e0b"
                    opacity={animate ? 1 : 0}
                    style={{ transition: 'opacity 1s ease-out 2.2s' }}
                >
                    <animate attributeName="cy" values="100;80;100" dur="2.5s" repeatCount="indefinite" />
                </circle>

                <polyline
                    points="100,500 220,420 340,360 460,310 580,270"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray="1000"
                    strokeDashoffset={animate ? 0 : 1000}
                    style={{
                        transition: 'stroke-dashoffset 2s ease-out 1.5s',
                    }}
                />

                {[100, 220, 340, 460, 580].map((x, i) => (
                    <circle
                        key={i}
                        cx={x}
                        cy={500 - i * 60}
                        r="6"
                        fill="#10b981"
                        opacity={animate ? 1 : 0}
                        style={{
                            transition: `opacity 0.3s ease-out ${2 + i * 0.1}s`,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}