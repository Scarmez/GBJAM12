import {GameObject} from "./GameObject.js";
import {Sprite} from "./Sprite.js";
import {GraphicsManager} from "./GraphicsManager.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";

/** Simple extension of the GameObject class that Draws a sprite to the screen. */
export class SpriteObject extends GameObject {

    protected _spriteRenderer: SpriteRendererComponent;
    public get spriteRenderer(): SpriteRendererComponent { return this._spriteRenderer; }

    constructor(x:number,y:number,w:number,h:number,spriteName:string){
        
        super(x,y,w,h);
        this._spriteRenderer = this.addComponent(new SpriteRendererComponent(spriteName)) as SpriteRendererComponent;

    }

}