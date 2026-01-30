"use client"
import * as React from "react"

export function CustomCursor() {
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isPointer, setIsPointer] = React.useState(false)
    const [isClicking, setIsClicking] = React.useState(false)

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })

            const target = e.target as HTMLElement
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') !== null ||
                target.closest('a') !== null
            )
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <>
            {/* Main cursor dot */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.05s ease-out'
                }}
            >
                <div
                    className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${isClicking ? 'scale-75' : isPointer ? 'scale-150' : 'scale-100'
                        }`}
                >
                    {/* Inner dot */}
                    <div className="w-2 h-2 bg-white rounded-full" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 w-2 h-2 bg-white rounded-full blur-sm opacity-70 animate-pulse" />
                </div>
            </div>

            {/* Outer ring */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.15s ease-out'
                }}
            >
                <div
                    className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isClicking ? 'scale-75' : isPointer ? 'scale-125' : 'scale-100'
                        }`}
                >
                    {/* Outer circle */}
                    <div className="w-8 h-8 border-2 border-white/30 rounded-full" />

                    {/* Outer glow */}
                    <div className="absolute inset-0 w-8 h-8 border-2 border-white/20 rounded-full blur-md animate-pulse" />
                </div>
            </div>

            {/* Trail effect */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
            >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                    {/* Gradient trail */}
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                </div>
            </div>
        </>
    )
}
