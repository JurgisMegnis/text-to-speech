import './sass/style.scss'
import { eventBus } from './model/EventBus'
import ListTemplate from './templates/ListTemplate'
import FormTemplate from './templates/FormTemplate'

const initApp = (): void => {
    new ListTemplate("dropdown-voice", eventBus)
    new FormTemplate("text-input", "text-to-speech-btn")
}

initApp()