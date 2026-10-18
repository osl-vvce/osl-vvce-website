import React, { useState, useEffect, useCallback, useRef } from "react"

declare global {
    interface Window {
        triggerHalloweenBatIntro?: () => void
    }
}

export default function HalloweenBatLoader() {
    const [isVisible, setIsVisible] = useState(true)
    const [isFadingOut, setIsFadingOut] = useState(false)
    const audioCtxRef = useRef<AudioContext | null>(null)

    // Play subtle eerie audio drone and bat wing whooshes via native Web Audio API
    const playSpookyAudio = useCallback(() => {
        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
            if (!AudioCtx) return
            const ctx = new AudioCtx()
            audioCtxRef.current = ctx

            // 1. Low ominous haunted drone
            const droneOsc = ctx.createOscillator()
            const droneGain = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            filter.type = "lowpass"
            filter.frequency.setValueAtTime(140, ctx.currentTime)

            droneOsc.type = "sawtooth"
            droneOsc.frequency.setValueAtTime(55, ctx.currentTime) // Low A
            droneOsc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 3.5)

            droneGain.gain.setValueAtTime(0.01, ctx.currentTime)
            droneGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2)
            droneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8)

            droneOsc.connect(filter)
            filter.connect(droneGain)
            droneGain.connect(ctx.destination)

            droneOsc.start()
            droneOsc.stop(ctx.currentTime + 4)

            // 2. High eerie bat screech sweep
            setTimeout(() => {
                try {
                    const screechOsc = ctx.createOscillator()
                    const screechGain = ctx.createGain()
                    screechOsc.type = "sine"
                    screechOsc.frequency.setValueAtTime(1900, ctx.currentTime)
                    screechOsc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.6)
                    screechGain.gain.setValueAtTime(0.04, ctx.currentTime)
                    screechGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
                    screechOsc.connect(screechGain)
                    screechGain.connect(ctx.destination)
                    screechOsc.start()
                    screechOsc.stop(ctx.currentTime + 0.7)
                } catch (e) {
                    // Ignore if blocked
                }
            }, 800)
        } catch (e) {
            // Autoplay may be restricted by browser until user gesture
        }
    }, [])

    const startIntroSequence = useCallback(() => {
        setIsVisible(true)
        setIsFadingOut(false)
        playSpookyAudio()

        const tFade = setTimeout(() => {
            setIsFadingOut(true)
        }, 3600)

        const tDone = setTimeout(() => {
            setIsVisible(false)
        }, 4400)

        return () => {
            clearTimeout(tFade)
            clearTimeout(tDone)
        }
    }, [playSpookyAudio])

    useEffect(() => {
        // Expose replay function globally
        window.triggerHalloweenBatIntro = () => {
            startIntroSequence()
        }

        const cleanup = startIntroSequence()
        return () => {
            if (cleanup) cleanup()
            if (audioCtxRef.current) {
                try {
                    audioCtxRef.current.close()
                } catch (e) {
                    // Ignore
                }
            }
        }
    }, [startIntroSequence])

    const handleSkip = () => {
        setIsFadingOut(true)
        setTimeout(() => setIsVisible(false), 500)
    }

    if (!isVisible) return null

    return (
        <div
            className={`flex flex-col items-center justify-center overflow-hidden select-none transition-opacity duration-800 ease-out ${
                isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
            }`}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 99999999,
                backgroundColor: "#050308",
                background: "radial-gradient(ellipse at center, #120508 0%, #060205 60%, #000000 100%)",
            }}
        >
            {/* Eerie Blood Harvest Moon in deep background */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: "380px",
                    height: "380px",
                    background: "radial-gradient(circle, #ff2a00 0%, #bb0e00 42%, #500000 70%, transparent 100%)",
                    boxShadow: "0 0 120px rgba(255, 42, 0, 0.55), 0 0 220px rgba(180, 0, 0, 0.35)",
                    opacity: 0.9,
                    filter: "blur(2px)",
                }}
            />

            {/* Creeping Fog Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40 animate-fog-drift"
                style={{
                    backgroundImage: "radial-gradient(ellipse at 50% 80%, rgba(220, 25, 0, 0.35) 0%, rgba(0, 0, 0, 0) 70%)",
                }}
            />

            {/* Lightning Flash overlay */}
            <div className="absolute inset-0 pointer-events-none animate-spooky-lightning bg-white/20" />

            {/* Glowing Demon Eyes lurking in shadows */}
            <DemonEyes style={{ top: "18%", left: "14%" }} delay="0.3s" />
            <DemonEyes style={{ top: "32%", right: "12%" }} delay="1.0s" />
            <DemonEyes style={{ bottom: "24%", left: "16%" }} delay="1.8s" />
            <DemonEyes style={{ bottom: "28%", right: "20%" }} delay="2.4s" />

            {/* Swarm of Bats Flying Out Toward the Screen */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Jumpscare Screeching Bat flying straight at camera */}
                <FlyingBat
                    flightClass="animate-bat-fly-straight"
                    wingSpeed="0.10s"
                    size={74}
                    delay="0.5s"
                />

                {/* Left Swarm Wave 1 & 2 */}
                <FlyingBat flightClass="animate-bat-fly-left-1" wingSpeed="0.12s" size={58} delay="0.2s" />
                <FlyingBat flightClass="animate-bat-fly-left-2" wingSpeed="0.11s" size={66} delay="0.8s" />
                <FlyingBat flightClass="animate-bat-fly-left-3" wingSpeed="0.14s" size={46} delay="1.3s" />
                <FlyingBat flightClass="animate-bat-fly-left-4" wingSpeed="0.13s" size={52} delay="0.6s" />

                {/* Right Swarm Wave 1 & 2 */}
                <FlyingBat flightClass="animate-bat-fly-right-1" wingSpeed="0.11s" size={62} delay="0.3s" />
                <FlyingBat flightClass="animate-bat-fly-right-2" wingSpeed="0.13s" size={70} delay="0.9s" />
                <FlyingBat flightClass="animate-bat-fly-right-3" wingSpeed="0.10s" size={54} delay="1.4s" />
                <FlyingBat flightClass="animate-bat-fly-right-4" wingSpeed="0.12s" size={48} delay="1.8s" />

                {/* High Altitude & Low Swoopers */}
                <FlyingBat flightClass="animate-bat-fly-high-left" wingSpeed="0.12s" size={42} delay="0.7s" />
                <FlyingBat flightClass="animate-bat-fly-high-right" wingSpeed="0.13s" size={40} delay="1.1s" />
                <FlyingBat flightClass="animate-bat-fly-low-left" wingSpeed="0.12s" size={50} delay="1.0s" />
                <FlyingBat flightClass="animate-bat-fly-low-right" wingSpeed="0.11s" size={56} delay="1.6s" />

                {/* Second Wave Delayed Attack */}
                <FlyingBat flightClass="animate-bat-fly-straight-delayed" wingSpeed="0.11s" size={64} delay="1.9s" />
                <FlyingBat flightClass="animate-bat-fly-left-1" wingSpeed="0.13s" size={38} delay="2.3s" />
                <FlyingBat flightClass="animate-bat-fly-right-2" wingSpeed="0.12s" size={44} delay="2.5s" />
            </div>

            {/* Gothic Centerpiece & Title */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                {/* Spooky Glowing Pentagram / Bat Crest */}
                <div className="mb-4 relative animate-pulse">
                    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-[0_0_18px_rgba(255,60,0,0.95)]">
                        <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" stroke="#ff4500" strokeWidth="3" fill="rgba(255,40,0,0.22)" />
                        <circle cx="50" cy="50" r="42" stroke="#ff2200" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="50" cy="50" r="9" fill="#ff6600" />
                    </svg>
                </div>

                <h1
                    className="text-4xl sm:text-6xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#ff7700] to-[#b30000] drop-shadow-[0_4px_20px_rgba(255,50,0,0.85)]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                >
                    OSL REALM
                </h1>

            </div>

            {/* Skip Button */}
            <button
                onClick={handleSkip}
                className="absolute bottom-6 right-6 z-20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-orange-300/80 hover:text-orange-100 bg-neutral-900/80 hover:bg-red-950/90 border border-orange-500/40 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-lg hover:border-orange-500 hover:shadow-[0_0_16px_rgba(255,80,0,0.7)]"
            >
                Skip Intro →
            </button>
        </div>
    )
}

/**
 * Animated Bat with flapping wings and glowing crimson eyes
 */
interface FlyingBatProps {
    flightClass: string
    wingSpeed: string
    size: number
    delay: string
}

function FlyingBat({ flightClass, wingSpeed, size, delay }: FlyingBatProps) {
    return (
        <div
            className={`absolute ${flightClass}`}
            style={{
                width: `${size}px`,
                height: `${Math.round(size * 0.55)}px`,
                animationDelay: delay,
            }}
        >
            <svg
                viewBox="0 0 100 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)]"
            >
                {/* Left Wing */}
                <g
                    className="animate-bat-wing-left"
                    style={{
                        animationDuration: wingSpeed,
                        transformOrigin: "48px 30px",
                    }}
                >
                    <path
                        d="M 48,30 C 35,10 18,2 2,12 C 8,24 16,30 20,40 C 28,34 35,36 48,32 Z"
                        fill="#0c0910"
                        stroke="#221a2e"
                        strokeWidth="1.2"
                    />
                    <path
                        d="M 48,30 C 32,18 16,16 6,24 C 14,32 24,34 36,32 Z"
                        fill="#181224"
                    />
                    {/* Wing membrane ribs */}
                    <path d="M 48,30 Q 30,22 18,36" stroke="#332446" strokeWidth="0.9" fill="none" />
                    <path d="M 48,30 Q 22,14 4,16" stroke="#332446" strokeWidth="0.9" fill="none" />
                </g>

                {/* Right Wing */}
                <g
                    className="animate-bat-wing-right"
                    style={{
                        animationDuration: wingSpeed,
                        transformOrigin: "52px 30px",
                    }}
                >
                    <path
                        d="M 52,30 C 65,10 82,2 98,12 C 92,24 84,30 80,40 C 72,34 65,36 52,32 Z"
                        fill="#0c0910"
                        stroke="#221a2e"
                        strokeWidth="1.2"
                    />
                    <path
                        d="M 52,30 C 68,18 84,16 94,24 C 86,32 76,34 64,32 Z"
                        fill="#181224"
                    />
                    {/* Wing membrane ribs */}
                    <path d="M 52,30 Q 70,22 82,36" stroke="#332446" strokeWidth="0.9" fill="none" />
                    <path d="M 52,30 Q 78,14 96,16" stroke="#332446" strokeWidth="0.9" fill="none" />
                </g>

                {/* Bat Body */}
                <ellipse cx="50" cy="30" rx="6.5" ry="12" fill="#08060a" />
                {/* Bat Head */}
                <circle cx="50" cy="19" r="5.5" fill="#060408" />
                {/* Left Ear */}
                <polygon points="46,17 43,9 48,14" fill="#0c0910" />
                {/* Right Ear */}
                <polygon points="54,17 57,9 52,14" fill="#0c0910" />

                {/* Glowing Blood-Red Bat Eyes */}
                <circle cx="48" cy="18.5" r="1.3" fill="#ff1744" className="filter drop-shadow-[0_0_3px_#ff0000]" />
                <circle cx="52" cy="18.5" r="1.3" fill="#ff1744" className="filter drop-shadow-[0_0_3px_#ff0000]" />
            </svg>
        </div>
    )
}

/**
 * Creepy Blinking Demon Eyes in the Shadows
 */
function DemonEyes({ style, delay }: { style: React.CSSProperties; delay: string }) {
    return (
        <div
            className="absolute flex items-center space-x-2.5 pointer-events-none animate-demon-eyes"
            style={{ ...style, animationDelay: delay }}
        >
            <div className="w-4 h-1.5 bg-[#ff1744] rounded-[50%/80%] shadow-[0_0_10px_#ff1744] transform rotate-12" />
            <div className="w-4 h-1.5 bg-[#ff1744] rounded-[50%/80%] shadow-[0_0_10px_#ff1744] transform -rotate-12" />
        </div>
    )
}
