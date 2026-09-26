import { Link } from 'react-router-dom'
import { routePaths } from '@core/config'
import './ServicesTab.css'

export const ServicesTab = () => {
  const services = [
    { title: 'My Applications', desc: 'Track your ongoing applications', to: routePaths.applications, colorClass: 'services-tab__dot--amber', bgClass: 'services-tab__icon--amber' },
    { title: 'My Documents', desc: 'View your uploaded documents', to: routePaths.documents, colorClass: 'services-tab__dot--blue', bgClass: 'services-tab__icon--blue' },
    { title: 'Payments & Invoices', desc: 'View billing and transactions', to: routePaths.payments, colorClass: 'services-tab__dot--teal', bgClass: 'services-tab__icon--teal' },
    { title: 'Notifications', desc: 'Alerts and messages', to: routePaths.notifications, colorClass: 'services-tab__dot--orange', bgClass: 'services-tab__icon--orange' },
  ]

  return (
    <div className="services-tab__grid">
      {services.map(srv => (
        <Link key={srv.title} to={srv.to} className="services-tab__card">
          <div className={`services-tab__icon ${srv.bgClass}`}>
            <div className={`services-tab__dot ${srv.colorClass}`}></div>
          </div>
          <div className="services-tab__content">
            <h4 className="services-tab__title">{srv.title}</h4>
            <p className="services-tab__desc">{srv.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
