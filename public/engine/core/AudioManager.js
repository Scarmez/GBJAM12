/** The Audio Manager class acts like a DAC. Attaches nodes to control various aspects of the sound. Mainly provides a way to globally control audio volume. */
export class AudioManager {
    audioCTX;
    sfxGainNode;
    bgGainNode;
    constructor() {
        this.audioCTX = new AudioContext();
        this.sfxGainNode = this.audioCTX.createGain();
        this.sfxGainNode.gain.value = 1;
        this.sfxGainNode.connect(this.audioCTX.destination);
        this.bgGainNode = this.audioCTX.createGain();
        this.bgGainNode.gain.value = 1;
        this.bgGainNode.connect(this.audioCTX.destination);
    }
    attachAudio(audio) {
        const source = this.audioCTX.createMediaElementSource(audio);
        source.connect(this.sfxGainNode);
    }
    setSFXVolume(value) { this.sfxGainNode.gain.value = value; }
    setBGVolume(value) { this.bgGainNode.gain.value = value; }
}
