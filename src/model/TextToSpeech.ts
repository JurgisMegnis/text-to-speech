import GetVoices from "./GetVoices"

interface SpeakMethod {
    speak(): Promise<void>
}

interface SelectionChangedDetail {
    selectedValue: string | null
}

export default class TextToSpeech implements SpeakMethod {
    private textField: HTMLTextAreaElement
    private selectedVoice: string | null
    
    constructor(textField: HTMLTextAreaElement, eventTarget: EventTarget) {
        this.textField = textField
        this.selectedVoice = null

        eventTarget.addEventListener('selectionChanged', ((event: Event) => {
            const customEvent = event as CustomEvent<SelectionChangedDetail>
            this.selectedVoice = customEvent.detail.selectedValue
        }) as EventListener)
    }

    async speak(): Promise<void> {
        const utterThis = new SpeechSynthesisUtterance(this.textField.value)
        const getVoicesClass: GetVoices = new GetVoices()
        const synth: SpeechSynthesis = getVoicesClass.synth
        
        if (this.selectedVoice) {
            const voices = await getVoicesClass.getVoiceObj()
            const selectedVoiceObj = voices.find(v => v.name === this.selectedVoice)
            if (selectedVoiceObj) {
                utterThis.voice = selectedVoiceObj
            }
        }

        synth.speak(utterThis)
        this.textField.blur()
    }
}