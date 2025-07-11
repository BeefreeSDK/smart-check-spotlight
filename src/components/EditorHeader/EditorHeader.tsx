'use client'

import styles from '@/components/EditorHeader/EditorHeader.module.scss'
import { SmartCheckButton } from '../SmartCheckButton/SmartCheckButton'
import { BasicSmartCheckResponse } from '@/app/api/check/types'

interface HeaderEditorProps {
  isPopoverOpen: boolean
  smartCheckResults: BasicSmartCheckResponse | null
  onSmartCheck?: () => void
  onTargetClick?: (uuid: string, selector: string | null) => void
  onTargetHover?: (uuid: string) => void
}

const HeaderEditor = ({
  isPopoverOpen,
  smartCheckResults,
  onSmartCheck,
  onTargetClick,
  onTargetHover,
}: HeaderEditorProps) => (
  <header className={styles.HeaderEditor}>
    <div className={styles.headerContent}>
      <div className={styles.LeftBlock}>
        <div className={styles.logo}>
          <span>Smart Check Spotlight</span>
        </div>
      </div>
      
      <div className={styles.RightBlock}>
        <SmartCheckButton 
          isPopoverOpen={isPopoverOpen}
          onClick={onSmartCheck}
          smartCheckResults={smartCheckResults}
          onTargetClick={onTargetClick}
          onTargetHover={onTargetHover}
        />
      </div>
    </div>
  </header>
  )

export { HeaderEditor }
