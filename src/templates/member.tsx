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
                    {data.mdx.frontmatter.avatar?.childImageSharp?.fluid ? (
                        <Img
                            className="rounded"
                            fluid={
                                data.mdx.frontmatter.avatar.childImageSharp.fluid
                            }
                        />
                    ) : data.mdx.frontmatter.avatar?.publicURL ? (
                        <img
                            className="rounded w-full"
                            src={data.mdx.frontmatter.avatar.publicURL}
                            alt={data.mdx.frontmatter.fullname}
                        />
                    ) : data.mdx.frontmatter.avatarStatic ? (
                        <img
                            className="rounded w-full"
                            src={data.mdx.frontmatter.avatarStatic}
                            alt={data.mdx.frontmatter.fullname}
                        />
                    ) : (
                        <div className="rounded w-full h-64 bg-gray-200 flex items-center justify-center text-color-3">
                            No avatar available
                        </div>
                    )}
                    <div className="relative w-full lg:w-3/4 md:w-11/12 sm:w-full p-6 box-border lg:box-content mx-auto bg-bg text-color-default blog-wall-content shadow-xl md:-mt-16 ">
                        <div className="p-3">
                            <h1 className="text-5xl font-bold text-primary text-center">
                                {data.mdx.frontmatter.fullname}
                            </h1>
                            <h2 className="mt-1 text-center">
                                <span className="ml-2">
                                    {data.mdx.frontmatter.role}
                                </span>
                                <span className="ml-4">
                                    {data.mdx.frontmatter.batch}
                                </span>
                                <span className="ml-4">
                                    {data.mdx.frontmatter.branch}
                                </span>
                            </h2>
                            <p className="mt-3">
                                {"— "}
                                {data.mdx.frontmatter.tagline}
                            </p>
                            <p className="mt-3">{data.mdx.frontmatter.about}</p>
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
