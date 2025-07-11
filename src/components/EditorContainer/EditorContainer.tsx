'use client'

import { Editor } from '@/components/Editor/Editor'
import { HeaderEditor } from '@/components/EditorHeader/EditorHeader'
import { TemplateSelector } from '@/components/TemplateSelector/TemplateSelector'
import { useState } from 'react'
import { IEntityContentJson } from '@beefree.io/sdk/dist/types/bee'
import { Loader } from '../BeeLoader/BeeLoader'
import styles from '@/components/EditorContainer/EditorContainer.module.scss'
import BeePlugin from '@beefree.io/sdk'
import { BasicCheckAPIResponse, CheckAPICategory, CheckAPIRequest, CheckAPIResponse } from '@/app/api/check/types'

const EditorContainer = () => {
  const [pluginInstance, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)
  const [checkResults, setCheckResults] = useState<BasicCheckAPIResponse | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

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

  /* STEP -1 Show env variables */
  /* STEP 0: The api call on the backend */
  /* STEP 1: Make a request to the Check API with a single check. */ 
  /* STEP 2: Send the response data to a component CheckButton to render the results. */
  /* STEP 3: Set up `onHover` handlers on suggestions and warnings. */
  /* STEP 4: Set up `onClick` handlers on suggestions and warnings. */
  /* STEP 5: Enable automatic checks to trigger validations as content is updated. */

  return (
    <div className={styles.Container}>
      {
        pluginInstance && (
          <HeaderEditor
            isPopoverOpen={isPopoverOpen}
            checkResults={checkResults}
          />
        )
      }
      {
        localJson ? (
          <Editor
            onInstanceCreated={setPluginInstance}
            onStart={onPluginStart}
            template={localJson}
            onChange={handleOnChange}
          />
        ) : (
          <TemplateSelector onLoadTemplate={handleLoadTemplate} />
        )
      }
      <Loader show={!!localJson && !beeLoaderDone} />
    </div>
  )
}

export { EditorContainer }
