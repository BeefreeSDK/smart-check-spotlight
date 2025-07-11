import { Popover } from "react-tiny-popover"
import styles from './CheckButton.module.scss'
import { BasicCheckAPIResponse, CheckAPICategory, CheckAPIStatus } from "@/app/api/check/types"

interface CheckButtonProps {
  isPopoverOpen: boolean
  checkResults: BasicCheckAPIResponse | null
  onClick?: () => void
  onTargetClick?: (uuid: string, selector: string | null) => void
  onTargetHover?: (uuid: string) => void
}

export const CheckButton = ({ isPopoverOpen, checkResults, onClick, onTargetClick, onTargetHover }: CheckButtonProps) => {

  const checkStatusToStyle: Record<CheckAPIStatus, string> = {
    [CheckAPIStatus.PASSED]: styles.passed,
    [CheckAPIStatus.WARNING]: styles.warning,
    [CheckAPIStatus.SUGGESTION]: styles.suggestion,
  }

  const checkStatusToIcon: Record<CheckAPIStatus, string> = {
    [CheckAPIStatus.PASSED]: "✅",
    [CheckAPIStatus.WARNING]: "⚠️",
    [CheckAPIStatus.SUGGESTION]: "💡",
  }

  const checkTypeToLabel: Record<CheckAPICategory, string> = {
    [CheckAPICategory.MISSING_ALT_TEXT]: "Missing Alt Text",
    [CheckAPICategory.MISSING_IMAGE_LINK]: "Missing Image Link",
    [CheckAPICategory.MISSING_COPY_LINK]: "Missing Copy Link",
    [CheckAPICategory.OVERAGE_IMAGE_WEIGHT]: "Image Weight Over Limit",
    [CheckAPICategory.OVERAGE_HTML_WEIGHT]: "HTML Weight Over Limit",
  }

  const checkTypeToSelector: Record<CheckAPICategory, string | null> = {
    [CheckAPICategory.MISSING_ALT_TEXT]: '.alternate-txt--cs',
    [CheckAPICategory.MISSING_IMAGE_LINK]: '.href-container--cs',
    [CheckAPICategory.MISSING_COPY_LINK]: '.href-container--cs',
    [CheckAPICategory.OVERAGE_IMAGE_WEIGHT]: null,
    [CheckAPICategory.OVERAGE_HTML_WEIGHT]: null,
  }

  const handleOnTargetClick = (uuid: string, checkType: CheckAPICategory) => {
    if (onTargetClick) {
      onTargetClick(uuid, checkTypeToSelector[checkType])
    }
  }

  const handleOnTargetHover = (uuid: string) => {
    if (onTargetHover) {
      onTargetHover(uuid)
    }
  }

  const content = (
    <div className={styles.popoverContent}>
      <div className={styles.header}>
        <h3>Check Results</h3>
        {checkResults && (
          <div className={styles.summary}>
            <span className={styles.summaryItem}>
              <span className={styles.warning}>⚠️ {checkResults.checksWarningCount}</span>
            </span>
            <span className={styles.summaryItem}>
              <span className={styles.suggestion}>💡 {checkResults.checksSuggestionCount}</span>
            </span>
          </div>
        )}
      </div>
      
      {checkResults ? (
        <div className={styles.checksList}>
          {checkResults.checks.map((check, index) => (
            <div key={index} className={`${styles.checkItem} ${checkStatusToStyle[check.checkStatus]}`}>
              <div className={styles.checkHeader}>
                <span className={styles.statusIcon}>{checkStatusToIcon[check.checkStatus]}</span>
                <span className={styles.checkType}>{checkTypeToLabel[check.type]}</span>
                <span className={styles.targetsCount}>({check.targetsCount})</span>
              </div>
           
              {check.targets && check.targets.length > 0 && (
                <div className={styles.targetsList}>
                  {check.targets.map((target, targetIndex) => (
                    <button
                      key={targetIndex}
                      className={styles.targetButton}
                      onClick={() => handleOnTargetClick(target.uuid, check.type)}
                      onMouseEnter={() => handleOnTargetHover(target.uuid)}
                    >
                      {target.widgetType || 'Unknown Element'} 
                      <span className={styles.targetUuid}>({target.uuid})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Running checks...</p>
        </div>
      )}
    </div>
  )

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom']}
      content={content}
    >
      <button onClick={onClick} className={styles.CheckButton}>
        Check
      </button>
    </Popover>
  )
}