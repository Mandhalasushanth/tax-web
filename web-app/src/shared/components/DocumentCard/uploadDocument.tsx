import React, { useRef } from "react";
import "./uploadDocument.css";

export interface UploadDocumentProps {
  id: string;
  title: string;
  subtitle?: string;
  desc?: string;
  isRequired?: boolean;
  badge?: React.ReactNode;
  uploadIcon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  isUploaded?: boolean;
  fileName?: string;
  fileSize?: string;
  file?: File;
  icon?: React.ReactNode;
  accept?: string;
  uploadLabel?: string;
  onUpload?: (id: string, file: File) => void;
  onRemove?: (id: string) => void;
  onView?: (doc: {
    id: string;
    title: string;
    fileName?: string;
    file?: File;
  }) => void;
  onReplace?: (id: string) => void;
  isNotApplicable?: boolean;
  onToggleNotApplicable?: (id: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export type DocumentCardProps = UploadDocumentProps;

export const UploadDocument: React.FC<UploadDocumentProps> = ({
  id,
  title,
  subtitle,
  desc,
  isRequired = false,
  badge,
  uploadIcon,
  iconBg,
  iconColor,
  isUploaded = false,
  fileName,
  fileSize,
  file,
  icon,
  accept = ".pdf,.jpg,.jpeg,.png,.docx,.xlsx,.doc,.xls,.csv,.zip",
  uploadLabel = "Upload",
  onUpload,
  onRemove,
  onView,
  onReplace,
  isNotApplicable = false,
  onToggleNotApplicable,
  children,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload?.(id, e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleView = () => {
    if (onView) {
      onView({ id, title, fileName, file });
    } else if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    } else {
      alert(`Viewing ${fileName || title}`);
    }
  };

  const handleReplaceClick = () => {
    if (onReplace) {
      onReplace(id);
    } else {
      fileInputRef.current?.click();
    }
  };

  const effectiveSubtitle = subtitle || desc;

  return (
    <div
      className={`supporting-doc-item ${isUploaded ? "supporting-doc-item--uploaded" : ""} ${className}`}
      data-testid={`doc-card-${id}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="supporting-doc-item__file-input"
        onChange={handleFileChange}
      />

      {/* Main Card Content */}
      <div className="supporting-doc-item__main">
        <div className="supporting-doc-item__left">
          <div
            className="supporting-doc-item__icon-box"
            {...(iconBg || iconColor
              ? {
                  style: {
                    ...(iconBg ? { backgroundColor: iconBg } : {}),
                    ...(iconColor ? { color: iconColor } : {}),
                  },
                }
              : {})}
            aria-hidden="true"
          >
            {icon || (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            )}
          </div>

          <div className="supporting-doc-item__meta">
            <div className="supporting-doc-item__title-row">
              <span className="supporting-doc-item__title">
                {title}{" "}
                {isRequired && !badge && (
                  <span className="supporting-doc-item__required">*</span>
                )}
              </span>
              {badge}
            </div>
            {effectiveSubtitle && (
              <span className="supporting-doc-item__subtitle">
                {effectiveSubtitle}
              </span>
            )}
            {isUploaded && (
              <span className="supporting-doc-item__filename">
                {fileName || file?.name || "Document uploaded"}{" "}
                {fileSize ? `(${fileSize})` : ""}
              </span>
            )}
            {children}
          </div>
        </div>

        {/* Right side status / button */}
        {isUploaded ? (
          <div className="supporting-doc-item__uploaded-badge">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Uploaded</span>
          </div>
        ) : isNotApplicable ? (
          <div className="supporting-doc-item__na-wrap">
            <span className="supporting-doc-item__na-badge">
              Not Applicable
            </span>
            {onToggleNotApplicable && (
              <button
                type="button"
                className="supporting-doc-item__na-undo"
                onClick={() => onToggleNotApplicable(id)}
              >
                Change
              </button>
            )}
          </div>
        ) : (
          <div className="supporting-doc-item__btn-group">
            <button
              type="button"
              className="supporting-doc-item__upload-btn"
              onClick={() => fileInputRef.current?.click()}
              aria-label={`Upload ${title}`}
              data-testid={`upload-btn-${id}`}
            >
              {uploadIcon || (
                <svg
                  className="supporting-doc-item__cloud-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  <polyline points="9 14 12 11 15 14" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                </svg>
              )}
              <span>{uploadLabel}</span>
            </button>
            {onToggleNotApplicable && !isRequired && (
              <button
                type="button"
                className="supporting-doc-item__na-btn"
                onClick={() => onToggleNotApplicable(id)}
              >
                Not Applicable
              </button>
            )}
          </div>
        )}
      </div>

      {/* Uploaded Actions Footer Bar: View Document | Replace | Trash */}
      {isUploaded && (
        <>
          <div className="supporting-doc-item__divider" />
          <div className="supporting-doc-item__bottom-bar">
            <button
              type="button"
              className="supporting-doc-item__action-link supporting-doc-item__action-link--view"
              onClick={handleView}
              data-testid={`view-doc-${id}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>View Document</span>
            </button>

            <span
              className="supporting-doc-item__divider-vertical"
              aria-hidden="true"
            />

            <button
              type="button"
              className="supporting-doc-item__action-link supporting-doc-item__action-link--replace"
              onClick={handleReplaceClick}
              data-testid={`replace-doc-${id}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              <span>Replace</span>
            </button>

            <span
              className="supporting-doc-item__divider-vertical"
              aria-hidden="true"
            />

            <button
              type="button"
              className="supporting-doc-item__action-link supporting-doc-item__action-link--delete supporting-doc-item__trash-btn"
              onClick={() => onRemove?.(id)}
              title="Delete document"
              aria-label="Delete document"
              data-testid={`delete-doc-${id}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Aliases for compatibility
export const uploadDocument = UploadDocument;
export const DocumentCard = UploadDocument;

export default UploadDocument;
