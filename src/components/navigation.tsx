import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { WindowLocation } from "@reach/router"

import { Logo } from "./utils"
import List from "./navigation-list"
import { Menu } from "react-feather"
import SideBar from "./sidebar"
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

    const navbar = useRef(null)

    const [scrolled, changeState] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [navbarHeight, setNavbarHeight] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.pageYOffset || document.documentElement.scrollTop
            if (currentY > 40) {
                changeState(true)
                if (currentY > lastScrollY.current && currentY > 60) {
                    setHidden(true)
                } else if (currentY < lastScrollY.current) {
                    setHidden(false)
                }
            } else {
                changeState(false)
                setHidden(false)
            }
            lastScrollY.current = currentY
        }

        window.addEventListener("scroll", onScroll, { passive: true })

        if (navbar.current) {
            setNavbarHeight(navbar.current.getBoundingClientRect().height)
        }

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <React.Fragment>
            <div
                className={`duration-300 transition-all flex justify-center lg:justify-between items-center z-20 fixed w-full nav ${
                    scrolled ? "scrolled bg-bg p-4" : "p-5"
                }`}
                style={{
                    transform: hidden ? "translateY(-100%)" : "translateY(0)",
                    opacity: hidden ? 0 : 1,
                    pointerEvents: hidden ? "none" : "auto",
                    transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, padding 0.3s ease, background 0.3s ease",
                }}
                ref={navbar}
            >
                <button
                    className="absolute text-primary outline-0 lg:hidden"
                    style={{
                        transform: "translateY(-50%)",
                        top: "50%",
                        left: "10px",
                    }}
                    onClick={() => {
                        setSidebarOpen(true)
                    }}
                >
                    <Menu />
                </button>
                <SideBar open={sidebarOpen} onChange={setSidebarOpen}>
                    <div className="bg-bg h-full flex flex-col justify-center relative">
                        <div className="absolute top-0 my-4 text-center w-full">
                            <Link
                                to="/"
                                title={data.site.siteMetadata.title}
                                className="inline-block"
                            >
                                <Logo
                                    className={`duration-300 transition-all ${
                                        scrolled ? "w-12" : "w-16"
                                    }`}
                                />
                            </Link>
                        </div>
                        <div className="text-center">
                            <List
                                name="sidebar-nav"
                                current={currentLocation}
                                currentTheme={currentTheme}
                                switchTheme={switchTheme}
                                themes={themes}
                                withThemeSwitch={allowThemeSwitch}
                                liClassName="block my-2"
                            />
                        </div>
                    </div>
                </SideBar>
                <Link to="/" title={data.site.siteMetadata.title} className="logo-glow-wrapper">
                    <Logo
                        className={`duration-300 transition-all ${
                            scrolled ? "w-12" : "w-16"
                        }`}
                    />
                </Link>
                <div className="hidden lg:block">
                    <List
                        name="navbar"
                        className="nav-links flex"
                        current={currentLocation}
                        currentTheme={currentTheme}
                        switchTheme={switchTheme}
                        themes={themes}
                        withThemeSwitch={allowThemeSwitch}
                    />
                </div>
                <div className="absolute line h-px left-0 bottom-0 bg-gradient-primary"></div>
            </div>
            {navPlaceholder && (
                <div style={{ height: `${navbarHeight}px` }}></div>
            )}
        </React.Fragment>
    )
}

export default Navbar
