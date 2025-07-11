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
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)
  const [pluginInstance, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)

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

  const handleOnChange = (json: string) => {
    setLocalJson(JSON.parse(json))  
  }

  /* STEP 1: The env variables */
  /* STEP 2: The api call on the backend */
  /* STEP 3: Make a request to the Check API with a single check. */ 
  /* STEP 4: Send the response data to a component CheckButton to render the results. */
  /* STEP 5: Set up `onHover` handlers on suggestions and warnings. */
  /* STEP 6: Set up `onClick` handlers on suggestions and warnings. */
  /* STEP 7: Enable automatic checks to trigger validations as content is updated. */

  return (
    <div className={styles.Container}>
      {pluginInstance && <HeaderEditor />}
      {localJson ? (
        <>
          <Loader show={!beeLoaderDone} />
          <Editor
            onInstanceCreated={setPluginInstance}
            template={localJson}
            onChange={handleOnChange}
            onStart={onPluginStart}
          />
        </>
      ) : (
        <TemplateSelector onLoadTemplate={handleLoadTemplate} />
      )}
    </div>
  )
}

export { EditorContainer }
