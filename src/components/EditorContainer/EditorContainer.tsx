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

  const handleSmartCheck = async () => {
    if (localJson) {
      const response = await clientAxiosInstance.post<undefined, AxiosResponse<SmartCheckResponse>, SmartCheckRequest>(
        '/api/check', {
          template: localJson,
          checks: [
            { 
              "category": SmartCheckCategory.MISSING_ALT_TEXT 
            },
            {
              "category": SmartCheckCategory.OVERAGE_IMAGE_WEIGHT,
              "limit": 500,
            },
            {
              "category": SmartCheckCategory.MISSING_COPY_LINK,
            },
            {
              "category": SmartCheckCategory.MISSING_IMAGE_LINK,
            },
            {
              "category": SmartCheckCategory.OVERAGE_HTML_WEIGHT,
              "limit": 5000,
              "beautified": true
            },
          ]
        }
      )

      const defaultSmartCheckResult = response.data.find(e => e.language === 'default')

      if (defaultSmartCheckResult) {
        setSmartCheckResults(defaultSmartCheckResult)
      }
    }
  }

  const selectSmartChecksTarget = async (editorInstance: BeePlugin, uuid: string, selector: string | null) => {
    await editorInstance.execCommand(ExecCommands.SELECT, { target: { uuid } })
    if (selector) {
      await editorInstance.execCommand(ExecCommands.FOCUS, { target: { selector } })
    }
  }

  const hoverSmartChecksTarget = async (editorInstance: BeePlugin, uuid: string) => {
    await editorInstance.execCommand(ExecCommands.SCROLL, { target: { uuid } })
    await editorInstance.execCommand(ExecCommands.HIGHLIGHT, { target: { uuid } })
  }

  return (
    <div className={styles.Container}>
      {
        pluginInstance && (
          <HeaderEditor
            onSmartCheck={handleSmartCheck}
            smartCheckResults={smartCheckResults}
            onTargetClick={(uuid: string, key: string | null) => selectSmartChecksTarget(pluginInstance, uuid, key)}
            onTargetHover={(uuid: string) => hoverSmartChecksTarget(pluginInstance, uuid)}
            isEditorReady={!!pluginInstance}
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
