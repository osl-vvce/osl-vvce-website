import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"
import { CommentsQuery } from "./__generated__/CommentsQuery"
import { WindowLocation } from "@reach/router"
import { PumpkinIcon } from "./spooky-icons"
import { Sun, Moon } from "react-feather"

type CommentsProps = { title: string; location: WindowLocation<{}> | string }

const Comments: React.FC<CommentsProps> = ({ title, location }) => {
    const data = useStaticQuery<CommentsQuery>(graphql`
        query CommentsQuery {
            site {
                siteMetadata {
                    siteUrl
                    disqus
                }
            }
        }
    `)

    // Initialize contrast mode from localStorage or site theme
    const [highContrast, setHighContrast] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("comments_contrast")
            if (saved !== null) {
                return saved === "light"
            }
            const siteTheme = localStorage.getItem("theme")
            if (siteTheme === "0") return true
        }
        return false
    })

    const siteUrl = (data.site?.siteMetadata?.siteUrl || "https://osl.netlify.app").replace(/\/$/, "")
    const pathname = typeof location === "string" ? location : location?.pathname || ""
    const url = `${siteUrl}${pathname}`
    const identifier = title || pathname

    const disqusConfig = {
        url,
        identifier,
        title,
    }

    const noDisqusShortName = !data.site?.siteMetadata?.disqus

    const toggleContrast = () => {
        setHighContrast(prev => {
            const next = !prev
            if (typeof window !== "undefined") {
                localStorage.setItem("comments_contrast", next ? "light" : "dark")
            }
            return next
        })
    }

    if (noDisqusShortName) return null

    return (
        <section
            className="comments-spooky-card p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 transition-all duration-300"
            aria-label="Discussion and Comments"
        >
            {/* Header with Halloween Branding & Contrast Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-orange-500/25">
                <div className="flex items-center gap-3">
                    <PumpkinIcon className="w-6 h-6 text-orange-400 filter drop-shadow-[0_0_8px_#ff7700]" />
                    <h3 className="font-spooky spooky-headline text-2xl sm:text-3xl font-black flex items-center gap-2">
                        <span>Discussion & Comments</span>
                    </h3>
                </div>

                {/* High-Contrast Light / Obsidian Toggle */}
                <button
                    type="button"
                    onClick={toggleContrast}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border border-orange-500/40 text-orange-200 bg-black/40 hover:bg-orange-600/30 hover:text-white hover:border-orange-500/80 shadow-md cursor-pointer"
                    title={highContrast ? "Switch to Dark Obsidian Mode" : "Switch to Light Mode"}
                >
                    {highContrast ? (
                        <>
                            <Moon className="w-3.5 h-3.5 text-orange-300" />
                            <span>Dark Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun className="w-3.5 h-3.5 text-orange-300" />
                            <span>Light Theme</span>
                        </>
                    )}
                </button>
            </div>

            {/* Disqus Container with Explicit Color Scheme for 100% Legibility */}
            <div
                className={`disqus-wrapper p-4 sm:p-6 rounded-2xl transition-all duration-300 ${
                    highContrast ? "parchment-mode disqus-light-theme" : "obsidian-mode disqus-dark-theme"
                }`}
                style={{
                    backgroundColor: highContrast ? "#faf6ee" : "#0d0614",
                    color: highContrast ? "#18121e" : "#f3f4f6",
                    colorScheme: highContrast ? "light" : "dark",
                    border: highContrast ? "2px solid rgba(234, 88, 12, 0.6)" : "1px solid rgba(255, 140, 0, 0.25)",
                    boxShadow: highContrast ? "0 10px 25px rgba(0, 0, 0, 0.2)" : "inset 0 2px 10px rgba(0, 0, 0, 0.5)",
                    minHeight: "280px",
                }}
            >
                <div
                    key={`disqus-container-${highContrast ? "light" : "dark"}`}
                    style={{
                        color: highContrast ? "#18121e" : "#f3f4f6",
                        colorScheme: highContrast ? "light" : "dark",
                    }}
                >
                    <Disqus
                        key={`disqus-thread-${highContrast ? "light" : "dark"}`}
                        config={disqusConfig}
                    />
                </div>
            </div>
        </section>
    )
}

export default Comments
