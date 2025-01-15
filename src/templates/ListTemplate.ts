import GetVoices from "../model/GetVoices"

interface ListParameters {
    selectElementId: HTMLSelectElement
    parameter: "lang" | "name"
    populate(): void
    getSelectedValue(): void
}

export default class ListTemplate implements ListParameters {
    selectElementId: HTMLSelectElement
    parameter: "lang" | "name"
    private eventTarget: EventTarget

    constructor(selectElementId: string, parameter: "lang" | "name", eventTarget: EventTarget) {
        this.selectElementId = document.getElementById(selectElementId) as HTMLSelectElement
        this.parameter = parameter
        this.eventTarget = eventTarget
        this.populate()
        this.getSelectedValue()
    }

    populate(): void {
        const languageList: GetVoices = new GetVoices()
        languageList.getVoiceObj()
        .then(voiceObj => {
            voiceObj.forEach((voiceItem, i) => {
                const option = document.createElement("option") as HTMLOptionElement
                option.textContent = voiceItem[this.parameter]
                option.value = i.toString()
                this.selectElementId.appendChild(option)

                switch (this.parameter) {
                    case "lang":
                        option.setAttribute("data-lang", voiceItem.lang)
                        break;
                    case "name":
                        option.setAttribute("data-name", voiceItem.name)
                        break;
                }
            })            
        })
        .catch(error => {
            console.error(error)
        })
    }

    getSelectedValue(): void {
        this.selectElementId.addEventListener('change', () => {
            let selectedValue = null;

            if(this.parameter === "lang") {
                selectedValue = this.selectElementId.selectedOptions[0].getAttribute("data-lang")
            } else if(this.parameter === "name") {
                selectedValue = this.selectElementId.selectedOptions[0].getAttribute("data-name")                
            }

            this.dispatchSelectedValue(selectedValue)
        })
    }

    dispatchSelectedValue(selectedValue: string | null): void {
        const event = new CustomEvent('selectionChanged', { detail: {selectedValue, parameter: this.parameter} })
        this.eventTarget.dispatchEvent(event)
    }
}