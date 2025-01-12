import './style.scss'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const characterListTemplate: ListTemplate = new ListTemplate((document.getElementById("dropdown-character")) as HTMLSelectElement, "name")
    characterListTemplate.populate()
    
    const languageListTemplate: ListTemplate = new ListTemplate((document.getElementById("dropdown-language")) as HTMLSelectElement, "lang")
    languageListTemplate.populate()
}

initApp()