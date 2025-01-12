import GetVoices from "../model/GetVoices"

interface ListParameters {
    selectElementId: HTMLSelectElement
    parameter: "lang" | "name"
    populate(): void
}

export default class ListTemplate implements ListParameters {
    selectElementId: HTMLSelectElement
    parameter: "lang" | "name"

    constructor(selectElementId: HTMLSelectElement, parameter: "lang" | "name") {
        this.selectElementId = selectElementId
        this.parameter = parameter
    }

    populate(): void {
        const languageList: GetVoices = new GetVoices()
        languageList.getVoiceObj()
        .then(voiceObj => {
            voiceObj.forEach((voiceItem, i ) => {
                const option = document.createElement("option") as HTMLOptionElement
                option.textContent = voiceItem[this.parameter]
                option.value = i.toString()
                this.selectElementId.appendChild(option)
            })
        })
        .catch(error => {
            console.error(error)
        })
    }
}