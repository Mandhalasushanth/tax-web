import React, { useState } from 'react'
import { LockIcon, EyeIcon, EyeOffIcon } from '../RegistrationIcons/RegistrationIcons'
import './RegistrationSecurityFields.css'

export interface RegistrationSecurityValues {
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export interface RegistrationSecurityErrors {
  password?: string
  confirmPassword?: string
  agreeTerms?: string
}

export interface RegistrationSecurityFieldsProps {
  values: RegistrationSecurityValues
  errors: RegistrationSecurityErrors
  isFormValid: boolean
  isSubmitting: boolean
  submitLabel?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onToggleTerms: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RegistrationSecurityFields: React.FC<RegistrationSecurityFieldsProps> = ({
  values,
  errors,
  isFormValid,
  isSubmitting,
  submitLabel = 'Complete Registration',
  onChange,
  onBlur,
  onToggleTerms,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="reg-security-fields">
      {/* Row 7: Passcode & Confirm Passcode */}
      <div className="reg-security-fields__row">
        <div className="reg-field">
          <label className="reg-field__label" htmlFor="reg-password">
            Create Passcode <span className="reg-field__required">*</span>
          </label>
          <div className={`reg-field__control ${errors.password ? 'reg-field__control--error' : ''}`}>
            <span className="reg-field__icon">
              <LockIcon />
            </span>
            <input
              id="reg-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className="reg-field__input"
              placeholder="Create 6-digit passcode"
              value={values.password}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-field__eye-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && <p className="reg-field__error">{errors.password}</p>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="reg-confirmPassword">
            Confirm Passcode <span className="reg-field__required">*</span>
          </label>
          <div className={`reg-field__control ${errors.confirmPassword ? 'reg-field__control--error' : ''}`}>
            <span className="reg-field__icon">
              <LockIcon />
            </span>
            <input
              id="reg-confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className="reg-field__input"
              placeholder="Confirm passcode"
              value={values.confirmPassword}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-field__eye-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm passcode' : 'Show confirm passcode'}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="reg-field__error">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Row 8: Terms and Privacy Checkbox */}
      <div className="reg-security-fields__terms">
        <label className="reg-security-fields__checkbox-label" htmlFor="reg-agreeTerms">
          <input
            id="reg-agreeTerms"
            name="agreeTerms"
            type="checkbox"
            className="reg-security-fields__checkbox-input"
            checked={values.agreeTerms}
            onChange={onToggleTerms}
          />
          <span className="reg-security-fields__custom-checkbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </label>
        <span className="reg-security-fields__terms-text">
          By creating an account, I agree to the{' '}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="reg-security-fields__terms-link"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="reg-security-fields__terms-link"
          >
            Privacy Policy
          </a>
          .
        </span>
      </div>

      {/* Row 9: Continue Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`reg-security-fields__btn ${
          isFormValid && !isSubmitting
            ? 'reg-security-fields__btn--active'
            : 'reg-security-fields__btn--inactive'
        }`}
      >
        {isSubmitting ? 'Processing...' : submitLabel}
      </button>
    </div>
  )
}
