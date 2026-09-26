import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '@core/auth'
import type { AuthUser } from '@core/auth'
import { routePaths } from '@core/config'
import { useAuthStore } from '@store/index'
import { authFlowService } from '../../services/authFlowService'
import { RegistrationPersonalFields } from '../RegistrationPersonalFields/RegistrationPersonalFields'
import { RegistrationIdentityFields } from '../RegistrationIdentityFields/RegistrationIdentityFields'
import { RegistrationResidentialFields } from '../RegistrationResidentialFields/RegistrationResidentialFields'
import { RegistrationSecurityFields } from '../RegistrationSecurityFields/RegistrationSecurityFields'
import type { CustomerTypeId } from '@modules/customerType/types/customerType.types'
import {
  checkIsFormValid,
  validateField,
  INITIAL_REGISTRATION_VALUES,
  formatDOB,
  type RegistrationFormErrors,
  type RegistrationFormState,
} from '../../validation/registrationValidation'
import './RegistrationForm.css'

export interface RegistrationFormProps {
  onStep1Success?: () => void
  customerType?: CustomerTypeId
  onSuccess?: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onStep1Success,
  customerType,
  onSuccess,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as { returnTo?: string; mobile?: string } | null
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const [values, setValues] = useState<RegistrationFormState>(() => ({
    ...INITIAL_REGISTRATION_VALUES,
    mobile: (locationState?.mobile || user?.mobile || '').replace(/\D/g, '').slice(0, 10),
    fullName: user?.fullName || '',
    email: user?.email || '',
  }))

  const [errors, setErrors] = useState<RegistrationFormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormState, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const isFormValid = checkIsFormValid(values)

  const handleApplyDate = (formattedDate: string) => {
    setValues((prev) => {
      const next = { ...prev, dob: formattedDate }
      if (touched.dob) {
        setErrors((prevErr) => ({ ...prevErr, dob: validateField('dob', next) }))
      }
      return next
    })
    setIsCalendarOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const key = name as keyof RegistrationFormState
    let formatted = value

    if (key === 'fullName' || key === 'fatherSpouseName') {
      formatted = value.replace(/[^a-zA-Z\s.'-]/g, '')
    } else if (key === 'pan') {
      formatted = value.toUpperCase().slice(0, 10)
    } else if (key === 'aadhaar') {
      formatted = value.replace(/\D/g, '').slice(0, 12)
    } else if (key === 'mobile') {
      formatted = value.replace(/\D/g, '').slice(0, 10)
    } else if (key === 'pincode') {
      formatted = value.replace(/\D/g, '').slice(0, 6)
    } else if (key === 'password' || key === 'confirmPassword') {
      formatted = value.replace(/\D/g, '').slice(0, 6)
    } else if (key === 'dob' && value.length > values.dob.length) {
      formatted = formatDOB(value)
    }

    const nextValues = { ...values, [key]: formatted }
    setValues(nextValues)

    if (key === 'aadhaar') {
      // While user enters Aadhaar number, do not show error so user can enter freely
      setErrors((prevErr) => ({ ...prevErr, aadhaar: undefined }))
      setTouched((prev) => ({ ...prev, aadhaar: false }))
    } else {
      if (touched[key]) {
        setErrors((prevErr) => {
          const updated = { ...prevErr, [key]: validateField(key, nextValues) }
          if (key === 'mobile' && touched.password) {
            updated.password = validateField('password', nextValues)
          }
          if (key === 'password' && touched.confirmPassword) {
            updated.confirmPassword = validateField('confirmPassword', nextValues)
          }
          return updated
        })
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    const key = name as keyof RegistrationFormState
    setTouched((prev) => ({ ...prev, [key]: true }))
    setValues((latestValues) => {
      setErrors((prevErr) => {
        const updated = {
          ...prevErr,
          [key]: validateField(key, latestValues),
        }
        if (key === 'mobile' && touched.password) {
          updated.password = validateField('password', latestValues)
        }
        if (key === 'password' && touched.confirmPassword) {
          updated.confirmPassword = validateField('confirmPassword', latestValues)
        }
        return updated
      })
      return latestValues
    })
  }

  const handleToggleTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setValues((prev) => {
      const next = { ...prev, agreeTerms: checked }
      setErrors((prevErr) => ({
        ...prevErr,
        agreeTerms: validateField('agreeTerms', next),
      }))
      return next
    })
    setTouched((prev) => ({ ...prev, agreeTerms: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: RegistrationFormErrors = {}
    let hasAnyError = false
    Object.keys(values).forEach((k) => {
      const key = k as keyof RegistrationFormState
      const err = validateField(key, values)
      if (err) {
        newErrors[key] = err
        hasAnyError = true
      }
    })

    if (hasAnyError || !isFormValid) {
      setErrors(newErrors)
      const allTouched: Partial<Record<keyof RegistrationFormState, boolean>> = {}
      Object.keys(values).forEach((k) => {
        allTouched[k as keyof RegistrationFormState] = true
      })
      setTouched(allTouched)
      return
    }

    setIsSubmitting(true)
    setErrors((prev) => ({ ...prev, form: undefined }))

    try {
      const cleanMobile = values.mobile.replace(/\D/g, '')

      const formattedAddress = [
        values.addressLine1.trim(),
        values.areaLocality.trim(),
        values.city.trim(),
        values.district.trim(),
        values.state.trim() + (values.pincode ? ` - ${values.pincode.trim()}` : ''),
      ]
        .filter(Boolean)
        .join(', ')

      const isFinishing = Boolean(customerType || onSuccess)
      const registeredUser: AuthUser = {
        id: `usr_${Date.now().toString(36)}`,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        mobile: cleanMobile,
        role: 'CUSTOMER',
        permissions: [],
        isProfileComplete: isFinishing,
        customerType: customerType || 'individual',
        gender: values.gender,
        dob: values.dob,
        fatherSpouseName: values.fatherSpouseName.trim(),
        pan: values.pan.trim(),
        aadhaar: values.aadhaar.trim(),
        addressLine1: values.addressLine1.trim(),
        addressLine2: '',
        areaLocality: values.areaLocality.trim(),
        city: values.city.trim(),
        district: values.district.trim(),
        pincode: values.pincode.trim(),
        state: values.state.trim(),
        address: formattedAddress,
      }

      await authFlowService.saveRegistrationStep1({
        mobile: cleanMobile,
        passcode: values.password,
        user: registeredUser,
      })

      if (isFinishing) {
        await authFlowService.completeRegistration(cleanMobile, customerType || 'individual')
      }

      setUser(registeredUser)
      authService.startSession({
        user: registeredUser,
        tokens: {
          accessToken: authService.getAccessToken() || `tok_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
          refreshToken: authService.getRefreshToken() || `ref_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
        },
      })

      if (onSuccess) {
        onSuccess()
      } else if (onStep1Success) {
        onStep1Success()
      } else {
        const destination = locationState?.returnTo || routePaths.dashboard
        navigate(destination, { replace: true })
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err instanceof Error ? err.message : 'Registration failed. Please try again.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="reg-form" onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <div className="reg-form__alert-error" role="alert">
          <span>{errors.form}</span>
        </div>
      )}

      <RegistrationPersonalFields
        values={{
          fullName: values.fullName,
          email: values.email,
          gender: values.gender,
          dob: values.dob,
        }}
        errors={{
          fullName: touched.fullName ? errors.fullName : undefined,
          email: touched.email ? errors.email : undefined,
          gender: touched.gender ? errors.gender : undefined,
          dob: touched.dob ? errors.dob : undefined,
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        isCalendarOpen={isCalendarOpen}
        onToggleCalendar={() => setIsCalendarOpen((prev) => !prev)}
        onCloseCalendar={() => setIsCalendarOpen(false)}
        onApplyDate={handleApplyDate}
      />

      <RegistrationIdentityFields
        values={{
          fatherSpouseName: values.fatherSpouseName,
          pan: values.pan,
          aadhaar: values.aadhaar,
          mobile: values.mobile,
        }}
        errors={{
          fatherSpouseName: touched.fatherSpouseName ? errors.fatherSpouseName : undefined,
          pan: touched.pan ? errors.pan : undefined,
          aadhaar: touched.aadhaar ? errors.aadhaar : undefined,
          mobile: touched.mobile ? errors.mobile : undefined,
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <RegistrationResidentialFields
        values={{
          addressLine1: values.addressLine1,
          pincode: values.pincode,
          areaLocality: values.areaLocality,
          city: values.city,
          district: values.district,
          state: values.state,
        }}
        errors={{
          addressLine1: touched.addressLine1 ? errors.addressLine1 : undefined,
          pincode: touched.pincode ? errors.pincode : undefined,
          areaLocality: touched.areaLocality ? errors.areaLocality : undefined,
          city: touched.city ? errors.city : undefined,
          district: touched.district ? errors.district : undefined,
          state: touched.state ? errors.state : undefined,
        }}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <RegistrationSecurityFields
        values={{
          password: values.password,
          confirmPassword: values.confirmPassword,
          agreeTerms: values.agreeTerms,
        }}
        errors={{
          password: touched.password ? errors.password : undefined,
          confirmPassword: touched.confirmPassword ? errors.confirmPassword : undefined,
          agreeTerms: touched.agreeTerms ? errors.agreeTerms : undefined,
        }}
        isFormValid={isFormValid}
        isSubmitting={isSubmitting}
        submitLabel="Complete Registration"
        onChange={handleChange}
        onBlur={handleBlur}
        onToggleTerms={handleToggleTerms}
      />
    </form>
  )
}
