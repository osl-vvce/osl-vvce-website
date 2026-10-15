
import React from "react"
import { graphql, PageProps } from "gatsby"
import { ArrowRight, Code, Users, BookOpen, GitBranch } from "react-feather"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"
import ItemPortfolio from "../components/item-portfolio"
import ItemBlog from "../components/item-blog"
import {
    Form,
    Description as ContactDescription,
} from "../components/contact"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"

export default ({ data, location }: PageProps<IndexPageQuery>) => {
    const siteData = data.site.siteMetadata

    const portfolioList = data.portfolio.edges.map((item, index) => (
        <ItemPortfolio
            data={item.node}
            key={`p-item-index-${item.node.id}`}
            even={(index + 1) % 2 === 0}
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
            <main className="osl-home">
                <Wall data={siteData} />

                <section className="osl-community" aria-label="Our community">
                    <div className="osl-container osl-community-grid">
                        <div className="osl-community-item">
                            <span className="osl-icon">
                                <Code size={22} aria-hidden="true" />
                            </span>
                            <div>
                                <h3>Build together</h3>
                                <p>Learn by building real projects.</p>
                            </div>
                        </div>

                        <div className="osl-community-item">
                            <span className="osl-icon">
                                <Users size={22} aria-hidden="true" />
                            </span>
                            <div>
                                <h3>Find your people</h3>
                                <p>Connect with a community of learners.</p>
                            </div>
                        </div>

                        <div className="osl-community-item">
                            <span className="osl-icon">
                                <GitBranch size={22} aria-hidden="true" />
                            </span>
                            <div>
                                <h3>Contribute openly</h3>
                                <p>Make a difference through open source.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {siteData.about !== "" && (
                    <About data={siteData.about} />
                )}

                <section
                    className="osl-section osl-projects"
                    id="portfolio"
                    aria-labelledby="osl-projects-title"
                >
                    <div className="osl-container">
                        <SectionHeading
                            eyebrow="MAKE SOMETHING MEANINGFUL"
                            title="Ideas into projects."
                            description="Explore the work, experiments, and creations coming from our community."
                            id="osl-projects-title"
                        />

                        <div className="osl-project-list">
                            {portfolioList}
                        </div>
                    </div>
                </section>

                <Blog>{blogList}</Blog>

                <Contact data={siteData.contact} />
            </main>
        </Layout>
    )
}

const Wall = ({ data }) => {
    const twoColumnWall = data.twoColumnWall

    

    return (
        <section
            className={`osl-hero ${
                twoColumnWall ? "osl-hero-with-image" : ""
            }`}
           
            aria-labelledby="osl-hero-title"
        >
            <div className="osl-hero-glow osl-hero-glow-one" aria-hidden="true" />
            <div className="osl-hero-glow osl-hero-glow-two" aria-hidden="true" />

            <div className="osl-container osl-hero-inner">
                <div className="osl-hero-copy">
                    <div className="osl-eyebrow">
                        <span className="osl-eyebrow-dot" />
                        OPEN SOURCE • VVCE
                    </div>

                    <h1 id="osl-hero-title">
                        Learn openly.
                        <br />
                        <span className="osl-gradient-text">
                            Build together.
                        </span>
                    </h1>

                    <p className="osl-hero-intro">
                        {data.introTag || data.description}
                    </p>

                    {data.introTag && data.description && (
                        <p className="osl-hero-description">
                            {data.description}
                        </p>
                    )}

                    <div className="osl-hero-actions">
                        <ScrollIntoView selector="#portfolio">
                            <Button
                                title="Explore projects"
                                type="button"
                                iconRight={<ArrowRight size={18} />}
                            />
                        </ScrollIntoView>

                        <a className="osl-secondary-button" href="#about">
                            Discover OSL
                            <ArrowRight size={16} aria-hidden="true" />
                        </a>
                    </div>

                    <div className="osl-hero-note">
                        <span className="osl-note-line" />
                        A community where curiosity becomes contribution.
                    </div>
                </div>

                <div className="osl-hero-visual" aria-hidden="true">
                    <div className="osl-orbit osl-orbit-one" />
                    <div className="osl-orbit osl-orbit-two" />

                    <div className="osl-code-card">
                        <div className="osl-code-card-top">
                            <div className="osl-window-dots">
                                <span />
                                <span />
                                <span />
                            </div>
                            <span>community.ts</span>
                        </div>

                        <div className="osl-code-content">
                            <p>
                                <span className="osl-code-purple">const</span>{" "}
                                community = {"{"}
                            </p>
                            <p className="osl-code-indent">
                                <span className="osl-code-orange">learn</span>:{" "}
                                <span className="osl-code-green">"together"</span>,
                            </p>
                            <p className="osl-code-indent">
                                <span className="osl-code-orange">build</span>:{" "}
                                <span className="osl-code-green">"in public"</span>,
                            </p>
                            <p className="osl-code-indent">
                                <span className="osl-code-orange">share</span>:{" "}
                                <span className="osl-code-green">"knowledge"</span>,
                            </p>
                            <p>{"}"}</p>
                            <div className="osl-code-status">
                                <span /> Open to everyone
                            </div>
                        </div>
                    </div>

                    <div className="osl-floating-label osl-floating-top">
                        <GitBranch size={15} />
                        Open source
                    </div>

                    <div className="osl-floating-label osl-floating-bottom">
                        <Users size={15} />
                        Made by the community
                    </div>
                </div>
            </div>

            <div className="osl-hero-bottom-line" aria-hidden="true" />
        </section>
    )
}

const SectionHeading = ({ eyebrow, title, description, id }) => (
    <div className="osl-section-heading">
        <p className="osl-section-eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {description && <p className="osl-section-description">{description}</p>}
    </div>
)

const About = ({ data }) => (
    <section
        className="osl-section osl-about"
        id="about"
        aria-labelledby="osl-about-title"
    >
        <div className="osl-container osl-about-grid">
            <div className="osl-about-heading">
                <p className="osl-section-eyebrow">WHO WE ARE</p>
                <h2 id="osl-about-title">
                    More than code.
                    <br />
                    <span className="osl-gradient-text">
                        A community.
                    </span>
                </h2>
            </div>

            <div className="osl-about-copy">
                <p>{data}</p>
                <a className="osl-text-link" href="#contact">
                    Connect with us
                    <ArrowRight size={16} aria-hidden="true" />
                </a>
            </div>
        </div>
    </section>
)

const Blog = ({ children }) => (
    <section
        className="osl-section osl-blog"
        id="blog"
        aria-labelledby="osl-blog-title"
    >
        <div className="osl-container">
            <SectionHeading
                eyebrow="NOTES FROM THE COMMUNITY"
                title="Ideas worth sharing."
                description="Stories, tutorials, updates, and lessons from our open-source journey."
                id="osl-blog-title"
            />

            <div className="osl-blog-list">{children}</div>
        </div>
    </section>
)

const Contact = ({ data }) => {
    const hasContactForm = Boolean(data.api_url)

    return (
        <section
            className="osl-section osl-contact"
            id="contact"
            aria-labelledby="osl-contact-title"
        >
            <div className="osl-container">
                <SectionHeading
                    eyebrow="START A CONVERSATION"
                    title="Good things start with hello."
                    description="Have an idea, a question, or want to get involved? We'd love to hear from you."
                    id="osl-contact-title"
                />

                <div className="osl-contact-grid">
                    {hasContactForm && (
                        <div className="osl-contact-form">
                            <Form api={data.api_url} />
                        </div>
                    )}

                    <div
                        className={`osl-contact-description ${
                            hasContactForm ? "" : "osl-contact-centered"
                        }`}
                    >
                        <ContactDescription data={data} />
                    </div>
                </div>
            </div>
        </section>
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
                    api_url
                    description
                    mail
                    phone
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

