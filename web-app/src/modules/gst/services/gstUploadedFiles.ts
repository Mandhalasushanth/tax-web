/**
 * Files picked during GST registration, kept in memory for this tab only (never written to
 * storage) so "View Document" can render the real PDF / image before submission.
 * Drafts persist only file names; after a reload the user re-uploads to preview.
 */
const files = new Map<string, File>()

export const gstUploadedFiles = {
  get(docId: string): File | undefined {
    return files.get(docId)
  },
  set(docId: string, file: File): void {
    files.set(docId, file)
  },
  remove(docId: string): void {
    files.delete(docId)
  },
  /** After submit or "Discard & Exit" */
  clear(): void {
    files.clear()
  },
}
