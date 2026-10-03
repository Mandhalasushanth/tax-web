import React from 'react'
import './LoanDocumentGrid.css'

/** Lays out loan document cards two per row (one per row on small screens). */
export const LoanDocumentGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="loan-doc-grid">{children}</div>
)

export default LoanDocumentGrid
