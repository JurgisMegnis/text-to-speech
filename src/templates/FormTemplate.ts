import TextToSpeech from "../model/TextToSpeech";
import { eventBus } from "../model/EventBus";

export default class FormTemplate {
    private textFieldId: HTMLTextAreaElement
    private formTag: HTMLFormElement
    private textToSpeechClass: TextToSpeech

    constructor(textFieldId: string) {
        this.textFieldId = document.getElementById(textFieldId) as HTMLTextAreaElement
        this.formTag = document.querySelector("form") as HTMLFormElement
        this.textToSpeechClass = new TextToSpeech(this.textFieldId, eventBus)
        this.textSynthesis()
    }

    private textSynthesis(): void {
        const handleSubmit = (event: Event) => {
            event.preventDefault()
            this.textToSpeechClass.speak()
        }

        this.textFieldId.addEventListener('keydown', (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                handleSubmit(event)
            }
        })

        this.formTag.onsubmit = handleSubmit
    }
}