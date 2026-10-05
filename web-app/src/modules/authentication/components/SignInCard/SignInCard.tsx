import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { authStorage } from '@core/auth'
import { useAuthStore } from '@store/index'
import { validateMobileNumber } from '@shared/utils'
import { authFlowService } from '../../services/authFlowService'
import { COUNTRY_CODES } from '../../constants/authData.constants'
import { MobileEntryView } from './MobileEntryView'
import { OtpVerificationView } from './OtpVerificationView'
import { PasscodeLoginView } from './PasscodeLoginView'
import './SignInCard.css'

export type AuthMode = 'mobile' | 'otp' | 'passcode'

export interface SignInCardProps {
  initialMobile?: string
  initialMode?: AuthMode
}

export const SignInCard: React.FC<SignInCardProps> = ({
  initialMobile = '',
  initialMode = 'mobile',
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { returnTo?: string } | null
  const signIn = useAuthStore((state) => state.signIn)

  const [authMode, setAuthMode] = useState<AuthMode>(initialMode)
  const [mobile, setMobile] = useState(initialMobile)
  const [countryIndex, setCountryIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isResetFlow, setIsResetFlow] = useState(false)

  const selectedCountry = COUNTRY_CODES[countryIndex] ?? COUNTRY_CODES[0]
  const cleanMobile = mobile.replace(/\D/g, '').trim()

  const handleToggleCountry = () => {
    setCountryIndex((prev) => (prev + 1) % COUNTRY_CODES.length)
  }

  const handleMobileChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 10)
    setMobile(cleaned)
    if (error) setError(null)
  }

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const mobileError = validateMobileNumber(cleanMobile)
    if (mobileError) {
      setError(mobileError)
      return
    }

    setError(null)
    setIsSubmitting(true)
    setIsResetFlow(false)

    try {
      await authFlowService.sendOtp(cleanMobile)
      setAuthMode('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to proceed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    setError(null)
    setIsSubmitting(true)
    try {
      const session = await authFlowService.verifyOtp({
        mobile: cleanMobile,
        otp,
      })

      // Check dynamically if user has created a passcode
      const userHasPasscode = authFlowService.hasPasscode(cleanMobile)
      if (userHasPasscode) {
        if (isResetFlow) {
          // If they forgot their passcode, we redirect to registration to set a new one
          navigate(routePaths.registration, { state: { resetPasscode: true, mobile: cleanMobile } })
          return
        }
        // For users who have created a passcode: OTP is verified, now prompt for passcode
        setAuthMode('passcode')
        return
      }

      // For new users or users with verified OTP: start persistent session
      authStorage.setTokens(session.tokens)
      authStorage.setUser(session.user)
      signIn(session)
      const targetPath = locationState?.returnTo || routePaths.dashboard
      navigate(targetPath, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    setError(null)
    try {
      await authFlowService.sendOtp(cleanMobile)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code.')
    }
  }

  const handlePasscodeLogin = async (passcode: string) => {
    setError(null)
    setIsSubmitting(true)
    try {
      const session = await authFlowService.verifyPasscode({
        mobile: cleanMobile,
        passcode,
      })
      authStorage.setTokens(session.tokens)
      authStorage.setUser(session.user)
      signIn(session)
      const targetPath = locationState?.returnTo || routePaths.dashboard
      navigate(targetPath, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Incorrect passcode. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPasscode = async () => {
    setError(null)
    setIsSubmitting(true)
    setIsResetFlow(true)
    try {
      await authFlowService.sendOtp(cleanMobile)
      setAuthMode('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeNumber = () => {
    setAuthMode('mobile')
    setError(null)
  }

  const handleGoogleLogin = () => {
    // Graceful Google OAuth trigger
    window.location.href = '#google-login'
  }

  const getSubtitle = () => {
    if (authMode === 'otp') return 'Enter the 6-digit OTP sent to your mobile number'
    if (authMode === 'passcode') return 'Enter your 6-digit passcode to sign in'
    return 'Sign in to continue to your TaxEdge account'
  }

  return (
    <div className="sign-in-card">
      {authMode === 'mobile' ? (
        <div className="sign-in-card__brand sign-in-card__brand--stacked">
          <img
            src="/assets/images/taxedge-brand-icon.png"
            alt="TaxEdge"
            className="sign-in-card__brand-icon sign-in-card__brand-icon--stacked"
          />
          <div className="sign-in-card__brand-text-block sign-in-card__brand-text-block--stacked">
            <div className="sign-in-card__brand-title">
              <span className="brand-title--navy">Tax</span>
              <span className="brand-title--orange">Edge</span>
            </div>
            <span className="sign-in-card__brand-sub">FIN SOLUTIONS</span>
          </div>
        </div>
      ) : (
        <div className="sign-in-card__brand sign-in-card__brand--inline">
          <div className="sign-in-card__brand-row">
            <img
              src="/assets/images/taxedge-brand-icon.png"
              alt="TaxEdge"
              className="sign-in-card__brand-icon"
            />
            <div className="sign-in-card__brand-divider" />
            <div className="sign-in-card__brand-text-block">
              <div className="sign-in-card__brand-title">
                <span className="brand-title--navy">Tax</span>
                <span className="brand-title--orange">Edge</span>
              </div>
              <span className="sign-in-card__brand-sub">FIN SOLUTIONS</span>
            </div>
          </div>
        </div>
      )}

      <header className={`sign-in-card__header ${authMode === 'mobile' ? 'sign-in-card__header--stacked' : ''}`}>
        <h2 className="sign-in-card__title">Welcome Back 👋</h2>
        <p className="sign-in-card__subtitle">{getSubtitle()}</p>
      </header>

      {authMode === 'mobile' && (
        <MobileEntryView
          mobile={mobile}
          onMobileChange={handleMobileChange}
          selectedCountryCode={selectedCountry.code}
          onToggleCountry={handleToggleCountry}
          onSubmit={handleMobileSubmit}
          isSubmitting={isSubmitting}
          error={error}
          onGoogleLogin={handleGoogleLogin}
        />
      )}

      {authMode === 'otp' && (
        <OtpVerificationView
          mobile={cleanMobile}
          countryCode={selectedCountry.code}
          onChangeNumber={handleChangeNumber}
          onVerifyOtp={handleVerifyOtp}
          onResendOtp={handleResendOtp}
          isSubmitting={isSubmitting}
          error={error}
          onGoogleLogin={handleGoogleLogin}
        />
      )}

      {authMode === 'passcode' && (
        <PasscodeLoginView
          mobile={cleanMobile}
          countryCode={selectedCountry.code}
          onChangeNumber={handleChangeNumber}
          onLogin={handlePasscodeLogin}
          isSubmitting={isSubmitting}
          error={error}
          onForgotPasscode={handleForgotPasscode}
          onGoogleLogin={handleGoogleLogin}
        />
      )}
    </div>
  )
}

export default SignInCard
