/* VARIABLES & SELECTORS */

const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputText = document.querySelector("textarea");
const voiceSelect = document.getElementById("dropdown-voice");

let voices;

function loadVoices() {
    voices = synth.getVoices();
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = i;
        voiceSelect.appendChild(option);
    })
}

if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}

inputForm.onsubmit = (event) => {
    event.preventDefault();

    const utterThis = new SpeechSynthesisUtterance(inputText.value);
    utterThis.voice = voices[voiceSelect.value];
    synth.speak(utterThis);
    inputText.blur();
}