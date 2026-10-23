import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data, location }) => {
    const aboutData = data.site.siteMetadata.aboutUs
    return (
        <Layout
            seo={{
                title: "About",
            }}
            location={location}
        >
            <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8">
                <div className="title py-6 text-center">
                    <h1 className="font-spooky spooky-headline text-4xl sm:text-6xl font-black">
                        About
                    </h1>
                </div>

                {/* Section 1: Introduction */}
                <div className="spooky-liquid-card p-6 sm:p-10 my-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={aboutData.main} alt="About OSL" className="rounded-2xl max-h-80 object-contain filter drop-shadow-xl" />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <p className="text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                OSL, a student-run community with over 20+ members
                                from Vidyavardhaka College of Engineering, Mysuru,
                                over the last 2 years, has helped 100+ passionate
                                students to transform into successful & innovative
                                engineers who today work across the world in Fortune
                                500 Companies loving what they do.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Who We Are */}
                <div className="spooky-liquid-card p-6 sm:p-10 my-8 shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="font-spooky spooky-headline text-3xl sm:text-4xl font-bold">
                            Who We Are
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={aboutData.about1} alt="Who We Are" className="rounded-2xl max-h-80 object-contain filter drop-shadow-xl" />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <p className="mb-4 text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                Open Source Lab (also known as OSL) is a community
                                of passionate college students, who have come
                                together for the cause of promoting and contributing
                                to Free and Open Source. The club envisions to make
                                its members competent to become the leaders of the
                                future with excellence in technical, creative, and
                                intrapersonal skills.
                            </p>
                            <p className="text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                Founded in 2017, the club over the years has been
                                renowned as one of the leading student clubs in
                                India, with about 500 active members. It has so far
                                produced a GSoCer, and multiple Grand Finalist teams
                                in SIH. The club is run by the students themselves,
                                with the help of research scholars, alumni, and
                                faculties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3: What We Do */}
                <div className="spooky-liquid-card p-6 sm:p-10 my-8 shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="font-spooky spooky-headline text-3xl sm:text-4xl font-bold">
                            What We Do
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={aboutData.about2} alt="What We Do" className="rounded-2xl max-h-80 object-contain filter drop-shadow-xl" />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <p className="mb-4 text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                The club operates by the principle of mentorship and
                                family, where the senior members of the club
                                individually mentor the juniors. The members
                                contribute to Open Source projects of their own
                                interests and also conduct workshops and technical
                                fests to encourage others to work on open source
                                technologies.
                            </p>
                            <p className="text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                The club has specialised teams internally such as
                                one focused on Android, Blockchain, IoT, etc. We
                                believe in the holistic development of its members,
                                and the members besides seeking excellence in
                                technical skills, also engage in talks, debates,
                                sports, cultural activities, yoga sessions etc.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 4: What We Have Achieved */}
                <div className="spooky-liquid-card p-6 sm:p-10 my-8 shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="font-spooky spooky-headline text-3xl sm:text-4xl font-bold">
                            What We Have Achieved
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={aboutData.about3} alt="Achievements" className="rounded-2xl max-h-80 object-contain filter drop-shadow-xl" />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <p className="mb-4 text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                The club has become one of the forerunners in
                                promoting, and contributing to open source in the
                                country, introducing over a hundred enthusiasts
                                every year to the world of Open source through the
                                various activities it conducts.
                            </p>
                            <p className="text-base sm:text-lg leading-relaxed text-orange-100 font-medium">
                                The club has produced 12 teams who have made it
                                through SIH Grand Finale over the last 3 years. The
                                members have been actively taking part in
                                international conferences, meetups, hackathons, as
                                well as delivering talks and presenting projects at
                                various events. Majority of the club alumni have
                                been placed in core computer science companies, not
                                to mention its active members also get selected for
                                summer schools at global universities, and paid
                                internships at top companies.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 5: Founders */}
                <div className="my-16">
                    <div className="text-center mb-10">
                        <h2 className="font-spooky spooky-headline text-3xl sm:text-5xl font-black tracking-wider">
                            FOUNDERS
                        </h2>
                    </div>

                    {/* Top Row: 3 Founders */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto">
                        {[
                            { name: "Madhurish", image: "/images/about/madhurish.jpg" },
                            { name: "Harsha", image: "/images/about/harsha.jpg" },
                            { name: "Pavan", image: "/images/about/pavan.jpg" },
                        ].map(founder => (
                            <div
                                key={founder.name}
                                className="spooky-liquid-card p-6 rounded-3xl text-center flex flex-col items-center justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(255,120,0,0.3)] group"
                            >
                                <div
                                    className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden mx-auto mb-4 shadow-xl transition-all duration-300 group-hover:scale-105 bg-black/80"
                                    style={{ border: "2px solid rgba(255, 140, 0, 0.45)" }}
                                >
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <h4 className="font-spooky text-xl sm:text-2xl font-bold text-orange-300 group-hover:text-orange-200 tracking-wide text-glow-orange transition-colors">
                                        {founder.name}
                                    </h4>
                                    <span className="mt-1.5 text-xs font-semibold tracking-widest text-orange-400 uppercase">
                                        Founder
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row: 2 Founders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-2xl mx-auto mt-8">
                        {[
                            { name: "Darshan", image: "/images/about/darshan.jpg" },
                            { name: "Rahul", image: "/images/about/rahul.png" },
                        ].map(founder => (
                            <div
                                key={founder.name}
                                className="spooky-liquid-card p-6 rounded-3xl text-center flex flex-col items-center justify-between transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(255,120,0,0.3)] group"
                            >
                                <div
                                    className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden mx-auto mb-4 shadow-xl transition-all duration-300 group-hover:scale-105 bg-black/80"
                                    style={{ border: "2px solid rgba(255, 140, 0, 0.45)" }}
                                >
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <h4 className="font-spooky text-xl sm:text-2xl font-bold text-orange-300 group-hover:text-orange-200 tracking-wide text-glow-orange transition-colors">
                                        {founder.name}
                                    </h4>
                                    <span className="mt-1.5 text-xs font-semibold tracking-widest text-orange-400 uppercase">
                                        Founder
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 6: Faculty Coordinator */}
                <div className="my-16">
                    <div className="text-center mb-10">
                        <h2 className="font-spooky spooky-headline text-3xl sm:text-4xl font-bold">
                            Faculty Coordinator
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className="rounded-3xl p-6 text-center flex flex-col items-center transition-all duration-300 transform hover:-translate-y-2 group shadow-2xl"
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                background: "linear-gradient(160deg, rgba(22, 10, 30, 0.95) 0%, rgba(14, 5, 20, 0.98) 100%)",
                                border: "1px solid rgba(255, 140, 0, 0.45)",
                                boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 120, 0, 0.2)",
                            }}
                        >
                            <div
                                className="w-56 h-56 rounded-2xl overflow-hidden mx-auto mb-4 bg-black/90 shadow-xl transition-all duration-300 group-hover:scale-105"
                                style={{
                                    border: "2px solid rgba(255, 140, 0, 0.5)",
                                }}
                            >
                                <img
                                    src="/images/faculty/chethana-ht.jpg"
                                    alt="Dr. Chethana H T"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <h4 className="font-spooky text-xl sm:text-2xl font-bold text-orange-300 group-hover:text-orange-200 mb-1 tracking-wide text-glow-orange transition-colors">
                                    Dr. Chethana H T
                                </h4>
                                <h5 className="text-sm sm:text-base text-orange-400 font-semibold mb-2">
                                    Associate Professor
                                </h5>
                                <span className="inline-block mb-3 text-xs font-semibold tracking-widest text-orange-400 uppercase">
                                    Faculty Coordinator
                                </span>
                                <p className="text-sm text-orange-200/80 font-mono">
                                    chethanaht@vvce.ac.in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query AboutQuery {
        site: site {
            siteMetadata {
                aboutUs {
                    main
                    about1
                    about2
                    about3
                }
            }
        }
    }
`
