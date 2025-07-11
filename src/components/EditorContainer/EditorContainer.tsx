"use client"

import BeePlugin from "@beefree.io/sdk"
import {
  ExecCommands,
  IEntityContentJson
} from "@beefree.io/sdk/dist/types/bee"
import { AxiosResponse } from "axios"
import { useState } from "react"

import {
  BasicCheckAPIResponse,
  CheckAPICategory,
  CheckAPIRequest,
  CheckAPIResponse
} from "@/app/api/check/types"
import { Editor } from "@/components/Editor/Editor"
import styles from "@/components/EditorContainer/EditorContainer.module.scss"
import { HeaderEditor } from "@/components/EditorHeader/EditorHeader"
import { TemplateSelector } from "@/components/TemplateSelector/TemplateSelector"
import { clientAxiosInstance } from "@/helpers/axios"

import { Loader } from "../BeeLoader/BeeLoader"

const EditorContainer = () => {
  const [pluginInstance, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)
  const [checkResults, setCheckResults] = useState<BasicCheckAPIResponse>()
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
        console.error("Failed to load template:", filename)
      }
    } catch (error) {
      console.error("Error loading template:", error)
    }
  }

  const handleOnChange = (json: string) => {
    setLocalJson(JSON.parse(json))
  }

  const handleSmartCheck = async () => {
    if (isPopoverOpen) {
      setIsPopoverOpen(false)
    } else {
      setIsPopoverOpen(true)
      if (localJson) {
        const response = await clientAxiosInstance.post<
          undefined,
          AxiosResponse<CheckAPIResponse>,
          CheckAPIRequest
        >("/api/check", {
          template: localJson,
          checks: [
            {
              category: CheckAPICategory.MISSING_ALT_TEXT
            },
            {
              category: CheckAPICategory.OVERAGE_IMAGE_WEIGHT,
              limit: 500
            },
            {
              category: CheckAPICategory.MISSING_COPY_LINK
            },
            {
              category: CheckAPICategory.MISSING_IMAGE_LINK
            },
            {
              category: CheckAPICategory.OVERAGE_HTML_WEIGHT,
              limit: 5000,
              beautified: true
            }
          ]
        })

        const defaultSmartCheckResult = response.data.find(
          (e) => e.language === "default"
        )

        if (defaultSmartCheckResult) {
          setCheckResults(defaultSmartCheckResult)
        }
      }
    }
  }

  const hoverSmartChecksTarget = async (
    editorInstance: BeePlugin,
    uuid: string
  ) => {
    await editorInstance.execCommand(ExecCommands.SCROLL, { target: { uuid } })
    await editorInstance.execCommand(ExecCommands.HIGHLIGHT, {
      target: { uuid }
    })
  }

  const selectSmartChecksTarget = async (
    editorInstance: BeePlugin,
    uuid: string,
    selector: string | null
  ) => {
    await editorInstance.execCommand(ExecCommands.SELECT, { target: { uuid } })
    if (selector) {
      await editorInstance.execCommand(ExecCommands.FOCUS, {
        target: { selector }
      })
    }
    setIsPopoverOpen(false)
  }

  return (
    <div className={styles.Container}>
      {pluginInstance && (
        <HeaderEditor
          isPopoverOpen={isPopoverOpen}
          onCheck={handleSmartCheck}
          checkResults={checkResults}
          onTargetClick={(uuid: string, key: string | null) =>
            selectSmartChecksTarget(pluginInstance, uuid, key)
          }
          onTargetHover={(uuid: string) =>
            hoverSmartChecksTarget(pluginInstance, uuid)
          }
        />
      )}
      {localJson ? (
        <Editor
          onInstanceCreated={setPluginInstance}
          onStart={onPluginStart}
          template={localJson}
          onChange={handleOnChange}
        />
      ) : (
        <TemplateSelector onLoadTemplate={handleLoadTemplate} />
      )}
      <Loader show={!!localJson && !beeLoaderDone} />
    </div>
  )
}

export { EditorContainer }
