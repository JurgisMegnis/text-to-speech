import GetVoices from "./GetVoices"

interface SpeakMethod {
    utterThis: SpeechSynthesisUtterance
    speak(): Promise<void>
}

interface SelectionChangedDetail {
    selectedValue: string | null
}

export default class TextToSpeech implements SpeakMethod {
    private textField: HTMLTextAreaElement
    private selectedVoice: string | null
    utterThis: SpeechSynthesisUtterance
    
    constructor(textField: HTMLTextAreaElement, eventTarget: EventTarget) {
        this.textField = textField
        this.selectedVoice = null
        this.utterThis = new SpeechSynthesisUtterance

        eventTarget.addEventListener('selectionChanged', ((event: Event) => {
            const customEvent = event as CustomEvent<SelectionChangedDetail>
            this.selectedVoice = customEvent.detail.selectedValue
        }) as EventListener)
    }

    async speak(): Promise<void> {
        const getVoicesClass: GetVoices = new GetVoices()
        const synth: SpeechSynthesis = getVoicesClass.synth

        synth.cancel()
        
        if (this.textField.value === '') {
            this.utterThis.text = "Please write something for me to say"
            this.textField.classList.add('shake')
            setTimeout(() => {
                this.textField.classList.remove('shake')
            }, 500)
        } else {
            this.utterThis.text = this.textField.value
        }
        
        if (this.selectedVoice) {
            const voices = await getVoicesClass.getVoiceObj()
            const selectedVoiceObj = voices.find(v => v.name === this.selectedVoice)
            if (selectedVoiceObj) {
                this.utterThis.voice = selectedVoiceObj
            }
        }
    
        synth.speak(this.utterThis)
        this.textField.blur()
    }
}