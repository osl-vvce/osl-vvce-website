import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MemberItem from "../components/item-member"
import Pagination from "../components/pagination"

export default function memberList({ data, pageContext, location }) {
    const memberItems = data.allMdx.edges.map(item => (
        <MemberItem data={item.node} key={item.node.id} />
    ))

    return (
        <Layout
            seo={{
                title: "Members",
            }}
            location={location}
        >
            <div className="container mx-auto py-12">
                <div className="title py-12 text-center">
                    <h2 className="font-black text-5xl text-color-1">
                        Alumini
                    </h2>
                </div>
                <div className="flex flex-wrap">{memberItems}</div>
                <Pagination pageContext={pageContext} type="members" />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query MemberListQuery($skip: Int!, $limit: Int!) {
        allMdx(
            filter: { fields: { sourceName: { eq: "member" } } }
            sort: { order: DESC, fields: frontmatter___role }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        fullname
                        role
                        avatar {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    srcSet
                                    ...GatsbyImageSharpFluid
                                }
                                id
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
