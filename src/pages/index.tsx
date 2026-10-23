import React from "react"
import { graphql, PageProps } from "gatsby"

import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"

import ItemPortfolio from "../components/item-portfolio"
import ItemBlog from "../components/item-blog"
import { Description as ContactDescription } from "../components/contact"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"
import SpookyCard from "../components/spooky-card"

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
        <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-36 sm:pt-40 pb-20 overflow-hidden">
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
                {/* Spooky Headline */}
                <h1 className="font-spooky spooky-headline text-4xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-wide mb-6">
                    We Do Frightfully Awesome Things!
                </h1>

                {/* Subtitle */}
                <p
                    className="hero-spooky-subtitle font-spooky font-bold text-xl sm:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed tracking-wide"
                    style={{
                        color: "#ffeedb",
                        textShadow: "0 2px 10px rgba(0, 0, 0, 0.95), 0 0 20px rgba(255, 160, 20, 0.55)",
                    }}
                >
                    {data.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <ScrollIntoView selector="#portfolio">
                        <Button
                            title="EXPLORE THE COVEN OF CODE"
                            type="button"
                        />
                    </ScrollIntoView>
                </div>
            </div>
        </div>
    )
}

const About = ({ data }) => {
    return (
        <div className="boxed my-20">
            <SpookyCard className="text-center max-w-4xl mx-auto">
                <h2 className="font-spooky spooky-headline font-black text-3xl sm:text-4xl md:text-5xl mb-6">
                    ABOUT OSL VVCE
                </h2>
                <p className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium text-orange-100/90">
                    {data}
                </p>
            </SpookyCard>
        </div>
    )
}

const Blog = ({ children }) => {
    return (
        <div className="container mx-auto px-4 my-20" id="blog">
            <div className="text-center mb-12">
                <h2 className="font-spooky spooky-headline font-black text-4xl sm:text-5xl">
                    SPOOKY BLOGS & DISPATCHES
                </h2>
            </div>
            <div className="flex flex-wrap -mx-3">{children}</div>
        </div>
    )
}

const Contact = ({ data }) => {
    return (
        <div className="container mx-auto px-4 my-24">
            <div className="text-center mb-10">
                <h2 className="font-spooky spooky-headline font-black text-4xl sm:text-5xl">
                    GET IN TOUCH
                </h2>
            </div>
            <SpookyCard className="max-w-3xl mx-auto">
                <ContactDescription data={data} />
            </SpookyCard>
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
