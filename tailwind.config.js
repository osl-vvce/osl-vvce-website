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
                "color-1": "#fed7aa",
                "color-2": "#fde68a",
                border: "#ff770040",
                primary: "#fb923c",
                medium: "#141418"
            },
            light: {
                bg: "#faf6ee",
                bgalt: "#f3ede2",
                "color-default": "#18121e",
                "color-1": "#d97706",
                "color-2": "#b45309",
                border: "#fed7aa",
                primary: "#d97706",
                medium: "#e5e7eb"
            },
        },
        colors: {
            bg: "#050505",
            bgalt: "#0a0a0c",
            "color-default": "#f3f4f6",
            "color-1": "#fed7aa",
            "color-2": "#fde68a",
            "color-3": "#9ca3af",
            primary: "#fb923c",
            secondary: "#f55555",
            link: "#fed7aa",
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


