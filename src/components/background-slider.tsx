"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

const backgroundImages = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop", // Nature
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2070&auto=format&fit=crop", // Taj Mahal
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop", // Beach
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", // Adventure
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"  // India Gate/Monument
]

export function BackgroundSlider() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % backgroundImages.length)
        }, 10000) // 10 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden">
            {backgroundImages.map((src, i) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
                >
                    <Image
                        src={src}
                        alt="Travel Background"
                        fill
                        className="object-cover"
                        priority={i === 0}
                    />
                </div>
            ))}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" /> {/* Overlay for readability */}
        </div>
    )
}
