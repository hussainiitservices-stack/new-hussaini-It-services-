"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-xl cursor-pointer
                bg-gray-100 dark:bg-white/10
                backdrop-blur-xl
                border border-gray-300 dark:border-white/20
                hover:bg-gray-200 dark:hover:bg-white/20
                transition-colors duration-300"
        >
            <AnimatePresence mode="wait" initial={false}>
                {dark ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="text-brand-primary" size={22} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="text-amber-500" size={22} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}