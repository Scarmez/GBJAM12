import cauldron from "../animations/cauldron.js";
import creature from "../animations/creature.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { GameObject } from "../engine/GameObject.js";
import { GraphicsManager } from "../engine/GraphicsManager.js";
import { Scene } from "../engine/Scene.js";
import { Sprite } from "../engine/Sprite.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class RythymScene extends Scene { 

    private _state: RhythmState = RhythmState.READY;
    private _stateTimer: number = 2;

    private _musicTrack: HTMLAudioElement | undefined;
    private _badSound: HTMLAudioElement | undefined;

    private _score: number = 0;
    private _maxScore: number = 0;
    private _songNameDisplay: TextObject;
    private _noteStatusDisplay: TextObject;
    private _bigTextTime = 0;

    private _rhythmSprite: Sprite | undefined;
    private _creatureObj: AnimatedSpriteObject;
    private _cauldronObj: AnimatedSpriteObject;

    private _transition: SpriteObject;

    constructor(){
        super();
        this.bgPaletteIndex = 2;

        this.addGameobject(new SpriteObject(96,0,0,0,"bg_dots"));

        this._creatureObj = this.addGameobject(new AnimatedSpriteObject(32,80,0,0,"c1_infant", creature, true)) as AnimatedSpriteObject;
        this._creatureObj.localX = 160 - this._creatureObj.spriteRenderer.getSprite().frameWidth - 16;
        this._creatureObj.localY = 144 - this._creatureObj.spriteRenderer.getSprite().frameHeight - 32;

        this._cauldronObj = this.addGameobject(new AnimatedSpriteObject(0,80,0,0,"cauldron", cauldron, true)) as AnimatedSpriteObject;
        this._cauldronObj.animationController.frameSpeed = 0.2;

        this._songNameDisplay = this.addGameobject(new TextObject("The SpooKy Squash", "font_rabbit",0,4)) as TextObject;
        this._songNameDisplay.localX = 80 - this._songNameDisplay.textRenderer.width / 2;
        this._noteStatusDisplay = this.addGameobject(new TextObject("", "font_rabbit",100,64)) as TextObject;

        this._badSound = Game.i.assets.getAudio("click");
        this._rhythmSprite = Game.i.assets.getSprite("rhythm_inputs");

        this._transition = this.addGameobject(new SpriteObject(0,0,0,0, "transition")) as SpriteObject; 
    }

    public create(): void {

    }

    public enter(): void {

        this._state = RhythmState.READY;
        this._musicTrack = Game.i.assets.getAudio("the_spooky_squash");
        this._songNameDisplay.textRenderer.setText(track.name);
        this._transition.localX = -8;
        this.startCoroutine(this.moveTo(this._transition, {x:-176, y:0}, 0.5));

        this._score = 0;
        this._maxScore = track.notes.length * 2;

        this._musicTrack!.addEventListener("ended", this.songEndedEvent);
        //this._musicTrack!.removeEventListener("ended", this.songEndedEvent);
        

    }

    private songEndedEvent = ()=>{
        this._state = RhythmState.ENDING;
        this._stateTimer = 2;
        this._musicTrack!.removeEventListener("ended", this.songEndedEvent);
        this.startCoroutine(this.delayFunction(2,()=>{
            this.startCoroutine(this.moveTo(this._transition,{x: -8, y:0}, 0.5));
            this.startCoroutine(this.delayFunction(1, ()=>{Game.i.sm.swapScene(6)}));
        }));


    }

    update(delta: number){

        switch(this._state){
            case RhythmState.READY: this.ReadyState(delta); break;
            case RhythmState.PAUSED: this.PausedState(delta); break;
            case RhythmState.PLAYING: this.PlayingState(delta); break;
            case RhythmState.ENDING: this.EndingState(delta); break;
        }


    }

    ReadyState(delta: number){

        this._stateTimer -= delta;
        if(this._stateTimer <= 0){
            this._state = RhythmState.PLAYING;
            this._musicTrack!.play();
        }

    }

    PausedState(delta: number){
        if(Game.i.input.consumeInput(InputAction.START)){
            this._state = RhythmState.PLAYING;
            this._musicTrack!.play();
        }
    }

    PlayingState(delta: number){
        
        if(this._bigTextTime >= 0){
            this._bigTextTime -= delta;
            if(this._bigTextTime <= 0) this._noteStatusDisplay.localY = 64;
        }

        if(track.notes.length == 0) return;

        if(Game.i.input.consumeInput(InputAction.START)){
            this._state = RhythmState.PAUSED;
            this._musicTrack!.pause();
            return;
        }

        if(Game.i.input.consumeInput(InputAction.UP)){ if(track.notes[0].note == 0){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.DOWN)){ if(track.notes[0].note == 1){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.LEFT)){ if(track.notes[0].note == 2){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.RIGHT)){ if(track.notes[0].note == 3){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.A)){ if(track.notes[0].note == 4){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.B)){ if(track.notes[0].note == 5){ this.rightNote(); } else { this.wrongNote(); } }

        if(track.notes.length == 0) return;
        if(track.notes[0].time - this._musicTrack!.currentTime < -0.1){
            track.notes.shift();
            SaveData.saveObj.petHappiness--;
            this.displayNoteStatus("MISS!")
        } 

    }

    EndingState(delta: number){


    }

    rightNote(){
        let timeUntilNextNote = Math.abs(track.notes[0].time - this._musicTrack!.currentTime);
        console.log(timeUntilNextNote);

        if(timeUntilNextNote < 0.05){
            this.displayNoteStatus("GREAT!");
            this._score += 2;
            track.notes.shift();
            return;
        }

        if(timeUntilNextNote <= 0.1){
            this.displayNoteStatus("GOOD!");
            this._score += 1;
            track.notes.shift();
            return;
        }

        if(timeUntilNextNote > 0.1) {
            this.displayNoteStatus("EARLY!");
            this._score -= 1;
            SaveData.saveObj.petHappiness--;
            //track.notes.shift();
        } 
    }

    wrongNote(){
        this.displayNoteStatus("WRONG!");
        this._score -= 1;
        SaveData.saveObj.petHappiness--;
    }

    changeScore(num: number){
        this._score += num;
        if(this._score < 0) this._score = 0;
        if(this._score >= this._maxScore) this._score = this._maxScore;
    }

    displayNoteStatus(text: string){
        this._noteStatusDisplay.textRenderer.setText(text);
        this._bigTextTime = 0.1;
        this._noteStatusDisplay.localY = 60;
    }

    protected lateDraw(gfx: GraphicsManager): void {
        
        if(this._state == RhythmState.PAUSED) gfx.drawString("PAUSED", Game.i.assets.getSprite("font_rabbit"), 0, 0);

        for(let i = 0; i < track.notes.length; i++){
            
            let y = (this._musicTrack!.currentTime - track.notes[i].time) * (track.bpm / 2) + 72;

            if(y > -16){
                gfx.drawImage(this._rhythmSprite!, 
                    track.notes[i].note * 16,0,16,16, // src
                    40, (this._musicTrack!.currentTime - track.notes[i].time) * (track.bpm / 2) + 72, 16 ,16// dst
                )
            }

        }

    }

}

let track = JSON.parse(`{"name":"The Spooky Squash","bpm":"260","notes":[{"note":0,"time":2.31},{"note":1,"time":2.77},{"note":0,"time":3},{"note":0,"time":3.69},{"note":0,"time":6},{"note":1,"time":6.46},{"note":0,"time":6.69},{"note":0,"time":7.38},{"note":2,"time":9.69},{"note":3,"time":10.15},{"note":2,"time":10.38},{"note":2,"time":11.08},{"note":3,"time":13.38},{"note":2,"time":13.85},{"note":2,"time":14.77},{"note":3,"time":15.46},{"note":5,"time":17.08},{"note":5,"time":18},{"note":5,"time":18.92},{"note":4,"time":19.85},{"note":5,"time":20.31},{"note":5,"time":20.77},{"note":5,"time":21.69},{"note":5,"time":22.62},{"note":4,"time":23.54},{"note":2,"time":24},{"note":2,"time":24.46},{"note":2,"time":25.38},{"note":2,"time":26.31},{"note":2,"time":27.23},{"note":4,"time":27.69},{"note":4,"time":28.15},{"note":4,"time":28.62},{"note":4,"time":29.08},{"note":4,"time":29.54},{"note":0,"time":31.85},{"note":1,"time":32.31},{"note":0,"time":32.54},{"note":0,"time":33.23},{"note":0,"time":35.54},{"note":1,"time":36},{"note":0,"time":36.23},{"note":0,"time":36.92},{"note":2,"time":39.23},{"note":3,"time":39.69},{"note":2,"time":39.92},{"note":2,"time":40.62},{"note":3,"time":42.92},{"note":2,"time":43.38},{"note":2,"time":44.31},{"note":3,"time":45},{"note":2,"time":46.15}]}`);

enum RhythmState {
    READY,
    PLAYING,
    PAUSED,
    ENDING
}