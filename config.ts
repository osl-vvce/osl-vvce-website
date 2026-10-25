const siteMetadata = {
    title: `OSL VVCE`,
    siteUrl: `https://osl.netlify.app`,
    capitalizeTitleOnHome: true,
    logo: `/images/logo.webp`,
    icon: `/images/icon.png`,
    titleImage: `/images/halloween-wall.jpg`,
    ogImage: `/images/halloween-wall.jpg`,
    twoColumnWall: false,
    introTag: `Unleash The Spooktacular Code`,
    description: `OSL is a community of passionate college students, who have come together for the cause of promoting and contributing to Free and Open Source.`,
    about:
        "OSL, a student-run community with over 20+ members from Vidyavardhaka College of Engineering, Mysuru, over the last 2 years, has helped 100+ passionate students to transform into successful & innovative engineers who today work across the world in Fortune 500 Companies loving what they do.",
    author: `@osl_vvce`,
    blogItemsPerPage: 10,
    eventItemsPerPage: 10,
    memberItemsPerPage: 20,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
        {
            name: "ABOUT",
            url: "/about",
        },
        {
            name: "BLOG",
            url: "/blog",
        },
        {
            name: "EVENTS",
            url: "/events",
        },
        {
            name: "MEMBERS",
            url: "/members",
        },
        {
            name: "LOGBOOK",
            url: "/visitor-logbook",
        },
        {
            name: "SUGGESTIONS",
            url: "/suggestions",
        },
    ],
    footerLinks: [
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy",
        },
        {
            name: "GitHub",
            url: "https://github.com/osl-vvce",
        },
    ],
    social: [
        {
            name: "Instagram",
            icon: "/images/instagram.svg",
            url: "https://www.instagram.com/osl.vvce",
        },
        {
            name: "Github",
            icon: "/images/github.svg",
            url: "https://github.com/osl-vvce",
        },
        {
            name: "LinkedIn",
            icon: "/images/linkedin.svg",
            url: "https://www.linkedin.com/company/osl-vvce",
        },
    ],
    aboutUs: {
        main: "/images/about/cloud-computing.png",
        about1: "/images/about/team-meeting.svg",
        about2: "/images/about/support-team.svg",
        about3: "/images/about/office-best-achiever.svg",
        member1: "/images/about/madhurish.jpg",
        member2: "/images/about/harsha.jpg",
        member3: "/images/about/pavan.jpg",
        member4: "/images/about/darshan.jpg",
        member5: "/images/about/rahul.png",
    },
    contact: {
        api_url: "https://getform.io/f/93b1c53f-0be8-4aa2-ae7c-e16f073c9fc6",
        description: `Hey! Looking for a way to get to us? Contact us using any of the links shared below or just drop by at our place!`,
        mail: "osl@vvce.ac.in",
        address: "VVCE Mysore- 570002",
    },
    disqus: "osl-netlify-app",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
