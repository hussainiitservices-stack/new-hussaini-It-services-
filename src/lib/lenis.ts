import Lenis from "lenis"

export const initLenis = () => {
    const lenis = new Lenis()

    let animationFrameId: number

    function raf(time: number) {
        lenis.raf(time)
        animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    // Return cleanup function to prevent memory leaks
    return () => {
        cancelAnimationFrame(animationFrameId)
        lenis.destroy()
    }
}