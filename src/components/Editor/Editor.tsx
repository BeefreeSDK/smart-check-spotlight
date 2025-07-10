'use client'

import React, { useEffect, useRef } from 'react'
import BeePlugin from '@beefree.io/sdk'
import { clientAxiosInstance } from '@/helpers/axios'
import styles from '@/components/Editor/Editor.module.scss'
import { IEntityContentJson, IToken } from '@beefree.io/sdk/dist/types/bee'
import { getBeeConfiguration } from './beeConfiguration'

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
  onStart,
}: EditorProps) => {
  const pluginStarted = useRef(false)
  const beeConfiguration = getBeeConfiguration({ onChange, onStart })

  useEffect(() => {
    if (!pluginStarted.current && template) {
      pluginStarted.current = true
      void clientAxiosInstance.post('api/auth/login', { template_type: 'email' })
        .then(({ data }: { data: IToken }) => {
          const beeInstance = new BeePlugin(data, {
            authUrl: process.env.NEXT_PUBLIC_BEEPLUGIN_AUTH_ENDPOINT,
            beePluginUrl: process.env.NEXT_PUBLIC_BEEPLUGIN_URL,
          })
          onInstanceCreated(beeInstance)
          void beeInstance.start(beeConfiguration, template, '', { shared: false })
        })
        .catch((error: unknown) => {
          console.log(error)
        })
    }
  }, [beeConfiguration, onInstanceCreated, template])

  return (
    <div id="bee-plugin-container" className={styles.BeePluginContainer} />
  )
}

export { Editor }

