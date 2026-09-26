import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAuthStore } from '@store/index'
import { CompleteProfileModal } from '@shared/components'
import {
  DEFAULT_ITR_STATS,
  ITR_SERVICES_LIST,
} from '../../services/itrData'
import type { ItrViewKey } from '../../types/itr.types'
import {
  BarChartIcon,
  RupeeIcon,
  ClockIcon,
  FileTextIcon,
  ShieldAlertIcon,
  CalendarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from '../../components/ItrIcons'
import './Itr.css'

export const Itr = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedTarget, setSelectedTarget] = useState('')

  const viewRouteMap: Record<ItrViewKey, string> = {
    overview: routePaths.itr.root,
    'file-itr': routePaths.itr.fileItr,
    'track-my-return': routePaths.itr.root,
    'itr-filing': routePaths.itr.itrFiling,
    'tds-refund': routePaths.itr.tdsRefund,
    'previous-year-itr': routePaths.itr.previousYearItr,
    'revised-itr': routePaths.itr.revisedItr,
    'tax-notice-assistance': routePaths.itr.taxNoticeAssistance,
    'tds-refund-estimator': routePaths.itr.tdsRefundEstimator,
    'tax-computation': routePaths.itr.taxComputation,
  }

  const handleNavigateView = (viewKey: ItrViewKey) => {
    const targetRoute = viewRouteMap[viewKey] || routePaths.itr.root
    if (!user?.isProfileComplete && targetRoute !== routePaths.itr.root) {
      setSelectedTarget(targetRoute)
      setIsProfileModalOpen(true)
    } else {
      navigate(targetRoute)
    }
  }

  const handleConfirmProfile = () => {
    setIsProfileModalOpen(false)
    navigate(routePaths.auth.register, {
      state: { returnTo: selectedTarget, mobile: user?.mobile },
    })
  }

  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'bar':
        return <BarChartIcon size={22} strokeWidth={2.2} />
      case 'rupee':
        return <RupeeIcon size={22} strokeWidth={2.2} />
      case 'clock':
        return <ClockIcon size={22} strokeWidth={2.2} />
      case 'document':
        return <FileTextIcon size={22} strokeWidth={2.2} />
      case 'warning':
        return <ShieldAlertIcon size={22} strokeWidth={2.2} />
      default:
        return <FileTextIcon size={22} strokeWidth={2.2} />
    }
  }

  const getStatIcon = (iconType: string) => {
    switch (iconType) {
      case 'calendar':
        return <CalendarIcon size={16} strokeWidth={2.2} />
      case 'check':
        return <CheckCircleIcon size={16} strokeWidth={2.2} />
      case 'rupee':
        return <RupeeIcon size={16} strokeWidth={2.2} />
      case 'notice':
        return <ShieldCheckIcon size={16} strokeWidth={2.2} />
      default:
        return <CheckCircleIcon size={16} strokeWidth={2.2} />
    }
  }

  return (
    <div className="itr-hub-page">
      {/* 1. Header Hero Banner */}
      <section className="itr-hero-banner">
        <h1 className="itr-hero-banner__title">Returns, refunds and notices</h1>
        <p className="itr-hero-banner__subtitle">
          Filed by a CA, not a form wizard. We pull your AIS and TIS, reconcile them against your
          books, and show you the computation before anything is submitted.
        </p>
      </section>

      {/* 2. Four Stats Cards Row */}
      <section className="itr-stats-grid">
        {DEFAULT_ITR_STATS.map((stat) => (
          <div key={stat.id} className="itr-stat-card">
            <div className="itr-stat-card__header">
              <span className="itr-stat-card__icon-box">{getStatIcon(stat.icon)}</span>
              <span className="itr-stat-card__label">{stat.label}</span>
            </div>
            <div className="itr-stat-card__value">{stat.value}</div>
            <div className="itr-stat-card__subtext">{stat.subtext}</div>
          </div>
        ))}
      </section>

      {/* 3. Five Service Cards Grid */}
      <section className="itr-services-grid">
        {ITR_SERVICES_LIST.map((service) => (
          <div key={service.id} className="itr-service-card">
            <div className="itr-service-card__icon-box">
              {getServiceIcon(service.icon)}
            </div>

            <h3 className="itr-service-card__title">{service.title}</h3>
            <p className="itr-service-card__desc">{service.description}</p>

            <hr className="itr-service-card__divider" />

            <div className="itr-service-card__footer">
              <div className="itr-service-card__price-box">
                <span className="itr-service-card__price">{service.pricing}</span>
                <span className="itr-service-card__timeline">
                  <ClockIcon size={13} strokeWidth={2.2} /> {service.timeline}
                </span>
              </div>

              <button
                type="button"
                className="itr-service-card__start-btn"
                onClick={() => handleNavigateView(service.viewKey)}
              >
                Start →
              </button>
            </div>
          </div>
        ))}
      </section>

      <CompleteProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onCompleteProfile={handleConfirmProfile}
      />
    </div>
  )
}

export default Itr
