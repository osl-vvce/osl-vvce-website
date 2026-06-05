// src/pages/visitor-logbook.tsx
import React, { useState } from "react"
import { Link } from "gatsby"
import { createClient } from '@supabase/supabase-js'
import { Helmet } from "react-helmet"
import { WindowLocation } from "@reach/router"
import Layout from "../components/layout"
import { Logo } from "../components/utils"
import "../style/visitor-logbook.css"

// Initialize Supabase client
const supabaseUrl = process.env.GATSBY_SUPABASE_URL
const supabaseKey = process.env.GATSBY_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseKey)

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

type VisitorLogbookProps = {
  location: WindowLocation
}

const VisitorLogbook: React.FC<VisitorLogbookProps> = ({ location }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    USN: "",
    CheckInTime: "",
    CheckOutTime: "",
    reason: "",
    progress: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')

    if (!supabase) {
      const url = process.env.GATSBY_SUPABASE_URL
      const key = process.env.GATSBY_SUPABASE_ANON_KEY
      setSubmitMessage(`Database connection not configured. URL: ${url ? 'Set' : 'Missing'}, Key: ${key ? 'Set' : 'Missing'}`)
      setSubmitting(false)
      return
    }

    try {
      const { error } = await supabase
        .from('visitor_logs')
        .insert([
          {
            full_name: formData.fullName,
            usn: formData.USN,
            check_in_time: formData.CheckInTime,
            check_out_time: formData.CheckOutTime,
            purpose: formData.reason,
            progress: formData.progress || null, // Optional field
          }
        ])

      if (error) throw error

      setSubmitMessage('Entry submitted successfully!')
      setFormData({ fullName: '', USN: '', CheckInTime: '', CheckOutTime: '', reason: '', progress: '' })
    } catch (error: any) {
      console.error('Error:', error)
      setSubmitMessage('Submission failed: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout 
      location={location}
      seo={{
        title: "Visitor Logbook - OSL VVCE",
        description: "OSL VVCE Visitor Logbook - Check in and track your visits to the Open Source Lab"
      }}
    >
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </Helmet>
      
      <div className="visitor-logbook-page">
        <div className="logbook-content-wrapper">
          <div className="logbook-header-section">
            <div className="logbook-logo-section">
              <Logo className="logbook-logo" />
              <div className="logbook-title-section">
                <h1 className="logbook-page-title">Visitor Logbook</h1>
                <p className="logbook-subtitle">Please fill out the form to check in</p>
              </div>
            </div>
          </div>
          <div className="logbook-action-row">
            <Link to="/visitor-logbook-logs" className="secondary-btn">
              View all visitor logs
            </Link>
          </div>
          <div className="logbook-form-container">
            <form className="visitor-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="USN">
                    <i className="fas fa-id-card"></i>
                    USN / ID Number
                  </label>
                  <input 
                    type="text" 
                    id="USN" 
                    name="USN" 
                    placeholder="Enter your USN or ID" 
                    value={formData.USN}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="input-group">
                  <label htmlFor="CheckInTime">
                    <i className="fas fa-clock"></i>
                    Check-in Time
                  </label>
                  <input 
                    type="time" 
                    id="CheckInTime" 
                    name="CheckInTime" 
                    value={formData.CheckInTime}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="CheckOutTime">
                    <i className="fas fa-clock"></i>
                    Check-out Time
                  </label>
                  <input 
                    type="time" 
                    id="CheckOutTime" 
                    name="CheckOutTime"
                    value={formData.CheckOutTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="reason">
                    <i className="fas fa-bullseye"></i>
                    Purpose of Visit
                  </label>
                  <textarea 
                    id="reason" 
                    name="reason" 
                    rows={3} 
                    placeholder="Describe the purpose of your visit..." 
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="progress">
                    <i className="fas fa-tasks"></i>
                    Progress of Work
                  </label>
                  <textarea 
                    id="progress" 
                    name="progress" 
                    rows={3} 
                    placeholder="Describe your progress or work completed..."
                    value={formData.progress}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={submitting}>
                  <i className="fas fa-sign-in-alt"></i>
                  {submitting ? 'Submitting...' : 'Submit Entry'}
                </button>
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`}>
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

export default VisitorLogbook