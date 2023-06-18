const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');

const options = document.querySelectorAll('[type="range"], [name="text"]');

const speakButton = document.querySelector('#speak');

const rateValue = document.querySelector('#rate-value');
const pitchValue = document.querySelector('#pitch-value');

msg.text = document.querySelector('[name="text"]').value;


// Populating the voices
function populateVoices() {

    // Getting the voices
    voices = this.getVoices();

    // Inserting voices into options
    voicesDropdown.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');

}



// Detecting which voice is selected
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

// Toggle when user is changing value
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

// Inserting values to input
function setOption() {

    if (this.name === "rate") {
        rateValue.textContent = this.value;
    } else if (this.name === "pitch") {
        pitchValue.textContent = this.value;
    }

    msg[this.name] = this.value;
    toggle();
}


speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);
