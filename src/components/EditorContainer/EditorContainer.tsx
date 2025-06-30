'use client'

import { Editor } from '@/components/Editor/Editor'
import { HeaderEditor } from '@/components/EditorHeader/EditorHeader'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IEntityContentJson } from '@beefree.io/sdk/dist/types/bee'
import { Loader } from '../BeeLoader/BeeLoader'
import styles from '@/components/EditorContainer/EditorContainer.module.scss'
import BeePlugin from '@beefree.io/sdk'
import { clientAxiosInstance } from '@/helpers/axios'

const EditorContainer = () => {
  const searchParams = useSearchParams()
  const templateSlug = searchParams.get('template')
  const [isBootstrapped, setIsBootstrapped] = useState(false)
  const [, setPluginInstance] = useState<BeePlugin | null>(null)
  const [beeLoaderDone, setBeeLoaderDone] = useState(false)
  const [localJson, setLocalJson] = useState<IEntityContentJson | null>(null)
  const router = useRouter()

  const onPluginStart = () => {
    setBeeLoaderDone(true)
  }

  useEffect(() => {
    if (!templateSlug) {
      router.replace('?template=empty')
    } else {
      void clientAxiosInstance.get<IEntityContentJson>(`api/editor/templates/${templateSlug}`).then((response) => {
          setLocalJson(response.data)
          setIsBootstrapped(true)
      })
    }
  }, [templateSlug, router])

  return (

    <div className={styles.Container}>
      <HeaderEditor
        onSmartCheck={() => { /* void */ }}
      />
      {
        localJson && isBootstrapped &&
          <Editor
            template={localJson}
            onInstanceCreated={setPluginInstance}
            onChange={() => { /* void */ }}
            onWarning={() => { /* void */ }}
            onStart={onPluginStart}
          />
      }
      <Loader show={!beeLoaderDone} />
    </div>

  )
}

export { EditorContainer }
