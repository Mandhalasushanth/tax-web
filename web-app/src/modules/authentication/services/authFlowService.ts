import { env } from '@core/config'
import { authStorage, permissionsFor } from '@core/auth'
import type { AuthSession, AuthUser, UserRole } from '@core/auth'

import { authApi } from '../api/authApi'
import type {
  LoginPayload,
  SaveRegistrationStep1Payload,
  VerifyOtpPayload,
  VerifyPasscodePayload,
} from '../types/auth.types'

/* ------------------------------------------------------------------ *
 * Development mocks - delete this block once the API is live.
 * ------------------------------------------------------------------ */
/**
 * Demo sign-ins while mocks are on:
 *   9000000001  Super admin      9000000004  GST agent
 *   9000000002  Admin            9000000005  ITR agent
 *   9000000003  Manager          anything else  Customer
 */
const DEMO_ROLES: Record<string, { role: UserRole; fullName: string; id: string; department?: string }> = {
  '9000000001': { role: 'SUPER_ADMIN', fullName: 'Vasavi Reddy', id: 'stf_001', department: 'Operations' },
  '9000000002': { role: 'ADMIN', fullName: 'Rahul Menon', id: 'stf_002', department: 'Operations' },
  '9000000003': { role: 'MANAGER', fullName: 'Priya Nair', id: 'stf_003', department: 'Compliance' },
  '9000000004': { role: 'GST_AGENT', fullName: 'Imran Shaikh', id: 'stf_004', department: 'Compliance' },
  '9000000005': { role: 'ITR_AGENT', fullName: 'Sneha Kulkarni', id: 'stf_005', department: 'Compliance' },
}

const DEMO_EXISTING_USERS: Record<string, { fullName: string; passcode: string; email: string }> = {
  '7008138785': { fullName: 'Sagarika Jena', passcode: '123456', email: 'sagarika@taxedge.in' },
}

const mockUser = (mobile: string): AuthUser => {
  const clean = mobile.replace(/\D/g, '')
  const demo = DEMO_ROLES[clean]
  if (demo) {
    return {
      id: demo.id,
      fullName: demo.fullName,
      email: `${demo.fullName.split(' ')[0].toLowerCase()}@taxedge.in`,
      mobile: clean,
      role: demo.role,
      department: demo.department,
      permissions: permissionsFor(demo.role),
      isProfileComplete: true,
    }
  }

  const registeredRecord = authStorage.getRegisteredUser(clean)
  if (registeredRecord?.user && registeredRecord.isRegistered) {
    return {
      ...registeredRecord.user,
      isProfileComplete: true,
    }
  }

  const demoExisting = DEMO_EXISTING_USERS[clean]
  if (demoExisting) {
    return {
      id: `usr_${clean}`,
      fullName: demoExisting.fullName,
      email: demoExisting.email,
      mobile: clean,
      role: 'CUSTOMER',
      customerType: 'INDIVIDUAL',
      permissions: [],
      isProfileComplete: true,
    }
  }

  return {
    id: `usr_${clean || Date.now().toString(36)}`,
    fullName: registeredRecord?.user?.fullName || '',
    email: registeredRecord?.user?.email || '',
    mobile: clean,
    role: 'CUSTOMER',
    customerType: 'INDIVIDUAL',
    permissions: [],
    isProfileComplete: false,
  }
}

const mockSession = (mobile: string): AuthSession => ({
  user: mockUser(mobile),
  tokens: {
    accessToken: `tok_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    refreshToken: `ref_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
  },
})

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))
/* ------------------------------------------------------------------ */

/**
 * Business rules for signing in and registration. Pages call this, never authApi directly,
 * so the mock switch and multi-step logic lives in one place.
 */
export const authFlowService = {
  /** Check if a mobile number is already registered (has completed registration with a passcode) */
  isRegistered(mobile: string): boolean {
    const clean = mobile.replace(/\D/g, '')
    if (DEMO_ROLES[clean]) return true
    if (DEMO_EXISTING_USERS[clean]) return true
    const record = authStorage.getRegisteredUser(clean)
    return Boolean(record && record.isRegistered && record.passcode)
  },

  async login(payload: LoginPayload): Promise<AuthSession> {
    if (env.enableMocks) {
      await delay()
      return mockSession(payload.mobile)
    }
    return authApi.login(payload)
  },

  async verifyPasscode(payload: VerifyPasscodePayload): Promise<AuthSession> {
    const clean = payload.mobile.replace(/\D/g, '')
    if (env.enableMocks) {
      await delay(300)
      if (DEMO_ROLES[clean]) {
        if (payload.passcode !== '123456') {
          throw new Error('Incorrect passcode. Try 123456 in demo mode.')
        }
        const session = mockSession(clean)
        authStorage.setTokens(session.tokens)
        authStorage.setUser(session.user)
        return session
      }

      const record = authStorage.getRegisteredUser(clean)
      const expectedPasscode = record?.passcode || DEMO_EXISTING_USERS[clean]?.passcode

      if (!expectedPasscode || (!record?.isRegistered && !DEMO_EXISTING_USERS[clean])) {
        throw new Error('No registered account found for this mobile number.')
      }

      if (payload.passcode !== expectedPasscode) {
        throw new Error('Incorrect passcode. Please enter the passcode you created during registration.')
      }

      const userProfile: AuthUser = record?.user ? {
        ...record.user,
        isProfileComplete: true,
      } : {
        id: `usr_${clean}`,
        fullName: DEMO_EXISTING_USERS[clean]?.fullName || 'TaxEdge User',
        email: DEMO_EXISTING_USERS[clean]?.email || 'user@taxedge.in',
        mobile: clean,
        role: 'CUSTOMER',
        customerType: 'INDIVIDUAL',
        permissions: [],
        isProfileComplete: true,
      }

      const session: AuthSession = {
        user: userProfile,
        tokens: {
          accessToken: `tok_${clean}_${Date.now().toString(36)}`,
          refreshToken: `ref_${clean}_${Date.now().toString(36)}`,
        },
      }
      authStorage.setTokens(session.tokens)
      authStorage.setUser(userProfile)
      return session
    }

    return authApi.login({ mobile: payload.mobile, password: payload.passcode })
  },

  async saveRegistrationStep1(payload: SaveRegistrationStep1Payload): Promise<void> {
    const clean = payload.mobile.replace(/\D/g, '')
    const step1User: AuthUser = {
      ...payload.user,
      isProfileComplete: true,
    }
    authStorage.saveRegisteredUser({
      mobile: clean,
      passcode: payload.passcode,
      isRegistered: true,
      user: step1User,
    })
    authStorage.setUser(step1User)
  },

  async completeRegistration(mobile: string, customerType?: string): Promise<void> {
    const clean = mobile.replace(/\D/g, '')
    const record = authStorage.getRegisteredUser(clean)
    if (record) {
      const updatedUser: AuthUser = {
        ...record.user,
        customerType: customerType || record.user.customerType,
        isProfileComplete: true,
      }
      authStorage.saveRegisteredUser({
        ...record,
        isRegistered: true,
        user: updatedUser,
      })
      authStorage.setUser(updatedUser)
    }
  },


  async sendOtp(mobile: string): Promise<void> {
    if (env.enableMocks) {
      await delay(300)
      return
    }
    await authApi.sendOtp({ mobile })
  },

  async verifyOtp(payload: VerifyOtpPayload): Promise<AuthSession> {
    if (env.enableMocks) {
      await delay()
      if (payload.otp !== '123456') throw new Error('That code is incorrect. Try 123456 in demo mode.')
      return mockSession(payload.mobile)
    }
    return authApi.verifyOtp(payload)
  },

  async logout(): Promise<void> {
    if (env.enableMocks) return
    try {
      await authApi.logout()
    } catch {
      /* signing out locally must succeed even if the server call fails */
    }
  },
}
