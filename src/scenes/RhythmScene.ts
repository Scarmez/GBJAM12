import cauldron from "../animations/cauldron_anim.js";
import creature from "../animations/creature_anim.js";
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
    private _songNameDisplayFrame: WindowObject;
    private _noteStatusDisplay: TextObject;
    private _bigTextTime = 0;

    private _rhythmSprite: Sprite | undefined;
    private _creatureObj: AnimatedSpriteObject;
    private _cauldronObj: AnimatedSpriteObject;

    private _transition: SpriteObject;

    private tracks = [
        JSON.parse(`{"name":"The Spooky Squash", "audio": "the_spooky_squash","bpm":"260","notes":[{"note":0,"time":2.31},{"note":1,"time":2.77},{"note":0,"time":3},{"note":0,"time":3.69},{"note":0,"time":6},{"note":1,"time":6.46},{"note":0,"time":6.69},{"note":0,"time":7.38},{"note":2,"time":9.69},{"note":3,"time":10.15},{"note":2,"time":10.38},{"note":2,"time":11.08},{"note":3,"time":13.38},{"note":2,"time":13.85},{"note":2,"time":14.77},{"note":3,"time":15.46},{"note":5,"time":17.08},{"note":5,"time":18},{"note":5,"time":18.92},{"note":4,"time":19.85},{"note":5,"time":20.31},{"note":5,"time":20.77},{"note":5,"time":21.69},{"note":5,"time":22.62},{"note":4,"time":23.54},{"note":2,"time":24},{"note":2,"time":24.46},{"note":2,"time":25.38},{"note":2,"time":26.31},{"note":2,"time":27.23},{"note":4,"time":27.69},{"note":4,"time":28.15},{"note":4,"time":28.62},{"note":4,"time":29.08},{"note":4,"time":29.54},{"note":0,"time":31.85},{"note":1,"time":32.31},{"note":0,"time":32.54},{"note":0,"time":33.23},{"note":0,"time":35.54},{"note":1,"time":36},{"note":0,"time":36.23},{"note":0,"time":36.92},{"note":2,"time":39.23},{"note":3,"time":39.69},{"note":2,"time":39.92},{"note":2,"time":40.62},{"note":3,"time":42.92},{"note":2,"time":43.38},{"note":2,"time":44.31},{"note":3,"time":45},{"note":2,"time":46.15}]}`),
        //JSON.parse(`{"name":"Aarons Family", "audio": "aarons_family","bpm":"420","notes":[{"note":0,"time":1.14},{"note":2,"time":1.29},{"note":3,"time":1.43},{"note":1,"time":1.57},{"note":4,"time":2},{"note":2,"time":3},{"note":0,"time":3.14},{"note":1,"time":3.29},{"note":2,"time":3.43},{"note":4,"time":3.86},{"note":2,"time":4.57},{"note":0,"time":4.71},{"note":1,"time":4.86},{"note":2,"time":5},{"note":2,"time":5.43},{"note":0,"time":5.57},{"note":1,"time":5.71},{"note":2,"time":5.86},{"note":0,"time":6.43},{"note":2,"time":6.57},{"note":3,"time":6.71},{"note":1,"time":6.86},{"note":4,"time":7.29},{"note":0,"time":8.14},{"note":2,"time":8.29},{"note":3,"time":8.43},{"note":1,"time":8.57},{"note":4,"time":9},{"note":2,"time":9.86},{"note":0,"time":10},{"note":1,"time":10.14},{"note":2,"time":10.29},{"note":4,"time":10.71},{"note":2,"time":11.57},{"note":0,"time":11.71},{"note":1,"time":11.86},{"note":2,"time":12},{"note":2,"time":12.43},{"note":0,"time":12.57},{"note":1,"time":12.71},{"note":2,"time":12.86},{"note":0,"time":13.14},{"note":2,"time":13.29},{"note":3,"time":13.43},{"note":1,"time":13.57},{"note":4,"time":14},{"note":0,"time":15.43},{"note":0,"time":15.71},{"note":1,"time":16.29},{"note":1,"time":16.57},{"note":2,"time":17.14},{"note":2,"time":17.43},{"note":3,"time":18},{"note":3,"time":18.29},{"note":5,"time":18.86},{"note":5,"time":19.14},{"note":4,"time":19.71},{"note":4,"time":20},{"note":5,"time":20.43},{"note":5,"time":20.71},{"note":1,"time":21.29},{"note":0,"time":22.14},{"note":0,"time":22.43},{"note":1,"time":23},{"note":1,"time":23.29},{"note":2,"time":23.86},{"note":2,"time":24.14},{"note":3,"time":24.57},{"note":3,"time":24.86},{"note":5,"time":25.57},{"note":5,"time":25.86},{"note":4,"time":26.43},{"note":4,"time":26.71},{"note":5,"time":27.14},{"note":1,"time":28},{"note":0,"time":28.71},{"note":2,"time":28.86},{"note":3,"time":29},{"note":1,"time":29.14},{"note":4,"time":29.57},{"note":2,"time":30.43},{"note":0,"time":30.57},{"note":1,"time":30.71},{"note":2,"time":30.86},{"note":4,"time":31.29},{"note":2,"time":32},{"note":0,"time":32.14},{"note":1,"time":32.29},{"note":2,"time":32.43},{"note":2,"time":32.86},{"note":0,"time":33},{"note":1,"time":33.14},{"note":2,"time":33.29},{"note":0,"time":33.71},{"note":2,"time":33.86},{"note":3,"time":34},{"note":1,"time":34.14},{"note":4,"time":34.57},{"note":0,"time":36},{"note":0,"time":36.29},{"note":1,"time":36.86},{"note":1,"time":37.14},{"note":2,"time":37.57},{"note":2,"time":37.86},{"note":3,"time":38.29},{"note":3,"time":38.57},{"note":5,"time":39.29},{"note":5,"time":39.57},{"note":4,"time":40.14},{"note":4,"time":40.43},{"note":5,"time":41},{"note":5,"time":41.29},{"note":1,"time":41.86},{"note":0,"time":42.71},{"note":0,"time":43},{"note":1,"time":43.57},{"note":1,"time":43.86},{"note":2,"time":44.43},{"note":2,"time":44.71},{"note":3,"time":45.29},{"note":3,"time":45.57},{"note":5,"time":46.14},{"note":5,"time":46.43},{"note":4,"time":47},{"note":4,"time":47.29},{"note":5,"time":47.86},{"note":5,"time":48.14},{"note":1,"time":48.71},{"note":0,"time":49.29},{"note":2,"time":49.43},{"note":3,"time":49.57},{"note":1,"time":49.71},{"note":4,"time":50.14}]}`),
        JSON.parse(`{"name":"Aarons Family", "audio": "aarons_family","bpm":"280","notes":[{"note":0,"time":1.07},{"note":1,"time":1.29},{"note":2,"time":1.5},{"note":3,"time":1.71},{"note":5,"time":2.14},{"note":3,"time":2.79},{"note":2,"time":3},{"note":1,"time":3.21},{"note":0,"time":3.43},{"note":5,"time":3.86},{"note":3,"time":4.5},{"note":2,"time":4.71},{"note":1,"time":4.93},{"note":0,"time":5.14},{"note":3,"time":5.36},{"note":2,"time":5.57},{"note":1,"time":5.79},{"note":0,"time":6},{"note":0,"time":6.21},{"note":1,"time":6.43},{"note":2,"time":6.64},{"note":3,"time":6.86},{"note":5,"time":7.29},{"note":0,"time":7.93},{"note":1,"time":8.14},{"note":2,"time":8.36},{"note":3,"time":8.57},{"note":5,"time":9},{"note":3,"time":9.64},{"note":2,"time":9.86},{"note":1,"time":10.07},{"note":0,"time":10.29},{"note":5,"time":10.71},{"note":3,"time":11.36},{"note":2,"time":11.57},{"note":1,"time":11.79},{"note":0,"time":12},{"note":3,"time":12.21},{"note":2,"time":12.43},{"note":1,"time":12.64},{"note":0,"time":12.86},{"note":0,"time":13.07},{"note":1,"time":13.29},{"note":2,"time":13.5},{"note":3,"time":13.71},{"note":5,"time":14.14},{"note":0,"time":15.43},{"note":0,"time":15.86},{"note":1,"time":16.29},{"note":1,"time":16.71},{"note":2,"time":17.14},{"note":2,"time":17.57},{"note":3,"time":18},{"note":3,"time":18.43},{"note":4,"time":18.86},{"note":4,"time":19.29},{"note":5,"time":19.71},{"note":5,"time":20.14},{"note":4,"time":20.57},{"note":4,"time":21},{"note":1,"time":21.43},{"note":0,"time":22.29},{"note":0,"time":22.71},{"note":1,"time":23.14},{"note":1,"time":23.57},{"note":2,"time":24},{"note":2,"time":24.43},{"note":3,"time":24.86},{"note":3,"time":25.29},{"note":4,"time":25.71},{"note":4,"time":26.14},{"note":5,"time":26.57},{"note":5,"time":27},{"note":4,"time":27.43},{"note":4,"time":27.86},{"note":1,"time":28.29},{"note":0,"time":28.5},{"note":1,"time":28.71},{"note":2,"time":28.93},{"note":3,"time":29.14},{"note":5,"time":29.57},{"note":3,"time":30.21},{"note":2,"time":30.43},{"note":1,"time":30.64},{"note":0,"time":30.86},{"note":5,"time":31.29},{"note":3,"time":31.93},{"note":2,"time":32.14},{"note":1,"time":32.36},{"note":0,"time":32.57},{"note":3,"time":32.79},{"note":2,"time":33},{"note":1,"time":33.21},{"note":0,"time":33.43},{"note":0,"time":33.64},{"note":1,"time":33.86},{"note":2,"time":34.07},{"note":3,"time":34.29},{"note":5,"time":34.71},{"note":0,"time":36},{"note":0,"time":36.43},{"note":1,"time":36.86},{"note":1,"time":37.29},{"note":2,"time":37.71},{"note":2,"time":38.14},{"note":3,"time":38.57},{"note":3,"time":39},{"note":4,"time":39.43},{"note":4,"time":39.86},{"note":5,"time":40.29},{"note":5,"time":40.71},{"note":4,"time":41.14},{"note":4,"time":41.57},{"note":1,"time":42},{"note":0,"time":42.86},{"note":0,"time":43.29},{"note":1,"time":43.71},{"note":1,"time":44.14},{"note":2,"time":44.57},{"note":2,"time":45},{"note":3,"time":45.43},{"note":3,"time":45.86},{"note":4,"time":46.29},{"note":4,"time":46.71},{"note":5,"time":47.14},{"note":5,"time":47.57},{"note":4,"time":48},{"note":4,"time":48.43},{"note":1,"time":48.86},{"note":0,"time":49.07},{"note":1,"time":49.29},{"note":2,"time":49.5},{"note":3,"time":49.71},{"note":5,"time":50.14}]}`),
        JSON.parse(`{"name":"Thrilling","audio": "thrilling","bpm":"660","notes":[{"note":2,"time":3.18},{"note":0,"time":3.91},{"note":2,"time":4.64},{"note":0,"time":5},{"note":2,"time":5.36},{"note":0,"time":5.55},{"note":3,"time":5.73},{"note":1,"time":5.82},{"note":0,"time":7.64},{"note":2,"time":8},{"note":3,"time":8.36},{"note":5,"time":9.18},{"note":4,"time":9.36},{"note":4,"time":9.45},{"note":5,"time":9.82},{"note":4,"time":10},{"note":2,"time":10.18},{"note":3,"time":10.27},{"note":2,"time":10.36},{"note":3,"time":10.45},{"note":4,"time":10.73},{"note":3,"time":13.45},{"note":1,"time":13.73},{"note":0,"time":14},{"note":5,"time":15},{"note":4,"time":15.18},{"note":4,"time":15.36},{"note":5,"time":15.64},{"note":4,"time":15.82},{"note":2,"time":16},{"note":3,"time":16.09},{"note":2,"time":16.18},{"note":3,"time":16.27},{"note":4,"time":16.45},{"note":3,"time":17.45},{"note":2,"time":17.64},{"note":0,"time":17.82},{"note":0,"time":19.09},{"note":0,"time":19.18},{"note":1,"time":19.36},{"note":1,"time":19.45},{"note":2,"time":19.64},{"note":2,"time":19.73},{"note":3,"time":19.91},{"note":3,"time":20},{"note":5,"time":20.36},{"note":5,"time":20.45},{"note":4,"time":20.73},{"note":3,"time":23.27},{"note":2,"time":23.45},{"note":0,"time":23.64},{"note":0,"time":24.91},{"note":0,"time":25},{"note":1,"time":25.18},{"note":1,"time":25.27},{"note":2,"time":25.45},{"note":2,"time":25.55},{"note":3,"time":25.73},{"note":3,"time":25.82},{"note":5,"time":26.18},{"note":4,"time":26.36},{"note":4,"time":26.55},{"note":2,"time":27.36},{"note":3,"time":27.55},{"note":1,"time":27.73},{"note":0,"time":27.91},{"note":4,"time":28.91},{"note":5,"time":29.09},{"note":4,"time":29.27},{"note":2,"time":29.45},{"note":0,"time":30.09},{"note":2,"time":30.91},{"note":0,"time":31.27},{"note":2,"time":31.55},{"note":0,"time":31.73},{"note":3,"time":31.91},{"note":1,"time":32.09},{"note":2,"time":32.36},{"note":0,"time":32.55},{"note":3,"time":32.73},{"note":1,"time":32.91},{"note":2,"time":33.09},{"note":0,"time":33.27},{"note":3,"time":33.45},{"note":1,"time":33.64},{"note":2,"time":33.82},{"note":0,"time":34},{"note":3,"time":34.18},{"note":1,"time":34.36},{"note":2,"time":34.55},{"note":0,"time":34.73},{"note":3,"time":34.91},{"note":1,"time":35.09},{"note":2,"time":35.27},{"note":0,"time":35.91},{"note":2,"time":36.73},{"note":0,"time":37.09},{"note":2,"time":37.36},{"note":0,"time":37.55},{"note":3,"time":37.73},{"note":1,"time":37.91},{"note":2,"time":38.18},{"note":0,"time":38.36},{"note":3,"time":38.55},{"note":1,"time":38.73},{"note":2,"time":38.91},{"note":0,"time":39.09},{"note":3,"time":39.27},{"note":1,"time":39.45},{"note":5,"time":39.82},{"note":4,"time":39.91},{"note":5,"time":40},{"note":2,"time":40.36},{"note":3,"time":40.45},{"note":2,"time":40.55},{"note":5,"time":40.73},{"note":4,"time":40.82},{"note":5,"time":40.91},{"note":0,"time":41.09},{"note":0,"time":44.09},{"note":2,"time":44.45},{"note":3,"time":44.82},{"note":5,"time":45.36},{"note":4,"time":45.55},{"note":4,"time":45.64},{"note":5,"time":46.09},{"note":4,"time":46.27},{"note":2,"time":46.55},{"note":3,"time":46.64},{"note":2,"time":46.73},{"note":3,"time":46.82},{"note":4,"time":47},{"note":1,"time":49.91},{"note":2,"time":50.27},{"note":0,"time":50.55},{"note":5,"time":51.27},{"note":4,"time":51.45},{"note":4,"time":51.55},{"note":5,"time":51.91},{"note":4,"time":52.09},{"note":2,"time":52.36},{"note":3,"time":52.45},{"note":2,"time":52.55},{"note":3,"time":52.64},{"note":4,"time":52.82},{"note":1,"time":53.91},{"note":2,"time":54.09},{"note":3,"time":54.27},{"note":0,"time":55.64},{"note":0,"time":55.73},{"note":3,"time":55.91},{"note":3,"time":56},{"note":1,"time":56.18},{"note":1,"time":56.27},{"note":2,"time":56.45},{"note":2,"time":56.55},{"note":5,"time":56.82},{"note":5,"time":57},{"note":4,"time":57.18},{"note":5,"time":59.55},{"note":5,"time":59.73},{"note":4,"time":59.91},{"note":0,"time":61.36},{"note":0,"time":61.45},{"note":3,"time":61.64},{"note":3,"time":61.73},{"note":1,"time":61.91},{"note":1,"time":62},{"note":2,"time":62.18},{"note":2,"time":62.27},{"note":5,"time":62.64},{"note":5,"time":62.82},{"note":4,"time":63},{"note":2,"time":63.55},{"note":1,"time":63.73},{"note":2,"time":63.91},{"note":0,"time":64.09},{"note":2,"time":65.18},{"note":3,"time":65.36},{"note":2,"time":65.55},{"note":2,"time":65.82},{"note":0,"time":66.45},{"note":0,"time":67.36},{"note":1,"time":67.55},{"note":2,"time":68},{"note":0,"time":68.18},{"note":1,"time":68.36},{"note":3,"time":68.55},{"note":2,"time":68.73},{"note":0,"time":68.91},{"note":3,"time":69.09},{"note":1,"time":69.27},{"note":2,"time":69.45},{"note":0,"time":69.64},{"note":3,"time":69.82},{"note":1,"time":70},{"note":2,"time":70.18},{"note":0,"time":70.36},{"note":3,"time":70.55},{"note":1,"time":70.73},{"note":2,"time":70.91},{"note":0,"time":71.09},{"note":3,"time":71.27},{"note":1,"time":71.45},{"note":2,"time":71.64},{"note":0,"time":72.27},{"note":2,"time":73},{"note":0,"time":73.36},{"note":2,"time":73.73},{"note":0,"time":73.91},{"note":3,"time":74.09},{"note":1,"time":74.27},{"note":2,"time":74.55},{"note":0,"time":74.73},{"note":3,"time":74.91},{"note":1,"time":75.09},{"note":2,"time":75.27},{"note":0,"time":75.45},{"note":3,"time":75.64},{"note":1,"time":75.82},{"note":5,"time":76.18},{"note":4,"time":76.27},{"note":5,"time":76.36},{"note":2,"time":76.73},{"note":3,"time":76.82},{"note":2,"time":76.91},{"note":5,"time":77.18},{"note":4,"time":77.27},{"note":5,"time":77.36},{"note":0,"time":77.55},{"note":2,"time":81.73},{"note":0,"time":81.91},{"note":3,"time":82.09},{"note":1,"time":82.27},{"note":2,"time":82.45},{"note":0,"time":82.64},{"note":3,"time":82.82},{"note":1,"time":83},{"note":2,"time":83.18},{"note":0,"time":83.36},{"note":3,"time":83.55},{"note":1,"time":83.73},{"note":5,"time":83.91},{"note":4,"time":84.09},{"note":2,"time":84.27},{"note":0,"time":84.45},{"note":3,"time":84.64},{"note":1,"time":84.82},{"note":2,"time":85},{"note":5,"time":85.18},{"note":4,"time":85.36},{"note":2,"time":85.55},{"note":0,"time":85.73},{"note":3,"time":85.91},{"note":1,"time":86.09},{"note":5,"time":86.27},{"note":4,"time":86.45},{"note":2,"time":86.64},{"note":0,"time":86.82},{"note":1,"time":87},{"note":0,"time":87.64},{"note":0,"time":94.73},{"note":0,"time":94.82}]}`),
    ];

    private _track = this.tracks[SaveData.nextSong];

    constructor(){
        super();
        this.bgPaletteIndex = 2;

        //

        this.addGameobject(new SpriteObject(96,0,0,0,"bg_dots"));
       
        this._creatureObj = this.addGameobject(new AnimatedSpriteObject(32,80,0,0,SaveData.getCreatureSprite(), creature, true)) as AnimatedSpriteObject;
        this._creatureObj.localX = 160 - this._creatureObj.spriteRenderer.getSprite().frameWidth/2   - 32;
        this._creatureObj.localY = 144 - this._creatureObj.spriteRenderer.getSprite().frameHeight - 32;

        this._cauldronObj = this.addGameobject(new AnimatedSpriteObject(0,80,0,0,"cauldron", cauldron, true)) as AnimatedSpriteObject;
        this._cauldronObj.animationController.frameSpeed = 0.2;

        this._songNameDisplayFrame = this.addGameobject(new WindowObject("pokeframe", 0,0,160,24));
        this._songNameDisplay = this._songNameDisplayFrame.addChild(new TextObject("The SpooKy Squash", "font_rabbit",0,8)) as TextObject;
        this._songNameDisplay.localX = 80 - this._songNameDisplay.textRenderer.width / 2;
        this._noteStatusDisplay = this.addGameobject(new TextObject("", "font_rabbit",48,120,3)) as TextObject;
        this._badSound = Game.i.assets.getAudio("click");
        this._rhythmSprite = Game.i.assets.getSprite("rhythm_inputs");

        // this.addGameobject(new SpriteObject(40, 72 - (0.14 * 128),0,0,"marker"));
        // this.addGameobject(new SpriteObject(40, 72 + (0.14 * 128),0,0,"marker"));

        // this.addGameobject(new SpriteObject(40, 72 - (0.07 * 128),0,0,"marker"));
        // this.addGameobject(new SpriteObject(40, 72 + (0.07 * 128),0,0,"marker"));

        this.addGameobject(new SpriteObject(40,72,0,0,"marker"));

        this._transition = this.addGameobject(new SpriteObject(0,0,0,0, "transition")) as SpriteObject; 

        this._state = RhythmState.READY;
        this._musicTrack = Game.i.assets.getAudio(this._track.audio);
        this._songNameDisplay.textRenderer.setText(this._track.name);
        this._transition.localX = -8;
        this.startCoroutine(this.moveTo(this._transition, {x:-176, y:0}, 0.5));

        this._maxScore = this._track.notes.length * 4;
        this._score = this._maxScore / 2;


        this._musicTrack!.addEventListener("ended", this.songEndedEvent);

        this.startCoroutine(this.delayFunction(1.5,()=>{this.startCoroutine(this.moveTo(this._songNameDisplayFrame, {x: -160}, 1));}))


    }


    private songEndedEvent = ()=>{
        this._state = RhythmState.ENDING;
        this._stateTimer = 2;
        this._musicTrack!.removeEventListener("ended", this.songEndedEvent);
        this.startCoroutine(this.delayFunction(2,()=>{
            SaveData.lastScore = this._score / this._maxScore;
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
            if(this._bigTextTime <= 0.5) this._noteStatusDisplay.localY = 124;
            if(this._bigTextTime <= 0) this._noteStatusDisplay.textRenderer.setText("");
        }

        if(this._track.notes.length == 0) return;

        if(Game.i.input.consumeInput(InputAction.START)){
            this._state = RhythmState.PAUSED;
            this._musicTrack!.pause();
            return;
        }

        if(Game.i.input.consumeInput(InputAction.UP)){ if(this._track.notes[0].note == 0){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.DOWN)){ if(this._track.notes[0].note == 1){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.LEFT)){ if(this._track.notes[0].note == 2){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.RIGHT)){ if(this._track.notes[0].note == 3){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.A)){ if(this._track.notes[0].note == 4){ this.rightNote(); } else { this.wrongNote(); } }
        if(Game.i.input.consumeInput(InputAction.B)){ if(this._track.notes[0].note == 5){ this.rightNote(); } else { this.wrongNote(); } }

        if(this._track.notes.length == 0) return;
        if(this._track.notes[0].time - this._musicTrack!.currentTime < -0.14){
            this._track.notes.shift();
            this.displayNoteStatus("MISS!");
            this.changeScore(-1);
        } 

        let scoreP = this._score / this._maxScore;

        if(scoreP < 0.25){
            this._creatureObj.animationController.setAnimation("angry")
        } else if(scoreP < 0.5){
            this._creatureObj.animationController.setAnimation("annoyed")
        } else if(scoreP < 0.75){
            this._creatureObj.animationController.setAnimation("happy")
        } else {
            this._creatureObj.animationController.setAnimation("celebrate")
        }


    }

    EndingState(delta: number){


    }

    rightNote(){
        let timeUntilNextNote = Math.abs(this._track.notes[0].time - this._musicTrack!.currentTime);

        if(timeUntilNextNote <= 0.07){
            this.displayNoteStatus("GREAT!");
            this.changeScore(2);
            this._track.notes.shift();
            return;
        }

        if(timeUntilNextNote <= 0.14){
            this.displayNoteStatus("GOOD!");
            this.changeScore(1);
            this._track.notes.shift();
            return;
        }

        this.displayNoteStatus("EARLY!");
        this.changeScore(-1);
        
    }

    wrongNote(){
        this.displayNoteStatus("WRONG!");
        this.changeScore(-1);
    }

    changeScore(num: number){
        this._score += num;
        if(this._score < 0) this._score = 0;
        if(this._score >= this._maxScore) this._score = this._maxScore;
    }

    displayNoteStatus(text: string){
        this._noteStatusDisplay.textRenderer.setText(text);
        this._bigTextTime = 0.6;
        this._noteStatusDisplay.localX = 48 - this._noteStatusDisplay.textRenderer.width/2;
        this._noteStatusDisplay.localY = 122;
    }

    protected lateDraw(gfx: GraphicsManager): void {
        
        if(this._state == RhythmState.PAUSED) gfx.drawString("PAUSED", Game.i.assets.getSprite("font_rabbit"), 0, 0);

        for(let i = 0; i < this._track.notes.length; i++){
            
            let y = Math.round((this._musicTrack!.currentTime - this._track.notes[i].time) * 128 + 72);

            gfx.drawImage(this._rhythmSprite!, 
                this._track.notes[i].note * 16,0,16,16, // src
                40, y, 16 ,16// dst
            )

        }

    }

}

enum RhythmState {
    READY,
    PLAYING,
    PAUSED,
    ENDING
}