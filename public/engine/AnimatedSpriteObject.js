import { AnimationControllerComponent } from "./AnimationControllerComponent.js";
import { SpriteObject } from "./SpriteObject.js";
export class AnimatedSpriteObject extends SpriteObject {
    _animationController;
    get animationController() { return this._animationController; }
    constructor(x, y, w, h, spriteName, loop) {
        super(x, y, w, h, spriteName);
        this._animationController = this.addComponent(new AnimationControllerComponent(this._spriteRenderer));
        if (loop)
            this._animationController.loop = loop;
    }
}
