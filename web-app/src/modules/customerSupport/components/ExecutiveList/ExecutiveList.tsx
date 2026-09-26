import type { SupportExecutive } from '../../types/customerSupport.types'
import './ExecutiveList.css'

interface ExecutiveListProps {
  executives: SupportExecutive[]
  activeExecutiveId?: string
  onSelectExecutive: (executive: SupportExecutive) => void
}

export const ExecutiveList = ({
  executives,
  activeExecutiveId,
  onSelectExecutive,
}: ExecutiveListProps) => {
  return (
    <div className="cs-exec-card">
      <div className="cs-exec-card__header">
        <h3 className="cs-exec-card__title">Your Dedicated Specialists</h3>
        <span className="cs-exec-card__count">{executives.length} Experts</span>
      </div>

      <div className="cs-exec-card__items">
        {executives.map((exec) => {
          const isActive = exec.id === activeExecutiveId
          const isOnline = exec.status === 'Online'

          return (
            <button
              key={exec.id}
              type="button"
              className={`cs-exec-item ${isActive ? 'cs-exec-item--active' : ''}`}
              onClick={() => onSelectExecutive(exec)}
            >
              <div className="cs-exec-item__avatar">
                {exec.avatarInitials}
              </div>

              <div className="cs-exec-item__details">
                <span className="cs-exec-item__name">{exec.name}</span>
                <span className="cs-exec-item__dept">{exec.department}</span>
                <span className="cs-exec-item__role">{exec.role}</span>
              </div>

              <div className="cs-exec-item__status-wrapper">
                <span
                  className={`cs-exec-item__badge ${
                    isOnline
                      ? 'cs-exec-item__badge--online'
                      : 'cs-exec-item__badge--away'
                  }`}
                >
                  {exec.status}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
