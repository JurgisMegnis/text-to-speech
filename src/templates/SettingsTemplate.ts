import GetVoices from "../model/GetVoices"

export default class SettingsTemplate {
    private selectElement: HTMLSelectElement
    private speedSelector: NodeListOf<HTMLInputElement>
    private eventTarget: EventTarget

    constructor(selectElementId: string, speedSelectorClass: string, eventTarget: EventTarget) {
        this.selectElement = document.getElementById(selectElementId) as HTMLSelectElement
        this.speedSelector = document.querySelectorAll(speedSelectorClass) as NodeListOf<HTMLInputElement>
        this.eventTarget = eventTarget
        this.populate()
        this.getSelectedSpeed()
        this.getSelectedVoice()
    }

    /* populates the select element with voice options retrieved from the GetVoices model */
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

                if (voiceItem.default) {
                    option.selected = true
                }
            })            
        })
        .catch(error => {
            console.error(error)
        })
    }

    /* event listener for a change in the select element, retrieves the selected value and dispatches it */
    private getSelectedVoice(): void {
        this.selectElement.addEventListener('change', () => {
            let selectedVoiceValue: string | null = this.selectElement.selectedOptions[0].getAttribute("data-name")
            this.dispatchSelectedVoice(selectedVoiceValue)
        })
    }

    /* dispatches a custom event 'selectionChanged' with the selected voice value as detail */
    private dispatchSelectedVoice(selectedVoiceValue: string | null): void {
        const event = new CustomEvent('selectionChanged', { detail: {selectedVoiceValue} })
        this.eventTarget.dispatchEvent(event)
    }

    /* event listener for a change in the speed selector, retrieves the value and dispatches it */
    private getSelectedSpeed(): void {
        this.speedSelector.forEach((selector) => {
            selector.addEventListener('change', () => {
                let selectedSpeed: string = selector.value
                this.dispatchSelectedSpeed(selectedSpeed)
            })
        })
    }

    /* dispatches a custom event 'selectionChanged' with the selected speed value as detail */
    private dispatchSelectedSpeed(selectedSpeedValue: string): void {
        const event = new CustomEvent('selectionChanged', { detail: {selectedSpeedValue} })
        this.eventTarget.dispatchEvent(event)
    }
    
}