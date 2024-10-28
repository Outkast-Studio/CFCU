import { create } from 'zustand'
import { GlobalSettingsType } from 'types/sanity'
type GlobalStore = {
  globalSettings: GlobalSettingsType
  setGlobalSettings: (globalSettings: GlobalSettingsType) => void
}

export const useGlobalSettingsStore = create<GlobalStore>()((set) => ({
  globalSettings: {} as GlobalSettingsType,
  setGlobalSettings: (globalSettings) => set({ globalSettings }),
}))
