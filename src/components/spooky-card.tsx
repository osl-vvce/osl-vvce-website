import React from "react"

export type SpookyCardProps = {
    children: React.ReactNode
    variant?: "frame" | "signboard" | "glass"
    className?: string
    id?: string
    style?: React.CSSProperties
}

/**
 * SpookyCard Component
 * Liquid Morphism Halloween Card with fluid frosted glass,
 * glossy specular highlights, and warm Jack-o'-lantern amber ambient glow.
 */
export const SpookyCard: React.FC<SpookyCardProps> = ({
    children,
    className = "",
    id,
    style,
}) => {
    return (
        <div
            id={id}
            style={style}
            className={`spooky-liquid-card group relative rounded-3xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 ${className}`}
        >
            {/* Top Glossy Liquid Specular Reflection */}
            <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

            {/* Ambient Liquid Amber Glow Orb inside Glass */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-32 bg-orange-500/15 rounded-full blur-3xl pointer-events-none z-0 group-hover:bg-orange-500/25 transition-all duration-500" />

            {/* Inner Content Container */}
            <div className="relative z-10 w-full h-full p-6 sm:p-10 md:p-12 flex flex-col justify-center">
                {children}
            </div>
        </div>
    )
}

export default SpookyCard
