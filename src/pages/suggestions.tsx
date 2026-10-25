// src/pages/suggestions.tsx
import React, { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Helmet } from "react-helmet"
import { PageProps } from "gatsby"
import Layout from "../components/layout"
import { Logo } from "../components/utils"
import "../style/suggestions.css"

//initialize supabase client
const supabaseUrl = process.env.GATSBY_SUPABASE_URL
const supabaseKey = process.env.GATSBY_SUPABASE_ANON_KEY

console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Key exists:", !!supabaseKey)

const supabase =
    supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

type suggestionsProps = PageProps

const suggestions: React.FC<suggestionsProps> = ({ location }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        category: "",
        message: "",
    })

    const [submitting, setSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setSubmitMessage("")

        if (!supabase) {
            const url = process.env.GATSBY_SUPABASE_URL
            const key = process.env.GATSBY_SUPABASE_ANON_KEY
            setSubmitMessage(
                `Database connection not configured. URL: ${
                    url ? "Set" : "Missing"
                }, Key: ${key ? "Set" : "Missing"}`
            )
            setSubmitting(false)
            return
        }

        try {
            // Validate required fields
            if (!formData.fullName.trim()) {
                setSubmitMessage("Please enter your full name")
                setSubmitting(false)
                return
            }
            
            if (!formData.message.trim()) {
                setSubmitMessage("Please enter your message")
                setSubmitting(false)
                return
            }

            // Insert into suggestions table
            const { error } = await supabase.from("suggestions").insert([
                {
                    name: formData.fullName,
                    email: formData.email || null, // Allow null for anonymous suggestions
                    message: `Category: ${formData.category}\n\nMessage: ${formData.message}`,
                },
            ])
            
            if (error) throw error

            setSubmitMessage("Your suggestion has been submitted successfully!")
            setFormData({ fullName: "", email: "", category: "", message: "" })
        } catch (error: any) {
            console.error("Error:", error)
            setSubmitMessage("Submission failed: " + (error.message || "Unknown error"))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Layout
            location={location}
            seo={{
                title: "Suggestions and Queries - OSL VVCE",
                description:
                    "OSL VVCE Suggestions and Queries Page - Allows students to submit suggestions, raise queries, or share feedback.",
            }}
        >
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@400;500&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
                />
            </Helmet>

            <div className="Suggestions-page">
                <div className="Suggestions-content-wrapper">
                    <div className="Suggestions-header-section">
                        <div className="Suggestions-logo-section">
                            <Logo className="Suggestions-logo" />
                            <div className="Suggestions-title-section">
                                <h1 className="Suggestions-page-title">
                                    Suggestions and Queries
                                </h1>
                                <p className="Suggestions-subtitle">
                                    Please fill out the form to leave a message
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="Suggestions-form-container">
                        <form
                            className="Suggestions-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="fullName">
                                        <i className="fas fa-user"></i>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="email">
                                        <i className="fas fa-envelope"></i>
                                        Email ID (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your Email ID (optional)"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="category">
                                        <i className="fas fa-bullseye"></i>
                                        Type of message
                                    </label>
                                    <textarea
                                        id="category"
                                        name="category"
                                        rows={1}
                                        placeholder="Describe the type of your message..."
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="message">
                                        <i className="fas fa-tasks"></i>
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={3}
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={submitting}
                                >
                                    <i className="fas fa-paper-plane mr-2"></i>
                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Suggestion"}
                                </button>
                                {submitMessage && (
                                    <div
                                        className={`submit-message ${
                                            submitMessage.includes("success")
                                                ? "success"
                                                : "error"
                                        }`}
                                    >
                                        {submitMessage}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default suggestions
