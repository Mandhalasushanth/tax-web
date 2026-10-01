import type { FC } from 'react'
import { Modal } from '@shared/components'
import type { DocPreviewState } from '@modules/gst/types/gstDocuments.types'
import { DocPlaceholderIcon } from '@modules/gst/shared/GSTDocIcons/GSTDocIcons'

interface GSTDocPreviewModalProps {
  previewDoc: DocPreviewState | null
  onClose: () => void
}

export const GSTDocPreviewModal: FC<GSTDocPreviewModalProps> = ({ previewDoc, onClose }) => {
  if (!previewDoc) return null

  return (
    <Modal
      isOpen={Boolean(previewDoc)}
      onClose={onClose}
      size="md"
      title={
        <div className="gst-doc-modal__title-group">
          <span className="gst-doc-modal__title">{previewDoc.title}</span>
          <span className="gst-doc-modal__filename">{previewDoc.fileName}</span>
        </div>
      }
      footer={
        <button type="button" className="gst-doc-modal__btn-secondary" onClick={onClose}>
          Close Preview
        </button>
      }
    >
      <div className="gst-doc-modal__preview-placeholder">
        <DocPlaceholderIcon width={48} height={48} />
        <p className="gst-doc-modal__preview-text">Document preview active</p>
        <span className="gst-doc-modal__preview-sub">Original verified GST compliance copy</span>
      </div>
    </Modal>
  )
}
