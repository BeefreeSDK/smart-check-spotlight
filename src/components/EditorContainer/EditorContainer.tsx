'use client'

import { Editor } from '@/components/Editor/Editor'
import { HeaderEditor } from '@/components/EditorHeader/EditorHeader'
import { TemplateSelector } from '@/components/TemplateSelector/TemplateSelector'
import { useState } from 'react'
import { IEntityContentJson } from '@beefree.io/sdk/dist/types/bee'
import { Loader } from '../BeeLoader/BeeLoader'
import styles from '@/components/EditorContainer/EditorContainer.module.scss'
import BeePlugin from '@beefree.io/sdk'

const EditorContainer = () => {
  const [, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)

  const onPluginStart = () => {
    setBeeLoaderDone(true)
  }

  const handleLoadTemplate = async (filename: string) => {
    try {
      const response = await fetch(`/templates/${filename}`)
      if (response.ok) {
        const templateData = await response.json()
        setLocalJson(templateData)
      } else {
        console.error('Failed to load template:', filename)
      }
    } catch (error) {
      console.error('Error loading template:', error)
    }
  }

  return (
    <div className={styles.Container}>
      <HeaderEditor
        onSmartCheck={() => { /* void */ }}
      />
      {localJson ? (
        <Editor
          template={localJson}
          onInstanceCreated={setPluginInstance}
          onChange={() => { /* void */ }}
          onWarning={() => { /* void */ }}
          onStart={onPluginStart}
        />
      ) : (
        <TemplateSelector onLoadTemplate={handleLoadTemplate} />
      )}
      <Loader show={!!localJson && !beeLoaderDone} />
    </div>
  )
}

export { EditorContainer }
