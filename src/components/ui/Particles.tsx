"use client"

import { useEffect, useRef } from "react"

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particlesArray: Particle[] = []

        const numberOfParticles = 60
        const dpr = window.devicePixelRatio || 1

        // ✅ Resize canvas properly
        const resizeCanvas = () => {
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = window.innerWidth + "px"
            canvas.style.height = window.innerHeight + "px"
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        resizeCanvas()

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number

            constructor() {
                this.x = Math.random() * window.innerWidth
                this.y = Math.random() * window.innerHeight
                this.size = Math.random() * 2 + 0.5
                this.speedX = Math.random() * 0.3 - 0.15
                this.speedY = Math.random() * 0.3 - 0.15
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > window.innerWidth || this.x < 0) this.speedX *= -1
                if (this.y > window.innerHeight || this.y < 0) this.speedY *= -1
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = "rgba(91, 192, 235, 0.4)"
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            particlesArray = []
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle())
            }
        }

        const animate = () => {
            if (!ctx) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesArray.forEach((particle) => {
                particle.update()
                particle.draw(ctx)
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        const handleResize = () => {
            resizeCanvas()
            init()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        />
    )
}