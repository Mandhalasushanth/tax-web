import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import type { GstAppRecord } from '../../../hooks/useGstDashboardData'
import './GSTApplicationList.css'

export interface GSTApplicationListProps {
  applications: GstAppRecord[]
}

type FilterTab = 'all' | 'in_progress' | 'completed'

export const GSTApplicationList = ({ applications }: GSTApplicationListProps) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (activeTab === 'all') return true
      if (activeTab === 'completed') return app.progress >= 100 || app.status.toLowerCase().includes('approved')
      if (activeTab === 'in_progress') return app.progress < 100 && !app.status.toLowerCase().includes('approved')
      return true
    })
  }, [applications, activeTab])

  return (
    <div className="gst-app-list-container">
      <div className="gst-app-list-header">
        <div className="gst-app-list-header__left">
          <h2 className="gst-app-list-header__title">Your GST Applications</h2>
          <p className="gst-app-list-header__count">
            {applications.length === 0
              ? 'No applications on record.'
              : applications.length === 1
              ? '1 application on record.'
              : `${applications.length} applications on record.`}
          </p>
        </div>

        {applications.length > 0 && (
          <div className="gst-app-list-tabs" role="tablist" aria-label="Filter applications">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'all'}
              className={`gst-app-list-tab ${activeTab === 'all' ? 'gst-app-list-tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({applications.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'in_progress'}
              className={`gst-app-list-tab ${activeTab === 'in_progress' ? 'gst-app-list-tab--active' : ''}`}
              onClick={() => setActiveTab('in_progress')}
            >
              In Progress
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'completed'}
              className={`gst-app-list-tab ${activeTab === 'completed' ? 'gst-app-list-tab--active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="gst-app-list-empty">
          <div className="gst-app-list-empty__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h3 className="gst-app-list-empty__title">No Active GST Applications</h3>
          <p className="gst-app-list-empty__text">
            You don&apos;t have any ongoing GST applications or filings yet. Start a new registration or file periodic returns with our dedicated tax team.
          </p>
          <Link to={routePaths.gst.registration} className="gst-app-list-empty__btn">
            Apply for GST Registration
          </Link>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="gst-app-list-empty gst-app-list-empty--filtered">
          <p className="gst-app-list-empty__text">No applications match the selected tab filter.</p>
        </div>
      ) : (
        <div className="gst-app-list">
          {filteredApplications.map((app, index) => {
            const isBlue = index % 2 === 0
            const themeClass = isBlue ? 'theme-blue' : 'theme-orange'

            return (
              <Link
                to={routePaths.gst.detail(app.id)}
                key={app.id}
                className={`gst-app-item ${themeClass}`}
              >
                <div className="gst-app-item__icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>

                <div className="gst-app-item__content">
                  <h3 className="gst-app-item__title">{app.title}</h3>
                  <p className="gst-app-item__meta">
                    {app.reference} &middot; {app.details} &middot; {app.assignee}
                  </p>
                </div>

                <div className="gst-app-item__status-area">
                  <span className="gst-app-item__badge">
                    <span className="gst-app-item__badge-dot"></span>
                    {app.status}
                  </span>
                  <div className="gst-app-item__progress">
                    <div className="gst-app-item__progress-bar">
                      <div
                        className="gst-app-item__progress-fill"
                        style={{ width: `${Math.min(100, Math.max(0, app.progress))}%` }}
                      ></div>
                    </div>
                    <span className="gst-app-item__progress-text">{app.progress}% complete</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
