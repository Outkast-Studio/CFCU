import { useGlobalSettingsStore } from 'stores/globalSettingsStore'
import SearchBar from './SearchBar'
const Menu = () => {
  const globalSettings = useGlobalSettingsStore((state) => state.globalSettings)
  return <nav></nav>
}

export default Menu
