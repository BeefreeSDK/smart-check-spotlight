'use client'

import { Editor } from '@/components/Editor/Editor'
import { HeaderEditor } from '@/components/EditorHeader/EditorHeader'
import { TemplateSelector } from '@/components/TemplateSelector/TemplateSelector'
import { useCallback, useState } from 'react'
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

  const handleSmartCheck = useCallback(async () => {
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
          ]
        }
      )

      const defaultSmartCheckResult = response.data.find(e => e.language === 'default')

      if (defaultSmartCheckResult) {
        setSmartCheckResults(defaultSmartCheckResult)
      }
    }
  }, [localJson])

  const selectSmartChecksTarget = async (editorInstance: BeePlugin, uuid: string) => {
    await editorInstance.execCommand(ExecCommands.SELECT, { target: { uuid } })
  }

  const hoverSmartChecksTarget = async (editorInstance: BeePlugin, uuid: string) => {
    await editorInstance.execCommand(ExecCommands.SCROLL, { target: { uuid } })
    await editorInstance.execCommand(ExecCommands.HIGHLIGHT, { target: { uuid } })
  }

  const handleOnChange = (json: string) => {
    setLocalJson(JSON.parse(json))
  }

  return (
    <div className={styles.Container}>
      <HeaderEditor
        onSmartCheck={handleSmartCheck}
        smartCheckResults={smartCheckResults}
        onSelectTarget={(uuid: string) => pluginInstance && selectSmartChecksTarget(pluginInstance, uuid)}
        onHoverTarget={(uuid: string) => pluginInstance && hoverSmartChecksTarget(pluginInstance, uuid)}
      />
      {
        localJson 
          ? <Editor
              onInstanceCreated={setPluginInstance}
              onStart={onPluginStart}
              template={localJson}
              onChange={handleOnChange}
            />
          : <TemplateSelector onLoadTemplate={handleLoadTemplate} />
      }
      <Loader show={!!localJson && !beeLoaderDone} />
    </div>
  )
}

export { EditorContainer }
