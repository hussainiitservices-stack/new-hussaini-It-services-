"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [])

    return (
        <motion.div
            animate={{
                x: position.x - 150,
                y: position.y - 150,
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
            }}
            className="pointer-events-none fixed top-0 left-0 z-40 w-[300px] h-[300px] rounded-full bg-[--color-brand-primary] opacity-20 blur-3xl"
        />
    )
}