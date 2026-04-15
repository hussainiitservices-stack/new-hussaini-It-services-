"use client"

import { motion } from "framer-motion"

const text = "Hussaini IT Services"

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.04,
        },
    },
}

const child = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.22, 1, 0.36, 1] as const,
            duration: 0.6,
        },
    },
}

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
        >
            {/* 🌌 Animated Glow Background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-[-120px] left-[20%] w-[400px] h-[400px] bg-[--color-brand-primary] opacity-20 blur-3xl rounded-full"
            />

            <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-[-120px] right-[20%] w-[400px] h-[400px] bg-[--color-brand-light] opacity-20 blur-3xl rounded-full"
            />

            {/* ✨ Content */}
            <div className="relative z-10 text-center px-6">

                {/* 🔥 Animated Heading */}
                <motion.h1
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-bold leading-tight flex flex-wrap justify-center"
                >
                    {text.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            variants={child}
                            className="text-gradient"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* 🧠 Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-lg text-gray-400 dark:text-gray-300 max-w-xl mx-auto"
                >
                    Building scalable, modern, and high-performance digital solutions
                    with cutting-edge technology and innovation.
                </motion.p>

                {/* 🚀 CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-10 flex gap-4 justify-center flex-wrap"
                >
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-full bg-[--color-brand-primary] text-black font-medium shadow-lg"
                    >
                        Get Started
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition"
                    >
                        View Services
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}