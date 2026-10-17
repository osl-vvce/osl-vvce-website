const plugin = require("tailwindcss/plugin")
const _ = require("lodash");

const gradient = plugin(function({ addUtilities, e, theme, variants }) {
    const gradients = theme("gradients", {})
    const gradientVariants = variants("gradients", [])

    const utilities = _.map(gradients, ([start, end], name) => ({
        [`.bg-gradient-${e(name)}`]: {
            backgroundImage: `linear-gradient(to right, ${start}, ${end})`,
        },
    }))

    addUtilities(utilities, gradientVariants)
})


module.exports = {
    purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
    theme: {
        gradients: theme => ({
            primary: [theme("colors.primary"), theme("colors.secondary")],
        }),
        themes: {
            dark: {
                bg: "#050505",
                bgalt: "#0a0a0c",
                "color-default": "#f3f4f6",
                "color-1": "#ff9500",
                "color-2": "#ffa726",
                border: "#ff770040",
                primary: "#ff7700",
                medium: "#141418"
            },
        },
        colors: {
            bg: "#050505",
            bgalt: "#0a0a0c",
            "color-default": "#f3f4f6",
            "color-1": "#ff9500",
            "color-2": "#ffa726",
            "color-3": "#9ca3af",
            primary: "#ff7700",
            secondary: "#f55555",
            link: "#ff9500",
            medium: "#18181b",
            white: "#fff",
            black: "#000",
            transparent: "rgba(0,0,0,0)",
            error: "#ef5350",
            success: "#8bc34a"
        },
        extend: {
            fontSize: {
                '7xl': '5rem'
            },
            spacing: {
                '1px': '1px',
                '2px': '2px'
            }
        },
    },
    variants: {},
    plugins: [require(`tailwind-theme-switcher`), gradient],
}


