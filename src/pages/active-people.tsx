import React, { useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

type Contribution = {
    date: string
    count: number
    level: number
}

type Member = {
    id: string
    fields: { slug: string }
    frontmatter: {
        fullname: string
        github?: string
        avatar?: { childImageSharp?: { fluid: any } }
    }
}

type Activity = {
    status: "ready" | "error"
    total: number
    contributions: Contribution[]
}

type ActivePeoplePageData = {
    allMdx: { edges: Array<{ node: Member }> }
}

const contributionColors = [
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39",
]

const getGitHubUsername = (url?: string) => {
    if (!url) return null

    const match = url.match(/github\.com\/([^/]+)/i)
    return match ? match[1] : null
}

export default function ActivePeople({
    data,
    location,
}: PageProps<ActivePeoplePageData>) {
    const [activityByMember, setActivityByMember] = useState<
        Record<string, Activity>
    >({})
    const members = data.allMdx.edges
        .map(edge => edge.node)
        .filter(member => getGitHubUsername(member.frontmatter.github))

    useEffect(() => {
        let isMounted = true

        members.forEach(async member => {
            const username = getGitHubUsername(member.frontmatter.github)

            try {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
                )

                if (!response.ok) throw new Error("Contribution data unavailable")

                const result = await response.json()
                const contributions: Contribution[] = result.contributions || []

                if (isMounted) {
                    setActivityByMember(current => ({
                        ...current,
                        [member.id]: {
                            status: "ready",
                            total: contributions.reduce(
                                (sum, day) => sum + day.count,
                                0
                            ),
                            contributions,
                        },
                    }))
                }
            } catch (_error) {
                if (isMounted) {
                    setActivityByMember(current => ({
                        ...current,
                        [member.id]: {
                            status: "error",
                            total: 0,
                            contributions: [],
                        },
                    }))
                }
            }
        })

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <Layout
            seo={{
                title: "Active People",
                description: "Open source contribution activity from OSL members.",
            }}
            location={location}
        >
            <main className="container mx-auto px-4 py-12">
                <header className="py-8 text-center">
                    <p className="text-primary font-bold uppercase">
                        OSL VVCE
                    </p>
                    <h1 className="text-color-1 font-black text-5xl mt-2">
                        Active People
                    </h1>
                    <p className="mt-4 text-lg">
                        A year of open source activity, one day at a time.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {members.map(member => {
                        const activity = activityByMember[member.id]
                        const contributions = activity?.contributions || []
                        const activeDays = contributions.filter(
                            day => day.count > 0
                        ).length
                        const firstDate = contributions[0]?.date
                        const leadingBlankDays = firstDate
                            ? new Date(`${firstDate}T00:00:00`).getDay()
                            : 0

                        return (
                            <article
                                className="border border-color-2 p-5"
                                key={member.id}
                            >
                                <div className="flex items-center mb-5">
                                    {member.frontmatter.avatar?.childImageSharp
                                        ?.fluid && (
                                        <Img
                                            fluid={
                                                member.frontmatter.avatar
                                                    .childImageSharp.fluid
                                            }
                                            alt={member.frontmatter.fullname}
                                            className="w-14 h-14 rounded-full mr-4"
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-color-1 font-bold text-xl">
                                            {member.frontmatter.fullname}
                                        </h2>
                                        <a
                                            href={member.frontmatter.github}
                                            className="text-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            @{getGitHubUsername(
                                                member.frontmatter.github
                                            )}
                                        </a>
                                    </div>
                                </div>

                                {activity?.status === "ready" ? (
                                    <>
                                        <div className="flex items-baseline mb-4">
                                            <strong className="text-2xl mr-2">
                                                {activity.total}
                                            </strong>
                                            <span>contributions in the past year</span>
                                            <span className="ml-auto text-sm">
                                                {activeDays} active days
                                            </span>
                                        </div>
                                        <div
                                            className="overflow-x-auto pb-2"
                                            aria-label={`${member.frontmatter.fullname}'s daily contributions over the past year`}
                                        >
                                            <div
                                                className="grid gap-1 w-max"
                                                style={{
                                                    gridAutoFlow: "column",
                                                    gridTemplateRows:
                                                        "repeat(7, 10px)",
                                                    gridAutoColumns: "10px",
                                                }}
                                            >
                                                {Array.from({
                                                    length: leadingBlankDays,
                                                }).map((_, index) => (
                                                    <span
                                                        key={`blank-${index}`}
                                                    />
                                                ))}
                                                {contributions.map(day => (
                                                    <span
                                                        key={day.date}
                                                        title={`${day.count} contributions on ${day.date}`}
                                                        className="rounded-sm"
                                                        style={{
                                                            backgroundColor:
                                                                contributionColors[
                                                                    Math.min(
                                                                        day.level,
                                                                        contributionColors.length -
                                                                            1
                                                                    )
                                                                ],
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : activity?.status === "error" ? (
                                    <p>Contribution data is unavailable.</p>
                                ) : (
                                    <p>Loading contribution activity...</p>
                                )}
                            </article>
                        )
                    })}
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query ActivePeopleQuery {
        allMdx(
            filter: { fields: { sourceName: { eq: "member" } } }
            sort: { order: ASC, fields: frontmatter___fullname }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        fullname
                        github
                        avatar {
                            childImageSharp {
                                fluid(maxWidth: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`