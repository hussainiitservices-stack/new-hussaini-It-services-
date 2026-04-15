import Lenis from "lenis"

export const initLenis = () => {
    const lenis = new Lenis()

    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}