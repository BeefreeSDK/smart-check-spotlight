import { useEffect, useState } from "react"
import { Popover } from "react-tiny-popover"
import styles from './SmartCheckButton.module.scss'
import { BasicSmartCheckResponse, SmartCheckCategory, SmartChecksStatus } from "@/app/api/check/types"

interface SmartCheckButtonProps {
   disabled: boolean
   onSmartCheck: () => void
   smartCheckResults: BasicSmartCheckResponse | null
   onTargetClick: (uuid: string, selector: string | null) => Promise<void> | null
   onTargetHover: (uuid: string) => Promise<void> | null
}

export const SmartCheckButton = ({ disabled, onSmartCheck, smartCheckResults, onTargetClick, onTargetHover }: SmartCheckButtonProps) => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleOnClick = () => {
    if (isPopoverOpen) {
      setIsPopoverOpen(false)
    } else {
      setIsPopoverOpen(true)
      onSmartCheck()
    }
  }

  const checkStatusToStyle: Record<SmartChecksStatus, string> = {
    [SmartChecksStatus.PASSED]: styles.passed,
    [SmartChecksStatus.WARNING]: styles.warning,
    [SmartChecksStatus.SUGGESTION]: styles.suggestion,
  }

  const checkStatusToIcon: Record<SmartChecksStatus, string> = {
    [SmartChecksStatus.PASSED]: "✅",
    [SmartChecksStatus.WARNING]: "⚠️",
    [SmartChecksStatus.SUGGESTION]: "💡",
  }

  const checkTypeToLabel: Record<SmartCheckCategory, string> = {
    [SmartCheckCategory.MISSING_ALT_TEXT]: "Missing Alt Text",
    [SmartCheckCategory.MISSING_IMAGE_LINK]: "Missing Image Link",
    [SmartCheckCategory.MISSING_COPY_LINK]: "Missing Copy Link",
    [SmartCheckCategory.OVERAGE_IMAGE_WEIGHT]: "Image Weight Over Limit",
    [SmartCheckCategory.OVERAGE_HTML_WEIGHT]: "HTML Weight Over Limit",
  }

  const checkTypeToSelector: Record<SmartCheckCategory, string | null> = {
    [SmartCheckCategory.MISSING_ALT_TEXT]: '.alternate-txt--cs',
    [SmartCheckCategory.MISSING_IMAGE_LINK]: '.href-container--cs',
    [SmartCheckCategory.MISSING_COPY_LINK]: '.href-container--cs',
    [SmartCheckCategory.OVERAGE_IMAGE_WEIGHT]: null,
    [SmartCheckCategory.OVERAGE_HTML_WEIGHT]: null,
  }

  const handleOnTargetClick = async (uuid: string, checkType: SmartCheckCategory) => {
    if (onTargetClick) {
      await onTargetClick(uuid, checkTypeToSelector[checkType])
      setIsPopoverOpen(false)
    }
  }

  const handleOnTargetHover = async (uuid: string) => {
    if (onTargetHover) {
      await onTargetHover(uuid)
    }
  }

  const content = (
    <div className={styles.popoverContent}>
      <div className={styles.header}>
        <h3>Smart Check Results</h3>
        {smartCheckResults && (
          <div className={styles.summary}>
            <span className={styles.summaryItem}>
              <span className={styles.warning}>⚠️ {smartCheckResults.checksWarningCount}</span>
            </span>
            <span className={styles.summaryItem}>
              <span className={styles.suggestion}>💡 {smartCheckResults.checksSuggestionCount}</span>
            </span>
          </div>
        )}
      </div>
      
      {smartCheckResults ? (
        <div className={styles.checksList}>
          {smartCheckResults.checks.map((check, index) => (
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
          <p>Running smart checks...</p>
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
      <button onClick={handleOnClick} className={styles.smartCheckButton} disabled={disabled}>
        Check
      </button>
    </Popover>
  )
}