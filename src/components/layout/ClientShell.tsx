"use client"

import { useEffect } from "react"
import { initLenis } from "@/lib/lenis"

import Navbar from "@/components/layout/Navbar"
import CursorGlow from "@/components/ui/CursorGlow"
import ThemeToggle from "@/components/ui/ThemeToggle"
import Particles from "@/components/ui/Particles"

export default function ClientShell({
    children,
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        const cleanup = initLenis()
        return cleanup
    }, [])

    return (
        <>
            {/* 🌌 PARTICLES — renders across entire viewport */}
            <Particles />

            {/* 🖱️ CURSOR GLOW */}
            <CursorGlow />

            {/* 🌗 THEME TOGGLE */}
            <ThemeToggle />

            {/* 🧭 NAVBAR */}
            <Navbar />

            {/* 📦 CONTENT */}
            <div className="relative" style={{ zIndex: 2 }}>
                {children}
            </div>
        </>
    )
}
