import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { WindowLocation } from "@reach/router"

import { Sun, Moon } from "react-feather"

import Navbar from "./navigation"

import Footer from "./footer"
import SEO, { SEOProps } from "../utils/seo"

import "../style/index.css"
import { ThemeQuery } from "./__generated__/ThemeQuery"

export type Theme = { name: string; label: string; icon: JSX.Element }
type LayoutProps = {
    children: any
    front?: boolean
    seo: Partial<SEOProps>
    navPlaceholder?: boolean
    location: WindowLocation
    hideNavAndFooter?: boolean
}

export default ({
    children,
    front,
    seo,
    navPlaceholder = true,
    location,
    hideNavAndFooter = false,
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
                <div className="text-color-default relative min-h-screen">
                    {!hideNavAndFooter && (
                        <>
                            {/* Persistent Fixed Spooky Halloween Background Base Layer - Brightened & Vibrant */}
                            <div
                                className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url('/images/halloween-wall.jpg')`,
                                    filter: "brightness(1.36) contrast(1.04) saturate(1.15)",
                                }}
                            />
                            {/* Uniform Atmospheric Tint maintaining consistent vibrant brightness from top to bottom */}
                            <div
                                className="fixed inset-0 pointer-events-none z-0"
                                style={{
                                    backgroundColor: "rgba(14, 9, 22, 0.15)",
                                }}
                            />
                            <Navbar
                                front={front}
                                navPlaceholder={navPlaceholder}
                                location={location}
                                currentTheme={theme}
                                switchTheme={switchTheme}
                                themes={themes}
                                allowThemeSwitch={query.site.siteMetadata.switchTheme}
                            />
                        </>
                    )}
                    <div className="relative z-10">
                        {children}
                    </div>
                    {!hideNavAndFooter && (
                        <div className="relative z-10">
                            <Footer />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
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
