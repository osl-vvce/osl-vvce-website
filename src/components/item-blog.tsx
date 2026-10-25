import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { Calendar } from "react-feather"
import { BlogListQuery_allMdx_edges_node } from "../templates/__generated__/BlogListQuery"
import { IndexPageQuery_blog_edges_node } from "../pages/__generated__/IndexPageQuery"

type ItemBlogProps = BlogListQuery_allMdx_edges_node | IndexPageQuery_blog_edges_node
export const ItemBlog: React.FC<{ data: ItemBlogProps }> = ({ data }) => {
    const [focused, changeFocused] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 7.5;
        const rotateY = ((x - centerX) / centerX) * 7.5;
        const mouseX = (x / rect.width) * 100;
        const mouseY = (y / rect.height) * 100;

        card.style.setProperty("--mouse-x", `${mouseX.toFixed(1)}%`);
        card.style.setProperty("--mouse-y", `${mouseY.toFixed(1)}%`);
        card.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--rotate-y", `${rotateY.toFixed(2)}deg`);
        card.style.setProperty("--tilt-opacity", "1");
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty("--rotate-x", "0deg");
        card.style.setProperty("--rotate-y", "0deg");
        card.style.setProperty("--tilt-opacity", "0");
    };

    return (
        <div className="blog-item w-full md:w-1/2 lg:w-1/3 p-3 sm:p-4">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`spooky-modern-card interactive-spooky-card group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${focused ? 'focused' : ''}`}
            >
                {/* Dynamic Cursor Spotlight Overlay */}
                <div className="card-dynamic-spotlight" />

                <Link
                    to={data.fields.slug}
                    title={data.frontmatter.title}
                    onFocus={() => changeFocused(true)}
                    onBlur={() => changeFocused(false)}
                    className="flex flex-col h-full !no-underline"
                    style={{ textDecoration: "none" }}
                >
                    {/* Header Image Banner with smooth zoom */}
                    <div className="h-52 w-full overflow-hidden relative bg-black/50">
                        <Img
                            fluid={data.frontmatter.image.childImageSharp.fluid}
                            alt={data.frontmatter.title}
                            className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            style={{ height: "100%", width: "100%" }}
                            imgStyle={{ objectFit: "cover" }}
                        />
                        {/* Gradient shade transitioning image into card body */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,8,22,0.95)] via-transparent to-transparent pointer-events-none" />
                        {/* Subtle specular glint */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between relative z-10 !no-underline">
                        <div>
                            <div className="flex items-center text-orange-400 text-xs sm:text-sm mb-2.5 font-medium !no-underline">
                                <Calendar className="w-4 h-4 mr-2 stroke-current text-orange-400/90" />
                                <span className="!no-underline">{data.frontmatter.date}</span>
                            </div>
                            <h4 className="font-spooky text-xl sm:text-2xl font-bold text-orange-400 group-hover:text-orange-300 group-hover:text-glow-orange transition-all duration-300 mb-3 leading-snug line-clamp-2 !no-underline">
                                {data.frontmatter.title}
                            </h4>
                            <p className="text-orange-100/75 text-sm leading-relaxed line-clamp-3 mb-4 !no-underline">
                                {data.frontmatter.description}
                            </p>
                        </div>
                        <div className="pt-3 border-t border-orange-500/20 flex items-center text-orange-400 text-sm font-semibold group-hover:text-orange-300 transition-colors !no-underline">
                            <span className="!no-underline">Read Dispatch</span>
                            <span className="ml-1.5 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ItemBlog;