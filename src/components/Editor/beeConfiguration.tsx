import { IBeeConfig } from "@beefree.io/sdk/dist/types/bee"

const getBeeConfiguration = ({
  onChange,
  onStart
}: {
  onChange: (json: string) => void
  onStart: () => void
}): IBeeConfig => ({
  container: "bee-plugin-container",
  defaultTab: "content",
  defaultColors: [],
  disableColorHistory: true,
  disableBaseColors: false,
  workspace: {
    hideStageToggle: false
  },
  trackChanges: true,
  onChange,
  onStart
})

export { getBeeConfiguration }
