'use client'

import styles from '@/components/EditorHeader/EditorHeader.module.scss'
import { SmartCheckButton } from '../SmartCheckButton/SmartCheckButton'
import { BasicSmartCheckResponse } from '@/app/api/check/types'

interface HeaderEditorProps {
  onSmartCheck: () => void
  smartCheckResults: BasicSmartCheckResponse | null
  onTargetClick: (uuid: string, selector: string | null) => Promise<void> | null
  onTargetHover: (uuid: string) => Promise<void> | null
  isEditorReady: boolean
}

const HeaderEditor = ({
  onSmartCheck,
  smartCheckResults,
  onTargetClick,
  onTargetHover,
  isEditorReady,
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
          onSmartCheck={onSmartCheck} 
          smartCheckResults={smartCheckResults}
          onTargetClick={onTargetClick}
          onTargetHover={onTargetHover}
          disabled={!isEditorReady}
        />
      </div>
    </div>
  </header>
  )

export { HeaderEditor }
