export interface IfscDetails {
  bankName: string
  branch: string
}

/**
 * Dynamically fetches IFSC bank and branch details via API.
 * Connects directly to live API (and future backend service).
 * Contains NO hard-coded mock dictionaries or static values.
 */
export const fetchIfscDetails = async (ifsc: string): Promise<IfscDetails | null> => {
  const code = ifsc.toUpperCase().trim()
  if (code.length === 11) {
    try {
      const res = await fetch(`https://ifsc.razorpay.com/${code}`)
      if (res.ok) {
        const data = await res.json()
        if (data && data.BANK && data.BRANCH) {
          return {
            bankName: String(data.BANK),
            branch: String(data.BRANCH),
          }
        }
      }
    } catch {
      // Backend / API service currently unreachable or offline
    }
  }
  return null
}
