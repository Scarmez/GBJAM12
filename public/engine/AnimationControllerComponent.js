import { GameComponent } from "./GameComponent.js";
export class AnimationControllerComponent extends GameComponent {
    type = "AnimationController";
    _onAnimationEnd = [];
    _spriteRenderer;
    _frameSpeed = .5;
    _numPlays = 0;
    _frame = 0;
    _frameTime = 0;
    _animationConfig;
    _numFrames = 0;
    _yFrame = 0;
    _playedOnce = false;
    _ended = false;
    loop = false;
    paused = false;
    get ended() { return this._ended; }
    get playedOnce() { return this._playedOnce; }
    set frameSpeed(speed) { this._frameSpeed = speed; }
    addOnEndEvent(f) {
        this._onAnimationEnd.push(f);
    }
    clearOnEndEvents() {
        this._onAnimationEnd = [];
    }
    constructor(animationConfig, spriteRenderer) {
        super();
        this._numFrames = Object.values(animationConfig)[0].frames;
        this._animationConfig = animationConfig;
        this._spriteRenderer = spriteRenderer;
    }
    setAnimation(name) {
        if (name in this._animationConfig) {
            this._numFrames = this._animationConfig[name].frames;
            this._yFrame = this._animationConfig[name].yFrame;
        }
        else {
            console.error(`Animation ${name} doesn't exist.`);
        }
    }
    update(delta) {
        if (this.paused)
            return;
        this._frameTime += delta;
        if (this._frameTime >= this._frameSpeed) {
            this._frame++;
            this._frameTime -= this._frameSpeed;
            if (this._frame >= this._numFrames) {
                this._playedOnce = true;
                if (this.loop == true) {
                    this._frame = 0;
                }
                else {
                    this._frame = 0;
                    this.paused = true;
                    for (let i = 0; i < this._onAnimationEnd.length; i++) {
                        this._onAnimationEnd[i]();
                    }
                }
            }
            this._spriteRenderer.setFrame(this._frame, this._yFrame);
        }
    }
    play(numTimes) {
        if (numTimes) {
            this._numPlays = numTimes;
        }
        else {
            this._numPlays = 1;
        }
        this._frame = 0;
        this._frameTime = 0;
        this._playedOnce = false;
        this.paused = false;
    }
}
