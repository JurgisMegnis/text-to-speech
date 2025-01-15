import './style.scss'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const eventTarget = new EventTarget()
    new ListTemplate("dropdown-language", "lang", eventTarget)
    new ListTemplate("dropdown-character", "name", eventTarget)
}

initApp()