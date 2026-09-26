import React, { useMemo } from 'react'
import { userStorage } from '@core/storage/userStorage'
import './NotificationsPage.css'



const EmptyStateIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" className="empty-illustration">
    <circle cx="100" cy="100" r="80" fill="#f3f4f6" />
    <path d="M100 60C85 60 70 70 70 85v25l-10 15v10h80v-10l-10-15V85C130 70 115 60 100 60z" fill="#d1d5db" />
    <path d="M90 145h20c0 5.5-4.5 10-10 10s-10-4.5-10-10z" fill="#9ca3af" />
    <circle cx="130" cy="70" r="12" fill="#ef4444" />
    <path d="M125 70l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const NotificationsPage: React.FC = () => {
  const notifications = useMemo(() => {
    const apps = userStorage.getUserApplications()
    return apps.map((app) => ({
      id: app.id,
      title: `${app.title} Submitted`,
      message: `Your request for ${app.title} (ID: ${app.code || app.id}) has been ${app.statusLabel?.toLowerCase() || 'submitted'} successfully.`,
      timestamp: 'Recently',
      type: 'application'
    }))
  }, [])

  return (
    <div className="notifications-page">
      <div className="notifications-header notifications-header--centered">
        <h1>Notifications</h1>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <EmptyStateIllustration />
            <h2>No notifications yet.</h2>
            <p>When you submit an application, document, or payment, your notifications will appear here.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <div className="notification-icon">
                <DocumentIcon />
              </div>
              <div className="notification-content">
                <div className="notification-header-row">
                  <h3>{notification.title}</h3>
                  <span className="timestamp">{notification.timestamp}</span>
                </div>
                <p>{notification.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
