import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BasePagesQuery } from "./__generated__/BasePagesQuery"
import { Row, Col } from "../components/shortcodes/index"

export default function basePages({
    data,
    location,
}: PageProps<BasePagesQuery, {}>) {
    return (
        <Layout
            seo={{
                title: data.mdx.frontmatter.title,
                description: data.mdx.frontmatter.description,
                image: data.mdx.frontmatter.image?.publicURL,
            }}
            location={location}
        >
            <div className="md:px-4 mt-12 py-6 md:w-11/12 mx-auto">
                <div className="title py-8 text-center">
                    <h1 className="font-spooky spooky-headline text-4xl sm:text-6xl font-black">
                        {data.mdx.frontmatter.title}
                    </h1>
                </div>
                <div className="lg:w-3/4 md:w-11/12 sm:w-full mx-auto post-content text-lg relative z-10">
                    <MDXProvider components={{ Row, Col }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query BasePagesQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                title
                image {
                    publicURL
                }
                description
            }
        }
    }
`
