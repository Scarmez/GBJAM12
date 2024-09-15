import { GameComponent } from "./GameComponent.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";

export class AnimationControllerComponent extends GameComponent {

    public readonly type: string = "AnimationController";

    private _onAnimationEnd: Function[] = [];
    private _spriteRenderer: SpriteRendererComponent;
    private _frameSpeed: number = .5;
    private _frame = 0;
    private _frameTime = 0;

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


    constructor(spriteRenderer: SpriteRendererComponent){
        super();

        this._spriteRenderer = spriteRenderer;

    }

    public update(delta: number): void {

        if(this.paused) return;

        this._frameTime += delta;
        if(this._frameTime >= this._frameSpeed){
            this._frame++;
            this._frameTime -= this._frameSpeed;
            if(this._frame >= this._spriteRenderer.getSprite().xFrames){
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
            this._spriteRenderer.setFrame(this._frame, 0);
        }

    }

    public play(){
        this._frame = 0;
        this._frameTime = 0;
        this._playedOnce = false;
        this.paused = false;

    }

}
