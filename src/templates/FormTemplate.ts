import TextToSpeech from "../model/TextToSpeech";
import { eventBus } from "../model/EventBus";
import { DotLottie } from '@lottiefiles/dotlottie-web';
const { BASE_URL } = import.meta.env;

export default class FormTemplate {
    private textFieldId: HTMLTextAreaElement
    private buttonId: HTMLButtonElement
    private formTag: HTMLFormElement
    private textToSpeechClass: TextToSpeech

    constructor(textFieldId: string, buttonId: string) {
        this.textFieldId = document.getElementById(textFieldId) as HTMLTextAreaElement
        this.buttonId = document.getElementById(buttonId) as HTMLButtonElement
        this.formTag = document.querySelector("form") as HTMLFormElement
        this.textToSpeechClass = new TextToSpeech(this.textFieldId, eventBus)
        this.textSynthesis()
        this.buttonState()
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

    private buttonState(): void {
        this.textToSpeechClass.utterThis.onstart = () => {
            this.buttonId.innerHTML ='<canvas id="dotlottie-canvas" style="width: 110px; height:24px;"></canvas>'
            new DotLottie({
                autoplay: true,
                loop: true,
                canvas: document.querySelector('#dotlottie-canvas') as HTMLCanvasElement,
                src: `${BASE_URL}animation/speech-icon.json`,
            });
        }

        this.textToSpeechClass.utterThis.onend = () => {
            this.buttonId.textContent = "Text to speech"
        } 
        
    }
}