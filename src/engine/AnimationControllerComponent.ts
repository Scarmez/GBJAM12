import { GameComponent } from "./GameComponent.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";

export class AnimationControllerComponent extends GameComponent {

    public readonly type: string = "AnimationController";

    private _onAnimationEnd: Function[] = [];
    private _spriteRenderer: SpriteRendererComponent;
    private _frameSpeed: number = .5;
    private _numPlays = 0;
    private _frame = 0;
    private _frameTime = 0;
    private _animationConfig: AnimationConfig;

    private _numFrames = 0;
    private _yFrame = 0;
    private _playedOnce = false;
    private _ended = false;

    public loop = false;
    public paused = false;

    public get ended(): boolean { return  this._ended; }
    public get playedOnce(): boolean { return this._playedOnce; }

    public set frameSpeed(speed: number){ this._frameSpeed = speed; }

    public addOnEndEvent(f: Function){
        this._onAnimationEnd.push(f);
    }

    public clearOnEndEvents(){
        this._onAnimationEnd = [];
    }

    constructor(animationConfig: AnimationConfig, spriteRenderer: SpriteRendererComponent){
        super();

        this._numFrames = Object.values(animationConfig)[0].frames;
        this._animationConfig = animationConfig;
        this._spriteRenderer = spriteRenderer;

    }

    public setAnimation(name: string){
        if(name in this._animationConfig){
            this._numFrames = this._animationConfig[name].frames;
            this._yFrame = this._animationConfig[name].yFrame;
        } else {
            console.error(`Animation ${name} doesn't exist.`)
        }

    }

    public update(delta: number): void {

        if(this.paused) return;

        this._frameTime += delta;
        if(this._frameTime >= this._frameSpeed){
            this._frame++;
            this._frameTime -= this._frameSpeed;
            if(this._frame >= this._numFrames){
                this._playedOnce = true;
                if(this.loop == true) {
                    this._frame = 0;
                } else {
                    this._frame = 0;
                    this.paused = true;
                    for(let i = 0; i < this._onAnimationEnd.length; i++){
                        this._onAnimationEnd[i]();
                    }
                }
            }
            this._spriteRenderer.setFrame(this._frame, this._yFrame);
        }

    }

    public play(numTimes?:number){
        if(numTimes) {
            this._numPlays = numTimes;
        } else {
            this._numPlays = 1;
        }
        this._frame = 0;
        this._frameTime = 0;
        this._playedOnce = false;
        this.paused = false;

    }

}

export interface AnimationConfig {
    [key: string]: {
        yFrame: number,
        frames: number
    }
}