import './style.scss'
import ListTemplate from './templates/ListTemplate'
import { eventBus } from './model/EventBus'

const initApp = (): void => {
    new ListTemplate("dropdown-voice", eventBus)
}

initApp()