import React from "react"
import Layout from "../components/layout"
import { PageProps, Link } from "gatsby"
import HalloweenBannerButton from "../components/halloween-banner-button"

export default ({ location }: PageProps<{}, {}>) => {
    return (
        <Layout
            seo={{
                title: "404 - Booops! Page Not Found",
                description: "Booops! The page you are looking for has vanished into the dark shadows.",
            }}
            location={location}
            hideNavAndFooter={true}
        >
            <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-50 flex items-center justify-center select-none">
                {/* Full-Screen 404 Halloween Artwork */}
                <img
                    src="/images/404-halloween.jpg"
                    alt="404 Booops! Page not found"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />

                {/* Atmospheric Dark Bottom Vignette to Frame the Lower Base */}
                <div
                    className="absolute pointer-events-none z-10"
                    style={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 45%, transparent 100%)",
                    }}
                />

                {/* Halloween Themed Return Button */}
                <div
                    className="absolute z-20 w-max text-center"
                    style={{
                        bottom: "90px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        maxWidth: "92vw",
                    }}
                >
                    <HalloweenBannerButton
                        to="/"
                        title="Return to OSL Realm"
                        label="Return to OSL Realm"
                    />
                </div>
            </div>
        </Layout>
    )
}


