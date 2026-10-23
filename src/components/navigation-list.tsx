import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { NavigationListQuery } from "./__generated__/NavigationListQuery"
import { Theme } from "./layout"
import { PumpkinIcon } from "./spooky-icons"

type NavigationListProps = {
    name?: string
    className?: string
    liClassName?: string
    current?: string
    withThemeSwitch?: boolean
    currentTheme?: number
    switchTheme?: () => void
    themes?: Theme[]
    sidebarOpen?: boolean
    onItemClick?: () => void
}

const List: React.FC<NavigationListProps> = ({
    name,
    className = "",
    liClassName = "",
    current,
    withThemeSwitch = true,
    currentTheme,
    switchTheme,
    themes,
    sidebarOpen,
    onItemClick,
}) => {
    const data = useStaticQuery<NavigationListQuery>(graphql`
        query NavigationListQuery {
            site {
                siteMetadata {
                    navLinks {
                        name
                        url
                    }
                    darkmode
                    switchTheme
                }
            }
        }
    `)
    const items = data.site.siteMetadata.navLinks
    const isInteractive = name === "navbar" || name === "floating-nav"

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const itemRefs = useRef<(HTMLSpanElement | null)[]>([])
    const ulRef = useRef<HTMLUListElement>(null)

    // Determine active item based on current route
    const activeIndex = items.findIndex((e) => {
        if (!current || current === "") {
            return e.url === "/"
        }
        return `/${current}` === e.url || `/${current}/` === e.url
    })

    const targetIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : null)

    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: 0,
    })

    useEffect(() => {
        if (!isInteractive) return

        const updateIndicator = () => {
            if (targetIndex !== null && itemRefs.current[targetIndex] && ulRef.current) {
                const ul = ulRef.current
                const el = itemRefs.current[targetIndex]
                if (el) {
                    const ulRect = ul.getBoundingClientRect()
                    const elRect = el.getBoundingClientRect()
                    if (elRect.width > 0 && elRect.height > 0) {
                        setIndicatorStyle({
                            left: Math.round(elRect.left - ulRect.left - (ul.clientLeft || 0)),
                            top: Math.round(elRect.top - ulRect.top - (ul.clientTop || 0)),
                            width: Math.round(elRect.width),
                            height: Math.round(elRect.height),
                            opacity: 1,
                        })
                    }
                }
            } else {
                setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
            }
        }

        // Run immediately and across key frame intervals to account for drawer slide-in & webfont loads
        updateIndicator()
        const timer1 = setTimeout(updateIndicator, 50)
        const timer2 = setTimeout(updateIndicator, 180)
        const timer3 = setTimeout(updateIndicator, 350)
        const timer4 = setTimeout(updateIndicator, 520)
        window.addEventListener("resize", updateIndicator)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
            window.removeEventListener("resize", updateIndicator)
        }
    }, [targetIndex, name, items, isInteractive, sidebarOpen])

    const list = items.map((e, i) => (
        <ListItem
            key={`navigation-${name}-${i}`}
            ref={(el) => (itemRefs.current[i] = el)}
            data={e}
            active={`/${current}` === e.url || (current === "" && e.url === "/")}
            liClassName={liClassName}
            onMouseEnter={() => {
                if (isInteractive) setHoveredIndex(i)
            }}
            onMouseOver={() => {
                if (isInteractive) setHoveredIndex(i)
            }}
            onMouseMove={() => {
                if (isInteractive) setHoveredIndex(i)
            }}
            onItemClick={onItemClick}
        />
    ))

    if (withThemeSwitch) {
        const themeButtons = themes.map((item, i) => {
            const next = i !== themes.length - 1 ? i + 1 : 0
            return (
                <button
                    className={`text-color-2 transition-transform duration-200 transform top-0 left-0 ${
                        i === currentTheme ? "scale-100" : "scale-0 absolute"
                    }`}
                    title={`Switch to ${themes[next].label}`}
                    key={`${name}-theme-switch-btn-${item.name}`}
                    onClick={switchTheme}
                >
                    {item.icon}
                </button>
            )
        })
        list.push(
            <li
                className="theme-switcher"
                key={`${name}-theme-switcher relative`}
            >
                {themeButtons}
            </li>
        )
    }

    return (
        <ul
            ref={ulRef}
            className={`${className} relative`}
            onMouseLeave={() => {
                if (isInteractive) setHoveredIndex(null)
            }}
        >
            {/* Dynamic Sliding Orange Tab Indicator (Single smoothly gliding capsule tracking active/hover state) */}
            {isInteractive && indicatorStyle.opacity > 0 && (
                <div
                    className="nav-dynamic-indicator"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        top: `${indicatorStyle.top}px`,
                        width: `${indicatorStyle.width}px`,
                        height: `${indicatorStyle.height}px`,
                        opacity: indicatorStyle.opacity,
                    }}
                />
            )}
            {list}
        </ul>
    )
}

const ListItem = React.forwardRef<
    HTMLSpanElement,
    {
        data: any
        active: boolean
        liClassName: string
        onMouseEnter?: () => void
        onMouseOver?: () => void
        onMouseMove?: () => void
        onItemClick?: () => void
    }
>(({ data, active, liClassName, onMouseEnter, onMouseOver, onMouseMove, onItemClick }, ref) => {
    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseOver={onMouseOver}
            onMouseMove={onMouseMove}
            className={`${liClassName} ${active ? "active" : ""}`}
        >
            <span
                ref={ref}
                className="inline-block relative"
            >
                <Link
                    to={data.url}
                    title={data.name}
                    className="nav-item-link"
                    onClick={onItemClick}
                    onMouseEnter={onMouseEnter}
                    onMouseOver={onMouseOver}
                    onMouseMove={onMouseMove}
                >
                    {active && (
                        <PumpkinIcon className="w-3.5 h-3.5 mr-1.5 inline-block text-orange-400 animate-pulse filter drop-shadow-[0_0_6px_#ff7700]" />
                    )}
                    <span>{data.name}</span>
                </Link>
            </span>
        </li>
    )
})

export default List
