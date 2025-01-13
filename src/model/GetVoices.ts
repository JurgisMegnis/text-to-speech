interface VoiceParameters {
    synth: SpeechSynthesis,
    voice: SpeechSynthesisVoice[],
    getVoiceObj(): Promise<SpeechSynthesisVoice[]>,
}

export default class GetVoices implements VoiceParameters {
    synth: SpeechSynthesis
    voice: SpeechSynthesisVoice[]

    constructor(voice: SpeechSynthesisVoice[] = [], synth: SpeechSynthesis = window.speechSynthesis) {
        this.synth = synth
        this.voice = voice
    }

    getVoiceObj(timeout: number = 5000): Promise<SpeechSynthesisVoice[]> {
        return new Promise((resolve, reject) => {
            const startTime: number = Date.now()

            const checkVoices = (): void => {
                this.voice = this.synth.getVoices()
                if (this.voice.length > 0) {
                    resolve(this.voice)
                } else if (Date.now() - startTime > timeout) {
                    reject("No voices available after timeout")
                } else {
                    setTimeout(checkVoices, 100)
                }
            }

            this.synth.onvoiceschanged = checkVoices
            checkVoices()
        })
    }
}