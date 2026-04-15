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
        let mouse = { x: -1000, y: -1000 }

        const numberOfParticles = 80
        const connectionDistance = 120
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
            opacity: number

            constructor() {
                this.x = Math.random() * window.innerWidth
                this.y = Math.random() * window.innerHeight
                this.size = Math.random() * 2.5 + 0.8
                this.speedX = Math.random() * 0.5 - 0.25
                this.speedY = Math.random() * 0.5 - 0.25
                this.opacity = Math.random() * 0.5 + 0.3
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > window.innerWidth || this.x < 0) this.speedX *= -1
                if (this.y > window.innerHeight || this.y < 0) this.speedY *= -1
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = `rgba(77, 168, 218, ${this.opacity})`
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

        const drawConnections = (ctx: CanvasRenderingContext2D) => {
            for (let i = 0; i < particlesArray.length; i++) {
                for (let j = i + 1; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x
                    const dy = particlesArray[i].y - particlesArray[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.15
                        ctx.strokeStyle = `rgba(91, 192, 235, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                        ctx.stroke()
                    }
                }

                // Mouse interaction lines
                const dxm = particlesArray[i].x - mouse.x
                const dym = particlesArray[i].y - mouse.y
                const distMouse = Math.sqrt(dxm * dxm + dym * dym)

                if (distMouse < 180) {
                    const opacity = (1 - distMouse / 180) * 0.3
                    ctx.strokeStyle = `rgba(127, 216, 247, ${opacity})`
                    ctx.lineWidth = 0.8
                    ctx.beginPath()
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            }
        }

        const animate = () => {
            if (!ctx) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesArray.forEach((particle) => {
                particle.update()
                particle.draw(ctx)
            })

            drawConnections(ctx)

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouse.x = -1000
            mouse.y = -1000
        }

        init()
        animate()

        const handleResize = () => {
            resizeCanvas()
            init()
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    )
}