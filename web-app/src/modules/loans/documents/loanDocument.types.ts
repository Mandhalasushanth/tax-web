export interface UploadedLoanDocument {
  id?: string
  name: string
  size: string
  file?: File
  uploadedAt: string
}

export interface LoanDocumentDefinition {
  id: string
  title: string
  subtitle: string
  isRequired: boolean
  badgeLabel?: string
  hideOptionalBadge?: boolean
  badgeVariant?: 'required' | 'optional'
  category?: 'identity' | 'income' | 'additional' | 'property' | 'commercial' | 'legal' | string
  icon?: React.ReactNode
  iconBg?: string
  iconColor?: string
}

export function createDocDef(
  id: string,
  title: string,
  subtitle: string,
  category: string,
  icon: React.ReactNode,
  isRequired = true,
  options?: { iconBg?: string; iconColor?: string; hideOptionalBadge?: boolean }
): LoanDocumentDefinition {
  return {
    id,
    title,
    subtitle,
    category,
    isRequired,
    icon,
    iconBg: options?.iconBg || '#eff6ff',
    iconColor: options?.iconColor || '#2563eb',
    hideOptionalBadge: options?.hideOptionalBadge,
  }
}
