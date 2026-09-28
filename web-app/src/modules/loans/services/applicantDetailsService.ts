import { authStorage } from '@core/auth'
import { useAuthStore } from '@store/index'
import type { ApplicantIdentityProfile } from '../types/businessLoan.types'

/**
 * Default empty applicant profile when no account session is active
 */
const EMPTY_APPLICANT_PROFILE: ApplicantIdentityProfile = {
  name: '',
  mobile: '',
  email: '',
  pan: '',
  aadhaar: '',
  dob: '',
  address: '',
  isVerified: true,
}

/**
 * Builds an address string safely from address components without loops (Pure functional)
 */
function composeAddress(
  address?: string,
  line1?: string,
  city?: string,
  state?: string,
  pincode?: string
): string {
  try {
    const isDirectAddress = Boolean(address && address.trim().length > 0)
    const parts = [line1, city, state].filter(Boolean)
    const base = parts.join(', ')
    const withPin = pincode ? (base ? `${base} - ${pincode}` : pincode) : base
    return isDirectAddress ? String(address).trim() : withPin
  } catch (err) {
    console.error('[applicantDetailsService] Error composing address:', err)
    return ''
  }
}

/**
 * Securely retrieves applicant details from the logged-in session or stored profile (Pure functional)
 */
export function getApplicantIdentityDetails(): ApplicantIdentityProfile {
  try {
    const storeUser = useAuthStore.getState().user
    const storageUser = authStorage.getUser()
    const user = storeUser || storageUser

    return !user
      ? EMPTY_APPLICANT_PROFILE
      : {
          name: user.fullName || '',
          mobile: user.mobile || '',
          email: user.email || '',
          pan: user.pan || '',
          aadhaar: user.aadhaar || '',
          dob: user.dob || '',
          address: composeAddress(
            user.address,
            user.addressLine1,
            user.city,
            user.state,
            user.pincode
          ),
          isVerified: Boolean(user.isProfileComplete || user.pan || user.aadhaar),
        }
  } catch (err) {
    console.error('[applicantDetailsService] Failed to fetch identity profile:', err)
    return EMPTY_APPLICANT_PROFILE
  }
}
