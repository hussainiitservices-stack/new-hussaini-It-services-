import "./globals.css"
import type { Metadata } from "next"
import ClientShell from "@/components/layout/ClientShell"

export const metadata: Metadata = {
    title: "Hussaini IT Services | Modern Digital Solutions",
    description:
        "Building scalable, modern, and high-performance digital solutions with cutting-edge technology and innovation. Web development, app development, UI/UX design, and cybersecurity.",
    keywords: [
        "IT services",
        "web development",
        "app development",
        "UI/UX design",
        "cyber security",
        "Hussaini IT",
    ],
    openGraph: {
        title: "Hussaini IT Services",
        description:
            "Building scalable, modern, and high-performance digital solutions.",
        type: "website",
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="bg-background text-foreground antialiased relative overflow-x-hidden">
                <ClientShell>{children}</ClientShell>
            </body>
        </html>
    )
}