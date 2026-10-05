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
  onUploadClick?: (e: React.MouseEvent) => boolean | void;
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export type DocumentCardProps = UploadDocumentProps;

/**
 * Reusable execution helper that runs an action within structured exception handling.
 */
export function executeSafely<T>(
  action: () => T,
  fallback?: T,
  onError?: (err: unknown) => void,
): T | undefined {
  try {
    return action();
  } catch (err) {
    try {
      if (typeof onError === "function") {
        onError(err);
      } else {
        console.warn("UploadDocument: Protected operation failed safely:", err);
      }
    } catch {
      // Prevent secondary errors during logging/reporting
    }
    return fallback;
  }
}

/**
 * Extracts the primary uploaded file from a change event, safely resetting the input value.
 */
export function extractUploadedFile(
  e: React.ChangeEvent<HTMLInputElement>,
): File {
  try {
    const file = e.target.files?.[0];
    if (!file) {
      throw new Error("No file found in input change event");
    }
    return file;
  } finally {
    try {
      e.target.value = "";
    } catch {
      // Silently ignore target reset exceptions
    }
  }
}

/**
 * Handles document preview with graceful fallbacks and popup-blocker protection.
 */
export function openDocumentPreview(params: {
  id: string;
  title: string;
  fileName?: string;
  file?: File;
  onView?: (doc: {
    id: string;
    title: string;
    fileName?: string;
    file?: File;
  }) => void;
}): void {
  try {
    if (typeof params.onView === "function") {
      params.onView({
        id: params.id,
        title: params.title,
        fileName: params.fileName,
        file: params.file,
      });
      return;
    }

    if (params.file instanceof File) {
      let previewUrl = "";
      try {
        previewUrl = URL.createObjectURL(params.file);
        const openedWindow = window.open(previewUrl, "_blank", "noopener,noreferrer");
        if (!openedWindow) {
          throw new Error("Window open returned null (popup blocker)");
        }
      } catch (previewErr) {
        console.warn(
          "UploadDocument: Object URL preview failed, falling back to alert:",
          previewErr,
        );
        alert(`Viewing ${params.fileName || params.file.name || params.title}`);
      }
      return;
    }

    alert(`Viewing ${params.fileName || params.title}`);
  } catch (err) {
    console.error("UploadDocument: View preview failed entirely:", err);
  }
}

/**
 * Pure helper to compute custom icon styling without nested conditionals.
 */
export function buildIconStyle(
  iconBg?: string,
  iconColor?: string,
): React.CSSProperties | undefined {
  try {
    const style: React.CSSProperties = {};
    if (iconBg) style.backgroundColor = iconBg;
    if (iconColor) style.color = iconColor;
    return Object.keys(style).length > 0 ? style : undefined;
  } catch {
    return undefined;
  }
}

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
  onUploadClick,
  ariaLabel,
  isNotApplicable = false,
  onToggleNotApplicable,
  children,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    executeSafely(
      () => {
        const selectedFile = extractUploadedFile(e);
        onUpload?.(id, selectedFile);
      },
      undefined,
      (err) => console.warn("UploadDocument: File change handled safely:", err),
    );
  };

  const handleView = () => {
    openDocumentPreview({ id, title, fileName, file, onView });
  };

  const handleReplaceClick = (e: React.MouseEvent) => {
    executeSafely(
      () => {
        if (typeof onUploadClick === "function") {
          const allowed = onUploadClick(e);
          if (allowed === false) return;
        }
        onReplace?.(id);
        fileInputRef.current?.click();
      },
      undefined,
      (err) =>
        console.error("UploadDocument: Replace action failed safely:", err),
    );
  };

  const handleUploadBtnClick = (e: React.MouseEvent) => {
    executeSafely(
      () => {
        if (typeof onUploadClick === "function") {
          const allowed = onUploadClick(e);
          if (allowed === false) return;
        }
        fileInputRef.current?.click();
      },
      undefined,
      (err) =>
        console.error(
          "UploadDocument: Upload button click failed safely:",
          err,
        ),
    );
  };

  const handleDeleteClick = () => {
    executeSafely(
      () => onRemove?.(id),
      undefined,
      (err) =>
        console.error("UploadDocument: Delete action failed safely:", err),
    );
  };

  const handleToggleNotApplicable = () => {
    executeSafely(
      () => onToggleNotApplicable?.(id),
      undefined,
      (err) =>
        console.error(
          "UploadDocument: Toggle Not Applicable failed safely:",
          err,
        ),
    );
  };

  const effectiveSubtitle = subtitle || desc;
  const iconStyle = buildIconStyle(iconBg, iconColor);

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
            style={iconStyle}
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
                {isRequired && (
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
                onClick={handleToggleNotApplicable}
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
              onClick={handleUploadBtnClick}
              aria-label={ariaLabel || `Upload ${title}`}
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
                onClick={handleToggleNotApplicable}
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

            {/* Dedicated class (not the legacy __trash-btn) so other modules' styles cannot collapse it */}
            <button
              type="button"
              className="supporting-doc-item__action-link supporting-doc-item__delete-btn"
              onClick={handleDeleteClick}
              title={`Delete ${fileName || "document"}`}
              aria-label={`Delete ${title}${fileName ? ` (${fileName})` : ""}`}
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
              <span className="supporting-doc-item__delete-label">Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Aliases for backward and cross-import compatibility
export const uploadDocument = UploadDocument;
export const DocumentCard = UploadDocument;

export default UploadDocument;
