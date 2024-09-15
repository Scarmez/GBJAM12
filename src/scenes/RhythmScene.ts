import { Game } from "../engine/Game.js";
import { GraphicsManager } from "../engine/GraphicsManager.js";
import { Scene } from "../engine/Scene.js";
import { InputAction } from "../game/InputActions.js";
import { RythymTrack, tetrisTrack } from '../game/track_tetris.js';

export class RythymScene extends Scene { 

    private _state: RythymState = RythymState.READY;
    private _stateTimer: number = 2;
    private _musicTrack: HTMLAudioElement | undefined;
    private _trackData: RythymTrack | undefined;

    public create(): void {
        this._musicTrack = Game.i.assets.getAudio("tetris")!;
        this._trackData = tetrisTrack;
    }

    update(delta: number){

        switch(this._state){
            case RythymState.READY: this.ReadyState(delta); break;
            case RythymState.PAUSED: this.PausedState(delta); break;
            case RythymState.PLAYING: this.PlayingState(delta); break;
        }


    }

    ReadyState(delta: number){

        this._stateTimer -= delta;
        if(this._stateTimer <= 0){
            this._state = RythymState.PLAYING;
            this._musicTrack!.play();
        }

    }

    PausedState(delta: number){
        if(Game.i.input.consumeInput(InputAction.START)){
            this._state = RythymState.PLAYING;
            this._musicTrack!.play();
        }
    }

    PlayingState(delta: number){
        if(Game.i.input.consumeInput(InputAction.START)){
            this._state = RythymState.PAUSED;
            this._musicTrack!.pause();
        }
    }

    public draw(gfx: GraphicsManager): void {
        
        if(this._state == RythymState.PAUSED) gfx.drawString("PAUSED", Game.i.assets.getSprite("font_Cushion"), 0, 0);
        for(let i = 0; i < this._trackData!.notes.length; i++){
            let note = this._trackData!.notes[i];
            gfx.drawString(note.note.toString(), Game.i.assets.getSprite("font_Cushion"), note.note * 16, 144 - ((note.time * 16) - (this._musicTrack!.currentTime * 16)))
        }

    }

}

enum RythymState {
    READY,
    PLAYING,
    PAUSED
}