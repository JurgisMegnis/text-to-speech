import GetVoices from "../model/GetVoices"

interface ListParameters {
    selectElementId: HTMLSelectElement
    parameter: "lang" | "name"
    populate(): void
    getSelected(): void
}

export default class ListTemplate implements ListParameters {
    selectElementId: HTMLSelectElement
    parameter: "lang" | "name"

    constructor(selectElementId: string, parameter: "lang" | "name") {
        this.selectElementId = document.getElementById(selectElementId) as HTMLSelectElement
        this.parameter = parameter
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

    getSelected(): void {
        this.selectElementId.addEventListener('change', () => {
            if(this.parameter === "lang") {
                console.log(this.selectElementId.selectedOptions[0].getAttribute("data-lang"))
            } else if(this.parameter === "name") {
                console.log(this.selectElementId.selectedOptions[0].getAttribute("data-name"))
            }
        })
    }
}