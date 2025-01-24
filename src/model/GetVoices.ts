interface SynthesisVoiceProvider {
    synth: SpeechSynthesis
    getVoiceObj(): Promise<SpeechSynthesisVoice[]>,
}

export default class GetVoices implements SynthesisVoiceProvider {
    synth: SpeechSynthesis
    private voice: SpeechSynthesisVoice[]

    constructor(synth: SpeechSynthesis = window.speechSynthesis) {
        this.synth = synth
        this.voice = []
    }

    getVoiceObj(timeout: number = 5000): Promise<SpeechSynthesisVoice[]> {
        return new Promise((resolve, reject) => {
            const startTime: number = Date.now()

            const checkVoices = (): void => {
                this.voice = this.synth.getVoices()
                this.voice.sort((a, b) => {
                    return a.lang.localeCompare(b.lang)
                })
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