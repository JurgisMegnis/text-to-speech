import './sass/style.scss'
import { eventBus } from './model/EventBus'
import SettingsTemplate from './templates/SettingsTemplate'
import FormTemplate from './templates/FormTemplate'

const initApp = (): void => {
    new SettingsTemplate("dropdown-voice", ".speed-selector", eventBus)
    new FormTemplate("text-input", "text-to-speech-btn")
}

initApp()