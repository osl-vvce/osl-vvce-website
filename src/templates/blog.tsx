import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { Calendar } from "react-feather"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Row, Col } from "../components/shortcodes/index"

import Comments from "../components/comments"
import { BlogQuery } from "./__generated__/BlogQuery"

export default function blog({ location, data }: PageProps<BlogQuery, {}>) {
    return (
        <Layout
            seo={{
                title: data.mdx.frontmatter.title,
                description: data.mdx.frontmatter.description,
                image: data.mdx.frontmatter.banner.publicURL,
            }}
            location={location}
        >
            <div className="md:px-4 mt-12 py-6 md:w-11/12 mx-auto">
                <div className="mx-auto relative">
                    <Img
                        fluid={
                            data.mdx.frontmatter.banner.childImageSharp.fluid
                        }
                        className="rounded-2xl overflow-hidden shadow-2xl"
                    />
                    <div className="relative w-full lg:w-3/4 md:w-11/12 sm:w-full p-6 sm:p-8 box-border mx-auto blog-wall-content shadow-2xl md:-mt-16 z-10">
                        <div className="p-2 sm:p-3">
                            <h1 className="text-3xl sm:text-5xl font-black font-spooky spooky-headline">
                                {data.mdx.frontmatter.title}
                            </h1>
                            <p className="mt-2 flex items-center text-orange-300 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />{" "}
                                <span>
                                    {data.mdx.frontmatter.date}
                                </span>
                            </p>
                            <p className="mt-3 text-orange-100/90 leading-relaxed font-medium">
                                {data.mdx.frontmatter.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="lg:w-3/4 md:w-11/12 sm:w-full mx-auto post-content text-lg relative z-10"
                    id="mdx"
                >
                    <MDXProvider components={{ Row, Col }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
                <div className="comments lg:w-3/4 md:w-11/12 sm:w-full mx-auto mt-8 mb-16 relative z-10">
                    <Comments
                        title={data.mdx.frontmatter.title}
                        location={location}
                    />
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query BlogQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                title
                date(formatString: "DD MMMM YYYY")
                description
                banner {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 1920) {
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                        id
                    }
                }
            }
        }
    }
`
