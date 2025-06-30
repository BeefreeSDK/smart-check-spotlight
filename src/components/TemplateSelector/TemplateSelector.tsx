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
            onClick={() => onLoadTemplate('template-1.json')} 
            className={styles.templateButton}
          >
            Template 1
          </button>
          
          <button 
            onClick={() => onLoadTemplate('template-2.json')} 
            className={styles.templateButton}
          >
            Template 2
          </button>
          
          <button 
            onClick={() => onLoadTemplate('template-3.json')} 
            className={styles.templateButton}
          >
            Template 3
          </button>
        </div>
      </div>
    </div>
  )
}

export { TemplateSelector } 