import { AnimationControllerComponent } from "./AnimationControllerComponent.js";
import { SpriteObject } from "./SpriteObject.js";
import { AnimationConfig } from "./AnimationControllerComponent.js";

export class AnimatedSpriteObject extends SpriteObject {

    protected _animationController: AnimationControllerComponent;
    public get animationController(): AnimationControllerComponent { return this._animationController; }

    constructor(x:number, y:number, w:number, h:number, spriteName:string, animationConfig:AnimationConfig, loop?:boolean){
        super(x,y,w,h,spriteName);
        this._animationController = this.addComponent(new AnimationControllerComponent(animationConfig, this._spriteRenderer)) as AnimationControllerComponent;
        if(loop)this._animationController.loop = loop;
    }

}