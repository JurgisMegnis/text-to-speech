import GetVoices from "./GetVoices"

interface SpeakMethod {
    utterThis: SpeechSynthesisUtterance
    speak(): Promise<void>
}

interface SelectionChangedDetail {
    selectedVoiceValue: string | null
    selectedSpeedValue: string
}

export default class TextToSpeech implements SpeakMethod {
    private textField: HTMLTextAreaElement
    private selectedVoice: string | null
    private selectedSpeed: string
    private getVoicesClass: GetVoices
    utterThis: SpeechSynthesisUtterance
    
    constructor(textField: HTMLTextAreaElement, eventTarget: EventTarget) {
        this.textField = textField
        this.selectedVoice = null
        this.selectedSpeed = "1"
        this.utterThis = new SpeechSynthesisUtterance
        this.getVoicesClass = new GetVoices()

        /* event listener for voice change */
        eventTarget.addEventListener('selectionChanged', ((event: Event) => {
            const customEvent = event as CustomEvent<SelectionChangedDetail>
            this.selectedVoice = customEvent.detail.selectedVoiceValue
            this.selectedSpeed = customEvent.detail.selectedSpeedValue
        }) as EventListener)
    }

    /* assign the selected speed value to rate parameter */
    private getSelectedSpeed(): void {
        if (this.selectedSpeed) {
            this.utterThis.rate = Number(this.selectedSpeed)
        }
    }

    /* take the selected value and find it in the Voice Object, then assign it to the voice parameter */
    private async getSelectedVoice(): Promise<void> {
        if (this.selectedVoice) {
            const voices = await this.getVoicesClass.getVoiceObj()
            const selectedVoiceObj = voices.find(v => v.name === this.selectedVoice)
            if (selectedVoiceObj) {
                this.utterThis.voice = selectedVoiceObj
            }
        }
    }

    async speak(): Promise<void> {
        const synth: SpeechSynthesis = this.getVoicesClass.synth
        synth.cancel() // cancel if speech is in progress
        
        /* get the selected voice */
        await this.getSelectedVoice()

        /* get the selected speed */
        this.getSelectedSpeed()
        
        /* if text field is empty ask user to write something else use the text that has been input */
        if (this.textField.value === '') {
            this.utterThis.text = "Please write something for me to say"
            this.textField.classList.add('shake')
            setTimeout(() => {
                this.textField.classList.remove('shake')
            }, 500)
        } else {
            this.utterThis.text = this.textField.value
        }
        
        synth.speak(this.utterThis)
    }
}