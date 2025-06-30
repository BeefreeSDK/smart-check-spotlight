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
      <button onClick={onSmartCheck} >
          Smart Check
      </button>
    </span>
  )


  return (
    <div className={styles.HeaderEditor}>
      { smartCheckBlock }
    </div>
  )
}

export { HeaderEditor }
