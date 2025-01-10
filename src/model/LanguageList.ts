export interface Language {
    synth: SpeechSynthesis,
    language: SpeechSynthesisVoice[],
    populateLanguageList(): void,
}

export default class LanguageList implements Language {

    static instance: LanguageList = new LanguageList()

    private constructor(private _language: SpeechSynthesisVoice[] = [], private _synth: SpeechSynthesis = window.speechSynthesis){}

    get language(): SpeechSynthesisVoice[] {
        return this._language
    }

    get synth(): SpeechSynthesis {
        return this._synth
    }

    populateLanguageList(): void {
        this._language = this._synth.getVoices()
        const languageSelector = document.getElementById("dropdown-language") as HTMLSelectElement

        this._language.forEach((item, i) => {
            const option = document.createElement("option") as HTMLOptionElement
            option.textContent = item.lang
            option.value = i.toString();
            languageSelector.appendChild(option);
        })
    }
}