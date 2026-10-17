import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Logo } from "./utils"
import Navlinks from "./navigation-list"
import { FooterLinksQuery, FooterLinksQuery_site_siteMetadata_footerLinks } from "./__generated__/FooterLinksQuery"


export default function() {
    const query = useStaticQuery<FooterLinksQuery>(graphql`
        query FooterLinksQuery {
            site {
                siteMetadata {
                    title
                    footerLinks {
                        name
                        url
                    }
                }
            }
        }
    `)

    const footerLinks = query.site.siteMetadata.footerLinks.map((item, _) => (
        <ListItem data={item} key={`footer-n-l-${_}`} />
    ))

    return (
        <footer className="footer bg-black py-16 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255, 119, 0, 0.2)" }}>
            {/* Ambient orange glow line at top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 119, 0, 0.6), transparent)" }}></div>
            <div className="container mx-auto text-center px-4">
                <div className="flex justify-center my-3 mb-4">
                    <Link to="/" title={query.site.siteMetadata.title} className="logo-glow-wrapper">
                        <Logo className="w-14"/>
                    </Link>
                </div>
                <div className="font-spooky text-orange-400 font-bold tracking-wider text-base sm:text-lg mb-4">
                    🎃 OSL VVCE — HALLOWED OPEN SOURCE 🎃
                </div>
                <div className="text-orange-300 my-4 footer-links animated-link-parent">
                    <Navlinks className="flex items-center justify-center flex-wrap gap-2" withThemeSwitch={false}/>
                </div>
                <div className="text-gray-400 my-4">
                    <ul>
                    {footerLinks} 
                    </ul>
                </div>
                <p className="text-gray-400 text-sm mt-6">
                    Copyright &copy; {query.site.siteMetadata.title}{" "}
                    {new Date().getFullYear()} • Crafted with Spooky Passion 🦇
                </p>
            </div>
        </footer>
    )
}

const ListItem: React.FC<{ data: FooterLinksQuery_site_siteMetadata_footerLinks }> = ({ data }) => {
    return (
        <li className="inline-block mx-3 animated-link-parent">
            <Link to={data.url} title={data.name}>
                <span>{data.name}</span>
            </Link>
        </li>
    )
}
