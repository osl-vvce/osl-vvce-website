import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import { WindowLocation } from "@reach/router"
import Layout from "../components/layout"
import { Logo } from "../components/utils"
import "../style/visitor-logbook.css"

type LogEntry = {
  id: number | string
  full_name: string
  usn: string
  check_in_time: string
  check_out_time?: string | null
  purpose: string
  progress?: string | null
  created_at?: string | null
}

const supabaseUrl = process.env.GATSBY_SUPABASE_URL
const supabaseKey = process.env.GATSBY_SUPABASE_ANON_KEY
const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null

const VisitorLogbookLogs: React.FC<{ location: WindowLocation }> = ({
  location,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      if (!supabase) {
        setError(
          "Supabase is not configured. Set GATSBY_SUPABASE_URL and GATSBY_SUPABASE_ANON_KEY."
        )
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("visitor_logs")
        .select(
          "id, full_name, usn, check_in_time, check_out_time, purpose, progress, created_at"
        )
        .order("created_at", { ascending: true })

      if (error) {
        setError(error.message)
      } else if (data) {
        setLogs(data as LogEntry[])
      }
      setLoading(false)
    }

    fetchLogs()
  }, [])

  const formatDate = (iso?: string | null) => {
    if (!iso) return "-"
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso
    return d.toLocaleDateString()
  }

  const formatTime = (iso?: string | null) => {
    if (!iso) return "-"
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Layout
      location={location}
      seo={{
        title: "Visitor Logbook Logs - OSL VVCE",
        description: "View all visitor logbook entries for OSL VVCE",
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

      <div className="visitor-logbook-page">
        <div className="logbook-content-wrapper visitor-logs-fullwidth">
          <div className="logbook-header-section">
            <div className="logbook-logo-section">
              <Logo className="logbook-logo" />
              <div className="logbook-title-section">
                <h1 className="logbook-page-title">Visitor Logbook Logs</h1>
                <p className="logbook-subtitle">
                  Pull all visitor check-ins and review them in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="logbook-form-container visitor-logs-fullcontainer">
            <div className="logbook-action-row">
              <Link to="/visitor-logbook" className="secondary-btn">
                Back to visitor check-in
              </Link>
            </div>
            {loading ? (
              <p className="submit-message">Loading logs...</p>
            ) : error ? (
              <p className="submit-message error">{error}</p>
            ) : logs.length === 0 ? (
              <p className="submit-message">No log entries found.</p>
            ) : (
              <div className="visitor-logs-table-wrap">
                <table className="visitor-logs-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>USN / ID</th>
                      <th>Date</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Purpose</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                          <td className="td-name">{log.full_name}</td>
                        <td className="td-usn">{log.usn}</td>
                        <td className="td-date">{formatDate(log.created_at)}</td>
                        <td className="td-in">{formatTime(log.check_in_time)}</td>
                        <td className="td-out">{log.check_out_time ? formatTime(log.check_out_time) : "-"}</td>
                        <td className="td-purpose">{log.purpose}</td>
                        <td className="td-progress">{log.progress || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default VisitorLogbookLogs
