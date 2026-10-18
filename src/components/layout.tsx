import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { WindowLocation } from "@reach/router"

import { Sun, Moon } from "react-feather"

import Navbar from "./navigation"

import Footer from "./footer"
import SEO, { SEOProps } from "../utils/seo"
import HalloweenBatLoader from "./halloween-bat-loader"

import "../style/index.css"
import { ThemeQuery } from "./__generated__/ThemeQuery"

export type Theme = { name: string; label: string; icon: JSX.Element }
type LayoutProps = {
    children: any
    front?: boolean
    seo: Partial<SEOProps>
    navPlaceholder?: boolean
    location: WindowLocation
}

export default ({
    children,
    front,
    seo,
    navPlaceholder = true,
    location,
}: LayoutProps) => {
    const query = useStaticQuery<ThemeQuery>(graphql`
        query ThemeQuery {
            site {
                siteMetadata {
                    icon
                    switchTheme
                    darkmode
                }
            }
        }
    `)

    const themes: Theme[] = [
        {
            name: "theme-light",
            label: "Light Theme",
            icon: <Sun />,
        },
        {
            name: "theme-dark",
            label: "Dark Theme",
            icon: <Moon />,
        },
    ]

    const isDarkTheme = query.site.siteMetadata.darkmode

    const [theme, changeTheme] = useState(isDarkTheme ? 1 : 0)

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            const t = Number(localStorage.getItem("theme"))
            changeTheme(t)
        }
    }, [])

    const switchTheme = () => {
        const next = theme !== themes.length - 1 ? theme + 1 : 0
        changeTheme(next)
        localStorage.setItem("theme", `${next}`)
    }

    return (
        <React.Fragment>
            <Head data={query} />
            <SEO {...seo} />
            <div className={`wrapper ${themes[theme].name}`}>
                <div className="text-color-default bg-bg relative">
                    <HalloweenBatLoader />
                    <DrippingSpider />
                    <Navbar
                        front={front}
                        navPlaceholder={navPlaceholder}
                        location={location}
                        currentTheme={theme}
                        switchTheme={switchTheme}
                        themes={themes}
                        allowThemeSwitch={query.site.siteMetadata.switchTheme}
                    />
                    {children}
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    )
}

const DrippingSpider = () => {
    const [scrolled, setScrolled] = useState(false)
    const [startled, setStartled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.pageYOffset || document.documentElement.scrollTop
            if (currentY > 60) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            className="fixed top-0 right-6 sm:right-16 z-30 pointer-events-auto select-none"
            style={{
                transform: scrolled
                    ? (startled ? "translateY(55px)" : "translateY(155px)")
                    : "translateY(-130%)",
                transition: "transform 0.8s cubic-bezier(0.34, 1.35, 0.64, 1), opacity 0.5s ease",
                opacity: scrolled ? 1 : 0,
            }}
            onMouseEnter={() => setStartled(true)}
            onMouseLeave={() => setStartled(false)}
            title="A watchful OSL spider companion..."
        >
            {/* The Spider Container with realistic pendulum sway & bob */}
            <div className="animate-spider-sway">
                <div className="animate-spider-bob relative flex flex-col items-center">
                    {/* Glowing Silk Web Thread extending straight from the top of the browser */}
                    <div
                        className="w-px"
                        style={{
                            height: "600px",
                            marginTop: "-600px",
                            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 200, 150, 0.45) 60%, rgba(255, 255, 255, 0.85) 100%)",
                            boxShadow: "0 0 4px rgba(255, 150, 50, 0.6)",
                        }}
                    />

                    {/* Highly Detailed & Realistic Spider SVG */}
                    <svg
                        width="54"
                        height="64"
                        viewBox="0 0 100 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
                    >
                        <defs>
                            {/* Chitin Highlights */}
                            <radialGradient id="abdomen-gradient" cx="50%" cy="40%" r="55%">
                                <stop offset="0%" stopColor="#2c2d30" />
                                <stop offset="65%" stopColor="#121315" />
                                <stop offset="100%" stopColor="#050505" />
                            </radialGradient>
                            <radialGradient id="head-gradient" cx="50%" cy="35%" r="50%">
                                <stop offset="0%" stopColor="#252628" />
                                <stop offset="100%" stopColor="#08080a" />
                            </radialGradient>
                            <filter id="spider-glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#ff7700" floodOpacity="0.4" />
                            </filter>
                        </defs>

                        {/* Back legs reaching up to the dragline silk */}
                        {/* Rear Left Leg 4 */}
                        <path
                            d="M 46,63 Q 26,42 30,22 Q 34,12 47,15"
                            stroke="#1a1b1d"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-left"
                        />
                        <path
                            d="M 46,63 Q 26,42 30,22 Q 34,12 47,15"
                            stroke="#36383c"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-left"
                        />

                        {/* Rear Right Leg 4 */}
                        <path
                            d="M 54,63 Q 74,42 70,22 Q 66,12 53,15"
                            stroke="#1a1b1d"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-right"
                        />
                        <path
                            d="M 54,63 Q 74,42 70,22 Q 66,12 53,15"
                            stroke="#36383c"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-right"
                        />

                        {/* Middle-Rear Left Leg 3 */}
                        <path
                            d="M 45,67 Q 16,50 14,35 Q 12,24 19,18"
                            stroke="#18191b"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-left"
                        />
                        {/* Middle-Rear Right Leg 3 */}
                        <path
                            d="M 55,67 Q 84,50 86,35 Q 88,24 81,18"
                            stroke="#18191b"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-right"
                        />

                        {/* Abdomen (hanging top/spinneret side) */}
                        <ellipse cx="50" cy="42" rx="14" ry="17" fill="url(#abdomen-gradient)" stroke="#ff7700" strokeWidth="0.8" strokeOpacity="0.4" />

                        {/* Halloween Hourglass Emblem on Abdomen */}
                        <path
                            d="M 46,35 L 54,35 L 50,42 L 55,49 L 45,49 L 50,42 Z"
                            fill="#ff7700"
                            filter="url(#spider-glow)"
                            opacity="0.95"
                        />

                        {/* Cephalothorax (head/carapace pointing down) */}
                        <ellipse cx="50" cy="71" rx="11" ry="12" fill="url(#head-gradient)" stroke="#1a1b1e" strokeWidth="1" />

                        {/* Front-Middle Left Leg 2 */}
                        <path
                            d="M 44,71 Q 18,68 12,82 Q 8,92 11,102"
                            stroke="#1a1b1d"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-left"
                        />
                        {/* Front-Middle Right Leg 2 */}
                        <path
                            d="M 56,71 Q 82,68 88,82 Q 92,92 89,102"
                            stroke="#1a1b1d"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-right"
                        />

                        {/* Front Left Leg 1 (reaching down forward) */}
                        <path
                            d="M 45,74 Q 28,78 22,95 Q 18,105 24,113"
                            stroke="#151618"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-left"
                        />
                        {/* Front Right Leg 1 (reaching down forward) */}
                        <path
                            d="M 55,74 Q 72,78 78,95 Q 82,105 76,113"
                            stroke="#151618"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                            className="animate-leg-right"
                        />

                        {/* Pedipalps (Front feelers) */}
                        <path d="M 46,80 Q 42,86 44,91" stroke="#121315" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                        <path d="M 54,80 Q 58,86 56,91" stroke="#121315" strokeWidth="2.2" strokeLinecap="round" fill="none" />

                        {/* Fangs (Chelicerae) */}
                        <path d="M 48,82 Q 49,87 47,89" stroke="#ff7700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M 52,82 Q 51,87 53,89" stroke="#ff7700" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                        {/* 8 Glistening Amber Spider Eyes */}
                        {/* Center large pair */}
                        <circle cx="48" cy="79.5" r="1.4" fill="#ffa726" />
                        <circle cx="52" cy="79.5" r="1.4" fill="#ffa726" />
                        {/* Center reflections */}
                        <circle cx="47.7" cy="79.2" r="0.5" fill="#ffffff" />
                        <circle cx="51.7" cy="79.2" r="0.5" fill="#ffffff" />
                        {/* Outer lower pair */}
                        <circle cx="44.5" cy="78.5" r="1.1" fill="#ff7700" />
                        <circle cx="55.5" cy="78.5" r="1.1" fill="#ff7700" />
                        {/* Upper row 4 eyes */}
                        <circle cx="46" cy="75.5" r="0.9" fill="#ff9100" />
                        <circle cx="54" cy="75.5" r="0.9" fill="#ff9100" />
                        <circle cx="43.5" cy="75.5" r="0.8" fill="#e65100" />
                        <circle cx="56.5" cy="75.5" r="0.8" fill="#e65100" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

const Head = ({ data }) => {
    return (
        <Helmet>
            <link
                rel="icon"
                href={data.site.siteMetadata.icon}
                type="image/png"
            />
            <link
                rel="preconnect"
                href="https://fonts.googleapis.com"
            />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Raleway:wght@500;700;800&display=swap"
                rel="stylesheet"
            />
        </Helmet>
    )
}
