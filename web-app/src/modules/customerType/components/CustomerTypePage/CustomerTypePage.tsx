import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '@core/auth'
import { routePaths } from '@core/config'
import { useAuthStore } from '@store/index'

import { BrandPanel } from '../BrandPanel/BrandPanel'
import { BackButton } from '../BackButton/BackButton'
import { CustomerTypeList } from '../CustomerTypeList/CustomerTypeList'
import { CreateAccountButton } from '../CreateAccountButton/CreateAccountButton'
import { CUSTOMER_TYPE_OPTIONS } from '../../data/customerTypeOptions'
import { useCustomerType } from '../../hooks/useCustomerType'
import './CustomerTypePage.css'

export const CustomerTypePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { returnTo?: string } | null
  const { selectedId, setSelectedId } = useCustomerType(null)
  const user = useAuthStore((state) => state.user)

  const handleBack = () => {
    navigate(-1)
  }

  const handleProceed = () => {
    if (!selectedId) return
    const currentUser = user || authService.getUser()
    navigate(routePaths.auth.register, {
      state: {
        customerType: selectedId,
        returnTo: locationState?.returnTo,
        mobile: currentUser?.mobile,
      },
    })
  }

  return (
    <div className="customer-type-page">
      {/* 1. Left Fixed Brand Panel (Desktop & Tablet) */}
      <BrandPanel />

      {/* 2. Right Vertically Scrollable Content Panel */}
      <main className="customer-type-page__content-panel">
        <div className="customer-type-page__scroll-container">
          {/* Top Navigation */}
          <div className="customer-type-page__top-nav">
            <BackButton onClick={handleBack} />
          </div>

          {/* Heading & Subtitle */}
          <header className="customer-type-page__header">
            <h1 className="customer-type-page__title">What describes you best?</h1>
            <p className="customer-type-page__subtitle">Step 1 of 2 — Select entity type.</p>
          </header>

          {/* Customer Type Selection Cards List */}
          <section className="customer-type-page__list-section" aria-label="Customer Type Selection">
            <CustomerTypeList
              options={CUSTOMER_TYPE_OPTIONS}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </section>

          {/* Bottom Action CTA */}
          <footer className="customer-type-page__footer">
            <CreateAccountButton
              label="Continue to Registration →"
              onClick={handleProceed}
              disabled={!selectedId}
            />
          </footer>
        </div>
      </main>
    </div>
  )
}

export default CustomerTypePage
