import { motion, Variants } from "motion/react";

interface TypewriterProps {
  text: string;
}

export default function Typewriter({ text }: TypewriterProps) {
    const letters: string[] = text.split("");
  
    const sentence: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
        >
            Welcome to {' '}
            {letters.map((char: string, index: number) => (
                <motion.span className="text-[var(--color-primary)]" key={index} variants={letterVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );

}