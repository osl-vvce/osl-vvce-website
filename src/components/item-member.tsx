import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

export const ItemMember = ({ data }) => {
    const [focused, changeFocused] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = -((y - centerY) / centerY) * 7.5
        const rotateY = ((x - centerX) / centerX) * 7.5
        const mouseX = (x / rect.width) * 100
        const mouseY = (y / rect.height) * 100

        card.style.setProperty("--mouse-x", `${mouseX.toFixed(1)}%`)
        card.style.setProperty("--mouse-y", `${mouseY.toFixed(1)}%`)
        card.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`)
        card.style.setProperty("--rotate-y", `${rotateY.toFixed(2)}deg`)
        card.style.setProperty("--tilt-opacity", "1")
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        if (!card) return
        card.style.setProperty("--rotate-x", "0deg")
        card.style.setProperty("--rotate-y", "0deg")
        card.style.setProperty("--tilt-opacity", "0")
    }

    return (
        <div className="blog-item w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-4 sm:p-5">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`interactive-spooky-card spooky-liquid-card group h-full rounded-3xl overflow-hidden transition-all duration-300 ${
                    focused ? "focused" : ""
                }`}
            >
                {/* Dynamic Cursor Spotlight Overlay */}
                <div className="card-dynamic-spotlight" />

                <Link
                    to={data.fields.slug}
                    title={data.frontmatter.fullname}
                    onFocus={() => changeFocused(true)}
                    onBlur={() => changeFocused(false)}
                    className="block group outline-none p-4 sm:p-5 !no-underline"
                    style={{ textDecoration: "none" }}
                >
                    {/* Clean Portrait Image Container */}
                    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-4 bg-black/60 border border-orange-500/30 group-hover:border-orange-400/80 shadow-lg transition-all duration-300">
                        {data.frontmatter.avatar?.childImageSharp?.fluid ? (
                            <Img
                                fluid={
                                    data.frontmatter.avatar.childImageSharp
                                        .fluid
                                }
                                alt={data.frontmatter.fullname}
                                className="w-full h-full transition-transform duration-500 group-hover:scale-108"
                                style={{ height: "100%", width: "100%" }}
                                imgStyle={{
                                    objectFit: "cover",
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                        ) : data.frontmatter.avatar?.publicURL ? (
                            <img
                                src={data.frontmatter.avatar.publicURL}
                                alt={data.frontmatter.fullname}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                                style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
                            />
                        ) : data.frontmatter.avatarStatic ? (
                            <img
                                src={data.frontmatter.avatarStatic}
                                alt={data.frontmatter.fullname}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                                style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-orange-400/60 font-serif text-xs">
                                No avatar
                            </div>
                        )}

                        {/* Subtle bottom vignette gradient for depth */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>

                    {/* Member Details */}
                    <div className="pt-1 pb-1 text-center w-full">
                        <h4 className="font-spooky text-orange-300 group-hover:text-orange-200 font-bold text-lg md:text-xl transition-colors duration-200 text-glow-orange truncate">
                            {data.frontmatter.fullname}
                        </h4>
                        <div className="mt-1.5">
                            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-400 uppercase">
                                {data.frontmatter.role}
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ItemMember
