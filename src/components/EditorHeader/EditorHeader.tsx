'use client'

import styles from '@/components/EditorHeader/EditorHeader.module.scss'

interface HeaderEditorProps {
  onSmartCheck: () => void
}

const HeaderEditor = ({
  onSmartCheck,
}: HeaderEditorProps) => {

  const smartCheckBlock = (
    <span className={styles.Save}>
      <button onClick={onSmartCheck} className={styles.smartCheckButton}>
        Check
      </button>
    </span>
  )

  return (
    <header className={styles.HeaderEditor}>
      <div className={styles.headerContent}>
        <div className={styles.LeftBlock}>
          <div className={styles.logo}>
            <span>Smart Check Spotlight</span>
          </div>
        </div>
        
        <div className={styles.RightBlock}>
          {smartCheckBlock}
        </div>
      </div>
    </header>
  )
}

export { HeaderEditor }
