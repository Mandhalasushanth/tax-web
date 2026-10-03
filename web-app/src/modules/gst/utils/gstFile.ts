/** Upload limits, messages and size formatting shared by every GST upload */

export const GST_MAX_UPLOAD_MB = 10

const BYTES_PER_KB = 1024
const BYTES_PER_MB = BYTES_PER_KB * BYTES_PER_KB

export const GST_FILE_MESSAGES = {
  tooLarge: `File size must be under ${GST_MAX_UPLOAD_MB} MB.`,
  proofRequired: 'Please upload a supporting proof document.',
} as const

/** Error message when the file is over the upload limit, otherwise undefined */
export const gstFileSizeError = (file: File): string | undefined =>
  file.size > GST_MAX_UPLOAD_MB * BYTES_PER_MB ? GST_FILE_MESSAGES.tooLarge : undefined

/** "1.4 MB" from 1 MB upward, otherwise "320 KB" (never below 1 KB) */
export const formatGstFileSize = (bytes: number): string =>
  bytes >= BYTES_PER_MB
    ? `${(bytes / BYTES_PER_MB).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / BYTES_PER_KB))} KB`
