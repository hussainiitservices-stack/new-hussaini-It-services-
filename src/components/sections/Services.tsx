"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Globe, Smartphone, Shield } from "lucide-react"

const services = [
    {
        title: "Web Development",
        desc: "High-performance websites built with modern technologies.",
        icon: Code,
    },
    {
        title: "App Development",
        desc: "Scalable mobile and web applications.",
        icon: Smartphone,
    },
    {
        title: "UI/UX Design",
        desc: "Beautiful and user-friendly interfaces.",
        icon: Globe,
    },
    {
        title: "Cyber Security",
        desc: "Advanced protection for your systems.",
        icon: Shield,
    },
]

export default function Services() {
    return (
        <section id="services" className="relative py-24">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h2 className="text-4xl md:text-5xl font-bold text-gradient">
                    Our Services
                </h2>

                <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    Experience interactive, modern and high-performance solutions.
                </p>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} />
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ---------------- CARD ---------------- */

function ServiceCard({ service }: any) {
    const [rotate, setRotate] = useState({ x: 0, y: 0 })
    const [flip, setFlip] = useState(false)

    const handleMouseMove = (e: any) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const midX = rect.width / 2
        const midY = rect.height / 2

        const rotateY = ((x - midX) / midX) * 10
        const rotateX = -((y - midY) / midY) * 10

        setRotate({ x: rotateX, y: rotateY })
    }

    const reset = () => {
        setRotate({ x: 0, y: 0 })
        setFlip(false)
    }

    const Icon = service.icon

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            onClick={() => setFlip(!flip)}
            style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            }}
            className="relative h-[260px] perspective cursor-pointer"
        >
            <motion.div
                animate={{ rotateY: flip ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
            >

                {/* FRONT */}
                <div className="absolute inset-0 p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 [backface-visibility:hidden]">

                    <Icon className="w-10 h-10 text-brand-primary" />

                    <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 p-6 rounded-2xl bg-brand-primary text-black flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-sm font-medium">{service.desc}</p>
                </div>
            </motion.div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-300 bg-brand-primary/10 blur-xl"></div>
        </motion.div>
    )
}