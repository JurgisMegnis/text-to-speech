import './style.scss'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const characterListTemplate: ListTemplate = new ListTemplate("dropdown-character", "name")
    characterListTemplate.populate()
    characterListTemplate.getSelected()
    
    const languageListTemplate: ListTemplate = new ListTemplate("dropdown-language", "lang")
    languageListTemplate.populate()
    languageListTemplate.getSelected()
}

initApp()