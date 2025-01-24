import GetVoices from "../model/GetVoices"

export default class ListTemplate {
    private selectElement: HTMLSelectElement
    private eventTarget: EventTarget

    constructor(selectElementId: string, eventTarget: EventTarget) {
        this.selectElement = document.getElementById(selectElementId) as HTMLSelectElement
        this.eventTarget = eventTarget
        this.populate()
        this.getSelectedValue()
    }

    private populate(): void {
        const languageList: GetVoices = new GetVoices()
        languageList.getVoiceObj()
        .then(voiceObj => {
            voiceObj.forEach((voiceItem, i) => {
                const option = document.createElement("option") as HTMLOptionElement
                option.textContent = `${voiceItem.name} (${voiceItem.lang})`
                option.value = i.toString()
                this.selectElement.appendChild(option)
                option.setAttribute("data-lang", voiceItem.lang)
                option.setAttribute("data-name", voiceItem.name)
            })            
        })
        .catch(error => {
            console.error(error)
        })
    }

    private getSelectedValue(): void {
        this.selectElement.addEventListener('change', () => {
            let selectedValue: string | null = this.selectElement.selectedOptions[0].getAttribute("data-name")
            this.dispatchSelectedValue(selectedValue)
        })
    }

    private dispatchSelectedValue(selectedValue: string | null): void {
        const event = new CustomEvent('selectionChanged', { detail: {selectedValue} })
        this.eventTarget.dispatchEvent(event)
    }
}