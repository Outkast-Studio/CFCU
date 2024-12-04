import { create } from 'zustand'
import { GlobalSettingsType } from 'types/sanity'
type GlobalStore = {
  globalSettings: GlobalSettingsType
  setGlobalSettings: (globalSettings: GlobalSettingsType) => void
  alertIsOpen: boolean
  setAlertIsOpen: (alertIsOpen: boolean) => void
  alertHeight: number
  setAlertHeight: (alertHeight: number) => void
}

export const useGlobalSettingsStore = create<GlobalStore>()((set) => ({
  globalSettings: {} as GlobalSettingsType,
  setGlobalSettings: (globalSettings) => set({ globalSettings }),
  alertIsOpen: false,
  setAlertIsOpen: (alertIsOpen) => set({ alertIsOpen }),
  alertHeight: 0,
  setAlertHeight: (alertHeight) => set({ alertHeight }),
}))
