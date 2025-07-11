"use client"

import BeePlugin from "@beefree.io/sdk"
import { IEntityContentJson, IToken } from "@beefree.io/sdk/dist/types/bee"
import { useEffect, useRef } from "react"

import styles from "@/components/Editor/Editor.module.scss"
import { clientAxiosInstance } from "@/helpers/axios"

import { getBeeConfiguration } from "./beeConfiguration"

interface EditorProps {
  template: IEntityContentJson
  onInstanceCreated: (instance: BeePlugin) => void
  onChange: (json: string) => void
  onStart: () => void
}

const Editor = ({
  template,
  onInstanceCreated,
  onChange,
  onStart
}: EditorProps) => {
  const bootstrapped = useRef(false)
  const beeConfiguration = getBeeConfiguration({ onChange, onStart })

  useEffect(() => {
    if (!bootstrapped.current && template) {
      bootstrapped.current = true
      void clientAxiosInstance
        .post("api/auth/login", { template_type: "email" })
        .then(({ data }: { data: IToken }) => {
          const beeInstance = new BeePlugin(data, {
            beePluginUrl: process.env.NEXT_PUBLIC_BEEPLUGIN_URL
          })
          onInstanceCreated(beeInstance)
          void beeInstance.start(beeConfiguration, template, "", {
            shared: false
          })
        })
        .catch((error: unknown) => {
          console.error(error)
        })
    }
  }, [beeConfiguration, onInstanceCreated, template])

  return <div id="bee-plugin-container" className={styles.BeePluginContainer} />
}

export { Editor }
