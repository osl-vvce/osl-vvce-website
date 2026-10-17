import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { Calendar } from "react-feather"
import { BlogListQuery_allMdx_edges_node } from "../templates/__generated__/BlogListQuery"
import { IndexPageQuery_blog_edges_node } from "../pages/__generated__/IndexPageQuery"

type ItemBlogProps = BlogListQuery_allMdx_edges_node | IndexPageQuery_blog_edges_node
export const ItemBlog: React.FC<{ data: ItemBlogProps}> = ({ data }) => {

    const [focused, changeFocused] = useState(false);

    return (
        <div className="blog-item w-full md:w-1/2 lg:w-1/3 p-3 sm:p-4">
            <div className={`spooky-card h-full flex flex-col group ${focused ? 'focused border-orange-500' : ''}`}>
                <Link
                    to={data.fields.slug}
                    title={data.frontmatter.title}
                    onFocus={() => changeFocused(true)}
                    onBlur={() => changeFocused(false)}
                    className="flex flex-col h-full"
                >
                    <div className="image overflow-hidden relative">
                        <Img
                            fluid={data.frontmatter.image.childImageSharp.fluid}
                            alt={data.frontmatter.title}
                            className="w-full transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 spooky-badge text-xs px-2 py-1 rounded-full font-bold">
                            📜 Grimoire
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center text-orange-400 text-xs sm:text-sm mb-2 font-medium">
                                <Calendar className="w-4 h-4 mr-2 stroke-current"/>
                                <span>{data.frontmatter.date}</span>
                            </div>
                            <h4 className="font-spooky text-xl sm:text-2xl font-bold text-orange-400 mb-2 leading-snug">
                                {data.frontmatter.title}
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {data.frontmatter.description}
                            </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-800 flex items-center text-orange-400 text-sm font-semibold">
                            <span>Read Dispatch</span>
                            <span className="ml-1">→</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ItemBlog;