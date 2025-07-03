'use client'

import styles from './TemplateSelector.module.scss'

interface TemplateSelectorProps {
  onLoadTemplate: (filename: string) => void
}

const TemplateSelector = ({ onLoadTemplate }: TemplateSelectorProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Select a Template</h1>
        </div>
        
        <div className={styles.templateGrid}>
          <button 
            onClick={() => onLoadTemplate('simple-template.json')} 
            className={styles.templateButton}
          >
            Simple Template Example
          </button>
          <button 
            onClick={() => onLoadTemplate('complex-template.json')} 
            className={styles.templateButton}
          >
            Complex Template Example
          </button>
        </div>
      </div>
    </div>
  )
}

export { TemplateSelector } 