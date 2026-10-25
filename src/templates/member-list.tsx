import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MemberItem from "../components/item-member"
import Pagination from "../components/pagination"

export default function memberList({ data, pageContext, location }) {
    const currentMemberItems = data.currentMembers.edges.map(item => (
        <MemberItem data={item.node} key={item.node.id} />
    ))

    const formerMemberItems = data.formerMembers.edges.map(item => (
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
                    <h1 className="font-spooky spooky-headline text-4xl sm:text-6xl font-black tracking-wider">
                        Current Members
                    </h1>
                </div>
                <div className="flex flex-wrap">{currentMemberItems}</div>
                
                <div className="title py-12 text-center mt-12">
                    <h2 className="font-spooky spooky-headline text-3xl sm:text-5xl font-black tracking-wider">
                        Former Members
                    </h2>
                </div>
                <div className="flex flex-wrap">{formerMemberItems}</div>
                <Pagination pageContext={pageContext} type="members" />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query MemberListQuery($skip: Int!, $limit: Int!) {
        currentMembers: allMdx(
            filter: { 
                fields: { sourceName: { eq: "member" } }
                frontmatter: { role: { in: ["Member", "Mentor", "Moderator"] } }
            }
            sort: { order: DESC, fields: [frontmatter___role] }
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
                        avatarStatic
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        formerMembers: allMdx(
            filter: { 
                fields: { sourceName: { eq: "member" } }
                frontmatter: { role: { eq: "Alumni" } }
            }
            sort: { order: DESC, fields: [frontmatter___batch] }
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
                        avatarStatic
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
