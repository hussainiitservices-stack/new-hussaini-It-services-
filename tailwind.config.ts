import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: [
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: "#0B1C2C",
                    navy: "#1F3A5F",
                    blue: "#3A6EA5",
                    primary: "#4DA8DA",
                    light: "#5BC0EB",
                    glow: "#7FD8F7",
                },
            },
            backgroundImage: {
                "brand-gradient": "linear-gradient(135deg, #4DA8DA, #5BC0EB, #7FD8F7)",
            },
            boxShadow: {
                glow: "0 0 40px rgba(91, 192, 235, 0.35)",
            },
        },
    },
    plugins: [],
}

export default config