import { BeePluginError, IBeeConfig } from '@beefree.io/sdk/dist/types/bee'

const getBeeConfiguration = ({
  onChange,
  onWarning,
  onStart,
}: {
  onChange: (json: string) => void
  onWarning: (error: BeePluginError) => void
  onStart: () => void
}): IBeeConfig => ({
  container: 'bee-plugin-container',
  defaultTab: 'content',
  defaultColors: [],
  disableColorHistory: true,
  disableBaseColors: false,
  workspace: {
    hideStageToggle: false,
  },
  trackChanges: true,
  onChange,
  onWarning,
  onStart,
})

export { getBeeConfiguration }

