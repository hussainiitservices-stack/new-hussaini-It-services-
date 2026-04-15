"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean | null>(null)

    // 🔥 Initialize theme (localStorage + system)
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme === "dark") {
            setDark(true)
        } else if (savedTheme === "light") {
            setDark(false)
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setDark(prefersDark)
        }
    }, [])

    // 🔥 Apply theme
    useEffect(() => {
        if (dark === null) return

        const root = document.documentElement

        if (dark) {
            root.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            root.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [dark])

    // Prevent flicker
    if (dark === null) return null

    return (
        <motion.button
            onClick={() => setDark(!dark)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
            {dark ? (
                <Moon className="text-white" size={20} />
            ) : (
                <Sun className="text-yellow-400" size={20} />
            )}
        </motion.button>
    )
}