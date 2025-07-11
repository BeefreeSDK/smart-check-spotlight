'use client'

import styles from '@/components/EditorHeader/EditorHeader.module.scss'
import { CheckButton } from '../CheckButton/CheckButton'
import { BasicCheckAPIResponse } from '@/app/api/check/types'

interface HeaderEditorProps {
  isPopoverOpen?: boolean
  checkResults?: BasicCheckAPIResponse
  onCheck?: () => void
  onTargetClick?: (uuid: string, selector: string | null) => void
  onTargetHover?: (uuid: string) => void
}

const HeaderEditor = ({
  isPopoverOpen,
  checkResults,
  onCheck,
  onTargetClick,
  onTargetHover,
}: HeaderEditorProps) => (
  <header className={styles.HeaderEditor}>
    <div className={styles.headerContent}>
      <div className={styles.LeftBlock}>
        <div className={styles.logo}>
          <span>Check API Spotlight</span>
        </div>
      </div>
      
      <div className={styles.RightBlock}>
        <CheckButton 
          isPopoverOpen={isPopoverOpen}
          onClick={onCheck}
          checkResults={checkResults}
          onTargetClick={onTargetClick}
          onTargetHover={onTargetHover}
        />
      </div>
    </div>
  </header>
  )

export { HeaderEditor }
