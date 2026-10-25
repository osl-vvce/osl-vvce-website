import React from "react"
import { Link } from "./utils"

type HalloweenBannerButtonProps = {
    title: string
    to?: string
    type?: string
    label?: string
    disabled?: boolean
    iconLeft?: JSX.Element
    iconRight?: JSX.Element
    onClick?: (e: React.MouseEvent) => void
    className?: string
}

/**
 * HalloweenBannerPumpkin - Left ornament SVG
 * Matches the user-provided Halloween banner illustration:
 * Spooky twigs + Round carved Jack-o'-lantern + Bent black witch hat + Base stand
 */
export const HalloweenBannerPumpkin: React.FC<{ className?: string }> = ({
    className = "w-20 h-20",
}) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ overflow: "visible" }}
        >
            <defs>
                {/* Pumpkin Rich Halloween Orange Gradient */}
                <radialGradient
                    id="hbPumpkinGrad"
                    cx="45%"
                    cy="45%"
                    r="55%"
                    fx="40%"
                    fy="35%"
                >
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="25%" stopColor="#fb923c" />
                    <stop offset="65%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                </radialGradient>

                {/* Hat Gradient */}
                <linearGradient id="hbHatGrad" x1="20%" y1="10%" x2="80%" y2="90%">
                    <stop offset="0%" stopColor="#27272a" />
                    <stop offset="50%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#09090b" />
                </linearGradient>

                {/* Hat Crease Highlight */}
                <linearGradient id="hbCreaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#52525b" />
                    <stop offset="100%" stopColor="#18181b" />
                </linearGradient>
            </defs>

            {/* 1. Spooky Bare Twigs (Fanning out behind hat and pumpkin) */}
            <g stroke="#1c1917" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                {/* Right branch group */}
                <path d="M 52 38 L 62 20 L 74 8" />
                <path d="M 62 20 L 76 16" />
                <path d="M 68 12 L 67 4" />
                <path d="M 58 27 L 70 28" />
                <path d="M 72 17 L 82 14" />

                {/* Left branch group */}
                <path d="M 36 40 L 26 22 L 14 10" />
                <path d="M 26 22 L 15 20" />
                <path d="M 20 16 L 22 6" />
                <path d="M 31 30 L 19 34" />
                <path d="M 16 12 L 8 8" />
            </g>

            {/* 2. Pumpkin Base / Stand */}
            <polygon points="36,83 64,83 60,90 40,90" fill="#09090b" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />

            {/* 3. Pumpkin Body (Round squash with vertical segment cuts) */}
            <g>
                {/* Main Pumpkin Silhouette */}
                <path
                    d="M 50 42 C 68 41 82 48 82 63 C 82 78 68 85 50 85 C 32 85 18 78 18 63 C 18 48 32 41 50 42 Z"
                    fill="url(#hbPumpkinGrad)"
                    stroke="#000000"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                />

                {/* Rib Grooves */}
                <path d="M 38 43 C 27 51 27 75 38 84" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 62 43 C 73 51 73 75 62 84" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 45 42 C 40 52 40 76 46 85" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                <path d="M 55 42 C 60 52 60 76 54 85" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </g>

            {/* 4. Carved Face (Happy / Spooky carved eyes, triangle nose, jagged toothy smile) */}
            <g className="pumpkin-face-glow transition-all duration-300" fill="#09090b">
                {/* Left Eye: Curved happy slit */}
                <path d="M 31 56 Q 37 48 44 56 Q 37 52 31 56 Z" />

                {/* Right Eye: Curved happy slit */}
                <path d="M 56 56 Q 63 48 69 56 Q 63 52 56 56 Z" />

                {/* Triangle Nose */}
                <polygon points="50,58 46,63 54,63" />

                {/* Wide Jagged Smile with Cut-out Teeth */}
                <path
                    d="M 28 66 
                       C 34 65 42 66 50 66 
                       C 58 66 66 65 72 66 
                       C 73 70 70 73 66 74 
                       C 60 78 40 78 34 74 
                       C 30 73 27 70 28 66 Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Upper Cut-out Teeth */}
                <rect x="35" y="65" width="4.5" height="4.5" fill="url(#hbPumpkinGrad)" stroke="#000000" strokeWidth="1" />
                <rect x="47" y="65" width="5" height="5" fill="url(#hbPumpkinGrad)" stroke="#000000" strokeWidth="1" />
                <rect x="59" y="65" width="4.5" height="4.5" fill="url(#hbPumpkinGrad)" stroke="#000000" strokeWidth="1" />

                {/* Lower Cut-out Teeth */}
                <rect x="41" y="70.5" width="4.5" height="4.5" fill="url(#hbPumpkinGrad)" stroke="#000000" strokeWidth="1" />
                <rect x="53" y="70.5" width="4.5" height="4.5" fill="url(#hbPumpkinGrad)" stroke="#000000" strokeWidth="1" />
            </g>

            {/* 5. Witch Hat (Black conical hat tilted with curled tip & wide brim) */}
            <g>
                {/* Hat Brim */}
                <path
                    d="M 18 45 C 30 38 70 39 82 46 C 70 51 30 50 18 45 Z"
                    fill="url(#hbHatGrad)"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />

                {/* Hat Cone (creased conical shape bending to the right) */}
                <path
                    d="M 32 43 
                       C 28 32 32 23 44 17 
                       C 52 13 66 17 76 23 
                       C 79 25 80 28 76 29 
                       C 68 30 58 26 53 28 
                       C 49 30 52 36 68 44 
                       Z"
                    fill="url(#hbHatGrad)"
                    stroke="#000000"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />

                {/* Hat Crease Line */}
                <path
                    d="M 44 17 C 49 22 55 25 64 26"
                    stroke="url(#hbCreaseGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Hat Ribbon / Band Accent */}
                <path
                    d="M 33 42 C 43 40 59 41 67 43 L 68 45 C 59 43 43 42 34 44 Z"
                    fill="#ea580c"
                />
            </g>
        </svg>
    )
}

/**
 * HalloweenBannerTail - Right chevron and diagonal black stripe SVG
 * Matches the user-provided banner:
 * Pointed chevron tip (>) + solid black diagonal stripe + black border lines
 */
export const HalloweenBannerTail: React.FC<{ className?: string }> = ({
    className = "w-11 h-full flex-shrink-0",
}) => {
    return (
        <svg
            viewBox="0 0 44 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="hbTailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
            </defs>

            {/* Orange Chevron Tail Base */}
            <polygon
                points="0,0 20,0 42,24 20,48 0,48"
                fill="url(#hbTailGrad)"
            />

            {/* Solid Black Diagonal Stripe (slanted top-left to bottom-right) */}
            <polygon
                points="8,0 18,0 28,48 18,48"
                fill="#000000"
            />

            {/* Black Border Perimeter */}
            <path
                d="M 0 1.5 L 20 1.5 L 41.5 24 L 20 46.5 L 0 46.5"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                fill="none"
            />
        </svg>
    )
}

/**
 * HalloweenBannerButton - Reusable Button Component matching the exact image
 */
export const HalloweenBannerButton: React.FC<HalloweenBannerButtonProps> = ({
    title,
    to,
    type,
    label,
    disabled = false,
    iconLeft,
    iconRight,
    onClick,
    className = "",
}) => {
    const innerContent = (
        <span className="halloween-banner-inner">
            {/* Left Witch-Pumpkin Ornament */}
            <span className="halloween-banner-pumpkin-wrapper">
                <HalloweenBannerPumpkin className="w-16 sm:w-20 h-16 sm:h-20" />
            </span>

            {/* Main Center Banner Bar */}
            <span className="halloween-banner-bar">
                {/* Wavy subtle highlight overlay */}
                <span className="halloween-banner-highlight" />

                {/* Content */}
                <span className="halloween-banner-text-content">
                    {iconLeft && <span className="mr-2 text-black">{iconLeft}</span>}
                    <span className="halloween-banner-title">{title}</span>
                    {iconRight && <span className="ml-2 text-black">{iconRight}</span>}
                </span>
            </span>

            {/* Right Chevron & Diagonal Stripe */}
            <HalloweenBannerTail className="halloween-banner-tail" />
        </span>
    )

    if (type) {
        const parts = type.split(",")
        const btnType = (parts[1] || parts[0] || "button") as "button" | "submit" | "reset"
        return (
            <button
                type={btnType}
                disabled={disabled}
                onClick={onClick}
                className={`halloween-banner-btn ${disabled ? "disabled" : ""} ${className}`}
                title={label || title}
            >
                {innerContent}
            </button>
        )
    }

    if (to) {
        return (
            <Link
                to={to}
                className={`halloween-banner-btn ${className}`}
                title={label || title}
                onClick={onClick}
            >
                {innerContent}
            </Link>
        )
    }

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`halloween-banner-btn ${disabled ? "disabled" : ""} ${className}`}
            title={label || title}
        >
            {innerContent}
        </button>
    )
}

export default HalloweenBannerButton
