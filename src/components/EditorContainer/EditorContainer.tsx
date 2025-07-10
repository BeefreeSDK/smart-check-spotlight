'use client'

import { Editor } from '@/components/Editor/Editor'
import { HeaderEditor } from '@/components/EditorHeader/EditorHeader'
import { TemplateSelector } from '@/components/TemplateSelector/TemplateSelector'
import { useState } from 'react'
import { ExecCommands, IEntityContentJson } from '@beefree.io/sdk/dist/types/bee'
import { Loader } from '../BeeLoader/BeeLoader'
import styles from '@/components/EditorContainer/EditorContainer.module.scss'
import BeePlugin from '@beefree.io/sdk'
import { clientAxiosInstance } from '@/helpers/axios'
import { BasicSmartCheckResponse, SmartCheckCategory, SmartCheckRequest, SmartCheckResponse } from '@/app/api/check/types'
import { AxiosResponse } from 'axios'

const EditorContainer = () => {
  const [pluginInstance, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)
  const [smartCheckResults, setSmartCheckResults] = useState<BasicSmartCheckResponse | null>(null)
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

  const handleSmartCheck = async () => {
    /* STEP 1: Make a request to the Smart Check API with a single check. */ 
    /* STEP 2: Send the response data to a component SmartCheckButton to render the results. */
  }

  const hoverSmartChecksTarget = async (editorInstance: BeePlugin, uuid: string) => {
    /* STEP 3: Set up `onHover` handlers on suggestions and warnings. */
  }

  const selectSmartChecksTarget = async (editorInstance: BeePlugin, uuid: string, selector: string | null) => {
    /* STEP 4: Set up `onClick` handlers on suggestions and warnings. */
  }

  const handleOnChange = (json: string) => {
    setLocalJson(JSON.parse(json))
    /* STEP 5: Enable automatic checks to trigger validations as content is updated. */
  }

  return (
    <div className={styles.Container}>
      {
        pluginInstance && (
          <HeaderEditor
            isPopoverOpen={isPopoverOpen}
            onSmartCheck={handleSmartCheck}
            smartCheckResults={smartCheckResults}
            onTargetClick={(uuid: string, key: string | null) => selectSmartChecksTarget(pluginInstance, uuid, key)}
            onTargetHover={(uuid: string) => hoverSmartChecksTarget(pluginInstance, uuid)}
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
