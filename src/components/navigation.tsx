import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { WindowLocation } from "@reach/router"

import { Logo } from "./utils"
import List from "./navigation-list"
import { Menu, X } from "react-feather"
import { NavigationQuery } from "./__generated__/NavigationQuery"
import { Theme } from "./layout"

type NavbarProps = {
    navPlaceholder: boolean
    location: WindowLocation
    currentTheme: number
    switchTheme: () => void
    themes: Theme[]
    allowThemeSwitch: boolean
    front: boolean
}



const Navbar: React.FC<NavbarProps> = ({
    navPlaceholder,
    location,
    currentTheme,
    switchTheme,
    themes,
    allowThemeSwitch = true,
    front,
}) => {
    const currentLocation = location.pathname.split("/")[1]

    const data = useStaticQuery<NavigationQuery>(graphql`
        query NavigationQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const navbar = useRef<HTMLDivElement>(null)

    const [scrolled, setScrolled] = useState(false)
    const [navbarHeight, setNavbarHeight] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.pageYOffset || document.documentElement.scrollTop
            if (currentY > 40) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true })

        if (navbar.current) {
            setNavbarHeight(navbar.current.getBoundingClientRect().height)
        }

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && sidebarOpen) {
                setSidebarOpen(false)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [sidebarOpen])

    return (
        <React.Fragment>
            {/* Separate Floating OSL Logo in Top-Left Corner (Shown when scrolled) */}
            <div
                className="fixed z-40 transition-all duration-300"
                style={{
                    top: "16px",
                    left: "20px",
                    transform: scrolled ? "translateY(0) scale(1)" : "translateY(-18px) scale(0.9)",
                    opacity: scrolled ? 1 : 0,
                    pointerEvents: scrolled ? "auto" : "none",
                }}
            >
                <Link
                    to="/"
                    title={data.site.siteMetadata.title}
                    className="logo-glow-wrapper floating-logo-btn group relative flex items-center z-10"
                >
                    <div className="relative">
                        <Logo className="w-12 sm:w-14" />
                        {/* Spooky Jack-o'-lantern Halo Aura */}
                        <div className="absolute inset-0 rounded-full bg-orange-600/20 blur-md pointer-events-none group-hover:bg-orange-500/40 transition-all duration-300" />
                    </div>
                </Link>
            </div>

            {/* Separate Floating Menu Button in Top-Right Corner (Shown when scrolled) */}
            <div
                className="fixed z-50 transition-all duration-300"
                style={{
                    top: "16px",
                    right: "20px",
                    transform: scrolled ? "translateY(0) scale(1)" : "translateY(-18px) scale(0.9)",
                    opacity: scrolled ? 1 : 0,
                    pointerEvents: scrolled ? "auto" : "none",
                }}
            >
                <button
                    type="button"
                    onClick={() => setSidebarOpen((prev) => !prev)}
                    className={`floating-menu-btn group ${
                        sidebarOpen ? "active ring-1 ring-orange-400/80 shadow-[0_0_20px_rgba(255,102,0,0.7)]" : ""
                    }`}
                    aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={sidebarOpen}
                >
                    {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                    <span>{sidebarOpen ? "Close" : "Menu"}</span>
                </button>
            </div>

            {/* Ambient Click-outside Backdrop Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                    sidebarOpen
                        ? "opacity-100 pointer-events-auto bg-black/40 backdrop-blur-[2px]"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            />

            {/* Floating Liquid Morphism Dropdown Menu Card (Anchored top-right beneath Menu button) */}
            <div
                className="spooky-liquid-menu-tab fixed z-50 w-56 sm:w-64 flex flex-col items-center p-4 sm:p-5 overflow-y-auto"
                style={{
                    top: scrolled ? "62px" : "72px",
                    right: scrolled ? "16px" : "20px",
                    maxHeight: "calc(100vh - 5.5rem)",
                    transformOrigin: "top right",
                    transform: sidebarOpen ? "scale(1) translateY(0)" : "scale(0.92) translateY(-10px)",
                    opacity: sidebarOpen ? 1 : 0,
                    pointerEvents: sidebarOpen ? "auto" : "none",
                    transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease, top 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
            >
                {/* Header: Centered OSL Logo */}
                <div className="w-full flex items-center justify-center mb-3">
                    {/* OSL Logo */}
                    <Link
                        to="/"
                        title={data.site.siteMetadata.title}
                        onClick={() => setSidebarOpen(false)}
                        className="inline-block relative group mx-auto"
                    >
                        <Logo className="w-12 sm:w-14" />
                        <div className="absolute inset-0 rounded-full bg-orange-600/30 blur-lg pointer-events-none group-hover:bg-orange-500/50 transition-all" />
                    </Link>
                </div>

                {/* Navigation Links in Center */}
                <div className="w-full py-1 text-center">
                    <List
                        name="floating-nav"
                        className="floating-nav"
                        current={currentLocation}
                        currentTheme={currentTheme}
                        switchTheme={switchTheme}
                        themes={themes}
                        withThemeSwitch={false}
                        liClassName="block my-1.5"
                        sidebarOpen={sidebarOpen}
                        onItemClick={() => setSidebarOpen(false)}
                    />
                </div>
            </div>

            {/* Main Navbar (Shown at top of page, hides smoothly when scrolled) */}
            <div
                className="duration-300 transition-all flex justify-between items-center z-20 fixed w-full nav py-4 sm:py-5 px-8 sm:px-16"
                style={{
                    transform: scrolled ? "translateY(-100%)" : "translateY(0)",
                    opacity: scrolled ? 0 : 1,
                    pointerEvents: scrolled ? "none" : "auto",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                }}
                ref={navbar}
            >

                {/* Clean OSL Logo on the Left */}
                <Link
                    to="/"
                    title={data.site.siteMetadata.title}
                    className="logo-glow-wrapper group relative flex items-center z-10 transition-opacity duration-300"
                >
                    <div className="relative">
                        <Logo className="w-12 sm:w-14" />
                        {/* Spooky Jack-o'-lantern Halo Aura */}
                        <div className="absolute inset-0 rounded-full bg-orange-600/20 blur-md pointer-events-none group-hover:bg-orange-500/40 transition-all duration-300" />
                    </div>
                </Link>

                {/* Mobile Menu Button on the Right when at the top */}
                <div className="block lg:hidden z-10">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        className={`floating-menu-btn group ${
                            sidebarOpen ? "active ring-1 ring-orange-400/80 shadow-[0_0_20px_rgba(255,102,0,0.7)]" : ""
                        }`}
                        aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={sidebarOpen}
                    >
                        {sidebarOpen ? <X className="w-4 h-4 text-orange-300" /> : <Menu className="w-4 h-4" />}
                        <span>{sidebarOpen ? "Close" : "Menu"}</span>
                    </button>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:block z-10">
                    <List
                        name="navbar"
                        className="nav-links flex"
                        current={currentLocation}
                        currentTheme={currentTheme}
                        switchTheme={switchTheme}
                        themes={themes}
                        withThemeSwitch={false}
                    />
                </div>
            </div>

            {navPlaceholder && (
                <div style={{ height: `${navbarHeight}px` }}></div>
            )}
        </React.Fragment>
    )
}

export default Navbar
