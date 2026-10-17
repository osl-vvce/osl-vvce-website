import React, { useEffect, useRef, useState } from "react"
import { graphql, PageProps } from "gatsby"

import { ArrowRight } from "react-feather"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"

import ItemPortfolio from "../components/item-portfolio"
import ItemBlog from "../components/item-blog"
import { Description as ContactDescription } from "../components/contact"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"

export default ({ data, location }: PageProps<IndexPageQuery>) => {
    const siteData = data.site.siteMetadata

    const portfolioList = data.portfolio.edges.map((item, _) => (
        <ItemPortfolio
            data={item.node}
            key={`p-item-index-${item.node.id}`}
            even={(_ + 1) % 2 === 0}
        />
    ))

    const blogList = data.blog.edges.map((item) => (
        <ItemBlog data={item.node} key={`b-item-index-${item.node.id}`} />
    ))

    return (
        <Layout
            front={true}
            seo={{
                title: "Home",
                description: siteData.description,
            }}
            navPlaceholder={false}
            location={location}
        >
            <Wall data={siteData} />
            <TrickOrTreat />
            {siteData.about !== "" && <About data={siteData.about} />}
            <div className="px-4 lg:px-0" id="portfolio">
                {portfolioList}
            </div>
            <Blog>{blogList}</Blog>
            <Contact data={siteData.contact} />
        </Layout>
    )
}

const Wall = ({ data }) => {
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden">
            {/* Background image with eerie gradient overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: `url('${data.titleImage || "/images/halloween-wall.jpg"}')`,
                }}
            >
                <div className="absolute inset-0 spooky-hero-overlay"></div>
            </div>

            {/* Floating glowing ember sparks */}
            <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
                <span className="ember-particle" style={{ left: "10%", bottom: "10%", width: "6px", height: "6px", animationDelay: "0s" }}></span>
                <span className="ember-particle" style={{ left: "25%", bottom: "5%", width: "4px", height: "4px", animationDelay: "1.5s" }}></span>
                <span className="ember-particle" style={{ left: "45%", bottom: "15%", width: "8px", height: "8px", animationDelay: "0.7s" }}></span>
                <span className="ember-particle" style={{ left: "65%", bottom: "8%", width: "5px", height: "5px", animationDelay: "2.3s" }}></span>
                <span className="ember-particle" style={{ left: "80%", bottom: "12%", width: "7px", height: "7px", animationDelay: "1.1s" }}></span>
                <span className="ember-particle" style={{ left: "90%", bottom: "20%", width: "4px", height: "4px", animationDelay: "2.8s" }}></span>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center px-5 py-2 rounded-full spooky-badge text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-lg animate-flicker">
                    <span className="mr-2">🎃</span>
                    <span>SPOOKTACULAR OPEN SOURCE</span>
                    <span className="ml-2">🎃</span>
                </div>

                {/* Spooky Headline */}
                <h1 className="font-spooky spooky-headline text-4xl sm:text-6xl lg:text-7xl font-black text-glow-orange leading-tight tracking-wide mb-6">
                    UNLEASH THE SPOOKTACULAR CODE WITH OSL VVCE
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
                    {data.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <ScrollIntoView selector="#portfolio">
                        <Button
                            title="EXPLORE THE COVEN OF CODE"
                            type="button"
                            iconRight={<ArrowRight />}
                        />
                    </ScrollIntoView>
                    <ScrollIntoView selector="#trick-or-treat">
                        <button
                            type="button"
                            className="h-12 px-6 rounded-lg spooky-btn-outline font-bold tracking-wide inline-flex items-center"
                        >
                            <span className="mr-2">🍬</span> TRICK OR TREAT
                        </button>
                    </ScrollIntoView>
                </div>
            </div>

            {/* Themed Bento Navigation Grid */}
            <div className="relative z-10 w-full max-w-6xl mx-auto mt-16 px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                    {/* Projects Card */}
                    <ScrollIntoView selector="#portfolio" className="cursor-pointer">
                        <div className="spooky-card p-5 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full spooky-icon-box flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                {/* Witch Hat SVG */}
                                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L4 18h16L12 2zm0 0v8m-7 8c2.5-1 4.5-1 7-1s4.5 0 7 1H5z" />
                                </svg>
                            </div>
                            <h3 className="font-spooky text-orange-400 font-bold text-sm sm:text-base">PROJECTS</h3>
                            <p className="text-gray-400 text-xs mt-1">Hallowed Code</p>
                        </div>
                    </ScrollIntoView>

                    {/* Learning / Blog Card */}
                    <a href="/blog" className="block">
                        <div className="spooky-card p-5 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full spooky-icon-box flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                {/* Cobweb SVG */}
                                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m10-10H2m17.07-7.07L4.93 19.07m0-14.14L19.07 19.07M8 12a4 4 0 108 0 4 4 0 00-8 0z" />
                                </svg>
                            </div>
                            <h3 className="font-spooky text-orange-400 font-bold text-sm sm:text-base">LEARNING</h3>
                            <p className="text-gray-400 text-xs mt-1">Blogs & Guides</p>
                        </div>
                    </a>

                    {/* Events Card */}
                    <a href="/events" className="block">
                        <div className="spooky-card p-5 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full spooky-icon-box flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                {/* Cauldron SVG */}
                                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-14 0m14 0H5m14 0a3 3 0 003-3H2a3 3 0 003 3m5 7l-2 3m6-3l2 3M9 6a3 3 0 016 0" />
                                </svg>
                            </div>
                            <h3 className="font-spooky text-orange-400 font-bold text-sm sm:text-base">EVENTS</h3>
                            <p className="text-gray-400 text-xs mt-1">Hackathons</p>
                        </div>
                    </a>

                    {/* Members Card */}
                    <a href="/members" className="block">
                        <div className="spooky-card p-5 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full spooky-icon-box flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                {/* Ghost / Member SVG */}
                                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h.01M15 12h.01M12 2a7 7 0 00-7 7v9l3-2 3 2 3-2 3 2 3-2V9a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="font-spooky text-orange-400 font-bold text-sm sm:text-base">MEMBERS</h3>
                            <p className="text-gray-400 text-xs mt-1">The Coven</p>
                        </div>
                    </a>

                    {/* Logbook / Resources Card */}
                    <a href="/visitor-logbook" className="col-span-2 md:col-span-1 block">
                        <div className="spooky-card p-5 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full spooky-icon-box flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                                {/* Spellbook SVG */}
                                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="font-spooky text-orange-400 font-bold text-sm sm:text-base">RESOURCES</h3>
                            <p className="text-gray-400 text-xs mt-1">Visitor Logbook</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

const TrickOrTreat = () => {
    const tricks = [
        "A git push --force landed directly onto the master branch at 11:59 PM on a Friday! 😱",
        "Your code ran smoothly on localhost, but production said: 'undefined is not a function'!",
        "Someone committed 450MB of node_modules directly to the git repo! 🧟",
        "Merge conflict in 87 files 10 minutes before the hackathon submission deadline! ⚡",
        "SyntaxError: Unexpected token < in JSON at position 0 from an unexpected API failure! 💀",
    ]

    const treats = [
        "🍬 Pro Treat: Use 'git switch -c <branch>' instead of the legacy 'git checkout -b'!",
        "🍬 Pro Treat: Clean working state with 'git stash -u' preserves untracked files!",
        "🍬 Festive Perk: You've unlocked the OSL VVCE Spooky Contributor Aura! 🎃",
        "🍬 Hacktoberfest Secret: 4 quality PRs with clear commit messages beat 20 trivial ones!",
        "🍬 Command Trick: 'git commit --amend' lets you fix typos without a new messy commit!",
    ]

    const [message, setMessage] = useState<string | null>(null)
    const [actionType, setActionType] = useState<"trick" | "treat" | null>(null)
    const [trickCount, setTrickCount] = useState(13)
    const [treatCount, setTreatCount] = useState(42)

    const handleTrick = () => {
        const item = tricks[Math.floor(Math.random() * tricks.length)]
        setMessage(item)
        setActionType("trick")
        setTrickCount(prev => prev + 1)
    }

    const handleTreat = () => {
        const item = treats[Math.floor(Math.random() * treats.length)]
        setMessage(item)
        setActionType("treat")
        setTreatCount(prev => prev + 1)
    }

    return (
        <div id="trick-or-treat" className="max-w-4xl mx-auto my-20 px-4">
            <div className="spooky-card p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="inline-block px-4 py-1 rounded-full spooky-badge text-xs uppercase tracking-widest font-bold mb-3">
                    Interactive Mini-Game
                </div>
                <h3 className="font-spooky text-3xl sm:text-4xl font-bold text-orange-400 mb-2">
                    DEVELOPER TRICK OR TREAT
                </h3>
                <p className="text-gray-400 max-w-xl mx-auto mb-6 text-sm sm:text-base">
                    Dare to click? Test your developer fortune: reveal a spooky coding nightmare or claim a golden open-source treat!
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                    <button
                        type="button"
                        onClick={handleTrick}
                        className="h-12 px-6 rounded-xl spooky-trick-btn font-bold flex items-center gap-2 transform hover:scale-105 active:scale-95"
                    >
                        <span>💀</span> TRICK ({trickCount})
                    </button>
                    <button
                        type="button"
                        onClick={handleTreat}
                        className="h-12 px-6 rounded-xl spooky-treat-btn font-bold flex items-center gap-2 transform hover:scale-105 active:scale-95"
                    >
                        <span>🍬</span> TREAT ({treatCount})
                    </button>
                </div>

                {message && (
                    <div
                        className={`p-4 rounded-xl border max-w-2xl mx-auto transition-all duration-300 ${
                            actionType === "trick"
                                ? "spooky-trick-btn"
                                : "spooky-treat-btn"
                        }`}
                    >
                        <p className="text-sm sm:text-base font-semibold">{message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const About = ({ data }) => {
    return (
        <div className="boxed my-12">
            <div className="spooky-card p-8 sm:p-12 text-center">
                <div className="inline-block px-4 py-1 rounded-full spooky-badge text-xs uppercase tracking-widest font-bold mb-3">
                    Who We Are
                </div>
                <h2 className="font-spooky text-color-1 font-black text-4xl sm:text-5xl text-glow-orange mb-6">
                    ABOUT OSL VVCE
                </h2>
                <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
                    {data}
                </p>
            </div>
        </div>
    )
}

const Blog = ({ children }) => {
    return (
        <div className="container mx-auto px-4 my-16" id="blog">
            <div className="text-center mb-10">
                <div className="inline-block px-4 py-1 rounded-full spooky-badge text-xs uppercase tracking-widest font-bold mb-3">
                    Knowledge Grimoire
                </div>
                <h2 className="font-spooky text-color-1 font-black text-4xl sm:text-5xl text-glow-orange">
                    SPOOKY BLOGS & DISPATCHES
                </h2>
            </div>
            <div className="flex flex-wrap -mx-3">{children}</div>
        </div>
    )
}

const Contact = ({ data }) => {
    return (
        <div className="container mx-auto px-4 my-20">
            <div className="text-center mb-8">
                <div className="inline-block px-4 py-1 rounded-full spooky-badge text-xs uppercase tracking-widest font-bold mb-3">
                    Summon Us
                </div>
                <h2 className="font-spooky text-color-1 font-black text-4xl sm:text-5xl text-glow-orange">
                    GET IN TOUCH
                </h2>
            </div>
            <div className="max-w-3xl mx-auto spooky-card p-8 sm:p-10">
                <ContactDescription data={data} />
            </div>
        </div>
    )
}

export const query = graphql`
    query IndexPageQuery {
        site: site {
            siteMetadata {
                title
                description
                capitalizeTitleOnHome
                titleImage
                ogImage
                twoColumnWall
                introTag
                description
                about
                contact {
                    description
                    mail
                    address
                }
                social {
                    name
                    url
                    icon
                }
            }
        }
        portfolio: allMdx(
            filter: { fields: { sourceName: { eq: "portfolio" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        blog: allMdx(
            filter: { fields: { sourceName: { eq: "blog" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM YYYY")
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
