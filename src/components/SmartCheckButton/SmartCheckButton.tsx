import { useEffect, useState } from "react"
import { Popover } from "react-tiny-popover"
import styles from './SmartCheckButton.module.scss'
import { BasicSmartCheckResponse, SmartCheckCategory, SmartChecksStatus } from "@/app/api/check/types"

interface SmartCheckButtonProps {
   onSmartCheck: () => void
   smartCheckResults: BasicSmartCheckResponse | null
   onSelectTarget: (uuid: string) => Promise<void> | null
   onHoverTarget: (uuid: string) => Promise<void> | null
}

export const SmartCheckButton = ({ onSmartCheck, smartCheckResults, onSelectTarget, onHoverTarget }: SmartCheckButtonProps) => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleOnClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  useEffect(() => {
    if (isPopoverOpen) {
      onSmartCheck()
    }
  }, [isPopoverOpen, onSmartCheck])

  const getStatusIcon = (status: SmartChecksStatus) => {
    switch (status) {
      case SmartChecksStatus.PASSED:
        return "✅"
      case SmartChecksStatus.WARNING:
        return "⚠️"
      case SmartChecksStatus.SUGGESTION:
        return "💡"
      default:
        return "❓"
    }
  }

  const getStatusColor = (status: SmartChecksStatus) => {
    switch (status) {
      case SmartChecksStatus.PASSED:
        return styles.passed
      case SmartChecksStatus.WARNING:
        return styles.warning
      case SmartChecksStatus.SUGGESTION:
        return styles.suggestion
      default:
        return styles.default
    }
  }

  const formatCheckType = (type: SmartCheckCategory) => {
    switch (type) {
      case SmartCheckCategory.MISSING_ALT_TEXT:
        return "Missing Alt Text"
      case SmartCheckCategory.MISSING_IMAGE_LINK:
        return "Missing Image Link"
      case SmartCheckCategory.MISSING_COPY_LINK:
        return "Missing Copy Link"
      case SmartCheckCategory.OVERAGE_IMAGE_WEIGHT:
        return "Image Weight Over Limit"
      case SmartCheckCategory.MISSING_EMAIL_DETAILS:
        return "Missing Email Details"
      case SmartCheckCategory.OVERAGE_HTML_WEIGHT:
        return "HTML Weight Over Limit"
      default:
        return type
    }
  }

  const handleTargetClick = async (uuid: string) => {
    if (onSelectTarget) {
      await onSelectTarget(uuid)
      setIsPopoverOpen(false)
    }
  }

  const handleTargetHover = async (uuid: string) => {
    if (onHoverTarget) {
      await onHoverTarget(uuid)
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
            <div key={index} className={`${styles.checkItem} ${getStatusColor(check.checkStatus)}`}>
              <div className={styles.checkHeader}>
                <span className={styles.statusIcon}>{getStatusIcon(check.checkStatus)}</span>
                <span className={styles.checkType}>{formatCheckType(check.type)}</span>
                <span className={styles.targetsCount}>({check.targetsCount})</span>
              </div>
           
              {check.targets && check.targets.length > 0 && (
                <div className={styles.targetsList}>
                  {check.targets.map((target, targetIndex) => (
                    <button
                      key={targetIndex}
                      className={styles.targetButton}
                      onClick={() => handleTargetClick(target.uuid)}
                      onMouseEnter={() => handleTargetHover(target.uuid)}
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
      <button onClick={handleOnClick} className={styles.smartCheckButton}>
        Check
      </button>
    </Popover>
  )
}