"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Contact", id: "contact" },
]

export default function Navbar() {
    const [active, setActive] = useState("")
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    // 🔥 Smooth scroll function
    const handleScrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return

        el.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })

        setOpen(false)
    }

    // 🔥 Scroll detection (optimized)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            let current = ""

            for (const item of navItems) {
                const section = document.getElementById(item.id)
                if (!section) continue

                const top = section.offsetTop - 120
                const bottom = top + section.offsetHeight

                if (window.scrollY >= top && window.scrollY < bottom) {
                    current = item.id
                }
            }

            setActive(current)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div
                    onClick={() => handleScrollTo("hero")}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <span className="text-white font-semibold">Hussaini IT</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleScrollTo(item.id)}
                            className={`relative text-sm transition ${active === item.id
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {item.name}

                            {/* 🔥 Smooth underline */}
                            <motion.span
                                layoutId="underline"
                                className="absolute left-0 -bottom-1 h-[2px] bg-[--color-brand-primary] w-full"
                                style={{
                                    scaleX: active === item.id ? 1 : 0,
                                    transformOrigin: "left",
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    ))}
                </nav>

                {/* CTA */}
                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block px-5 py-2 rounded-full bg-[--color-brand-primary] text-black font-medium shadow-md"
                >
                    Get Started
                </motion.button>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* 🔥 Mobile Menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-black/95 backdrop-blur-xl px-6 py-6 space-y-4"
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleScrollTo(item.id)}
                            className="block text-gray-300 hover:text-white text-lg text-left w-full"
                        >
                            {item.name}
                        </button>
                    ))}

                    <button className="w-full mt-4 px-5 py-3 rounded-full bg-[--color-brand-primary] text-black font-medium">
                        Get Started
                    </button>
                </motion.div>
            )}
        </motion.header>
    )
}