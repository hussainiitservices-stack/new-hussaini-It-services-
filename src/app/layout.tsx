"use client"

import "./globals.css"
import { useEffect } from "react"
import { initLenis } from "@/lib/lenis"

import Navbar from "@/components/layout/Navbar"
import CursorGlow from "@/components/ui/CursorGlow"
import ThemeToggle from "@/components/ui/ThemeToggle"
import Particles from "@/components/ui/Particles"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased relative overflow-x-hidden">

        {/* 🌌 PARTICLES (bottom layer) */}
        <div className="fixed inset-0 z-0">
          <Particles />
        </div>

        {/* 🖱️ CURSOR GLOW */}
        <CursorGlow />

        {/* 🌗 THEME TOGGLE */}
        <ThemeToggle />

        {/* 🧭 NAVBAR */}
        <Navbar />

        {/* 📦 CONTENT */}
        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  )
}