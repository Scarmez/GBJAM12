/** The Audio Manager class acts like a DAC. Attaches nodes to control various aspects of the sound. Mainly provides a way to globally control audio volume. */
export class AudioManager {

    private audioCTX: AudioContext;
    private sfxGainNode: GainNode;
    private bgGainNode: GainNode;

    constructor(){
        this.audioCTX = new AudioContext();

        this.sfxGainNode = this.audioCTX.createGain();
        this.sfxGainNode.gain.value = 1;
        this.sfxGainNode.connect(this.audioCTX.destination);

        this.bgGainNode = this.audioCTX.createGain();
        this.bgGainNode.gain.value = 1;
        this.bgGainNode.connect(this.audioCTX.destination);
    }

    public attachAudio(audio: HTMLAudioElement){
        const source = this.audioCTX.createMediaElementSource(audio);
        source.connect(this.sfxGainNode);
    }

    public setSFXVolume(value:number){ this.sfxGainNode.gain.value = value; }
    public setBGVolume(value: number){ this.bgGainNode.gain.value = value; }

}