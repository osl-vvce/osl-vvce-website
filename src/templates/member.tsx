import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

const ListItem = ({ data, url }) => {
    return (
        <li className="inline-block social-link mx-2">
            <a
                href={url}
                title={data.name}
                className="rounded-full inline-block transition-shadow duration-300 hover:shadow-2xl"
            >
                <img src={data.icon} alt={data.name} className="block w-10" />
            </a>
        </li>
    )
}

export default function member({ location, data }) {
    const url = [
        data.mdx.frontmatter.facebook,
        data.mdx.frontmatter.twitter,
        data.mdx.frontmatter.instagram,
        data.mdx.frontmatter.github,
        data.mdx.frontmatter.linkedin,
    ]
    return (
        <Layout
            seo={{
                title: data.mdx.frontmatter.fullname,
                description: data.mdx.frontmatter.about,
                image:
                    data.mdx.frontmatter.avatar?.publicURL ||
                    data.mdx.frontmatter.avatarStatic,
            }}
            location={location}
        >
            <div className="md:px-4 mt-12 py-6 md:w-1/3 mx-auto">
                <div className="mx-auto relative">
                    {/* Clean Floating Avatar Card */}
                    <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-3xl overflow-hidden border-2 border-orange-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(255,120,0,0.25)] bg-black/80 transition-all duration-300 transform hover:-translate-y-1 hover:border-orange-400">
                        {data.mdx.frontmatter.avatar?.childImageSharp?.fluid ? (
                            <Img
                                fluid={
                                    data.mdx.frontmatter.avatar.childImageSharp
                                        .fluid
                                }
                                className="w-full h-full"
                                style={{ height: "100%", width: "100%" }}
                                imgStyle={{
                                    objectFit: "cover",
                                    height: "100%",
                                    width: "100%",
                                }}
                            />
                        ) : data.mdx.frontmatter.avatar?.publicURL ? (
                            <img
                                className="w-full h-full object-cover"
                                src={data.mdx.frontmatter.avatar.publicURL}
                                alt={data.mdx.frontmatter.fullname}
                                style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
                            />
                        ) : data.mdx.frontmatter.avatarStatic ? (
                            <img
                                className="w-full h-full object-cover"
                                src={data.mdx.frontmatter.avatarStatic}
                                alt={data.mdx.frontmatter.fullname}
                                style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-orange-400/60 font-serif text-sm">
                                No avatar available
                            </div>
                        )}
                    </div>
                    <div className="relative w-full p-6 sm:p-8 box-border mx-auto blog-wall-content shadow-2xl mt-6">
                        <div className="p-2 sm:p-3 text-center">
                            <h1 className="text-3xl sm:text-5xl font-black font-spooky spooky-headline">
                                {data.mdx.frontmatter.fullname}
                            </h1>
                            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                                <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-400 uppercase">
                                    {data.mdx.frontmatter.role}
                                </span>
                                {data.mdx.frontmatter.batch && (
                                    <span className="text-orange-200/80 text-sm font-serif">
                                        • {data.mdx.frontmatter.batch}
                                    </span>
                                )}
                                {data.mdx.frontmatter.branch && (
                                    <span className="text-orange-200/80 text-sm font-serif">
                                        • {data.mdx.frontmatter.branch}
                                    </span>
                                )}
                            </div>
                            {data.mdx.frontmatter.tagline && (
                                <p className="mt-4 italic text-orange-200 text-base">
                                    "{data.mdx.frontmatter.tagline}"
                                </p>
                            )}
                            <p className="mt-4 text-orange-100/90 leading-relaxed font-medium text-left sm:text-center">
                                {data.mdx.frontmatter.about}
                            </p>
                            <ul className="mt-8 text-center">
                                {data.site.siteMetadata.social.map((e, i) => {
                                    if (url[i] !== null) {
                                        return (
                                            <ListItem
                                                key={
                                                    e.url +
                                                    "-" +
                                                    e.icon +
                                                    "-" +
                                                    i
                                                }
                                                data={e}
                                                url={url[i]}
                                            />
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query MemberQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                fullname
                tagline
                about
                batch
                role
                branch
                avatar {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 200) {
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                        id
                    }
                }
                avatarStatic
                facebook
                instagram
                github
                twitter
                linkedin
            }
        }
        site {
            siteMetadata {
                social {
                    name
                    icon
                }
            }
        }
    }
`
