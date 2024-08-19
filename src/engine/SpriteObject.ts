import {GameObject} from "./GameObject.js";
import {Sprite} from "./Sprite.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** Simple extension of the GameObject class that Draws a sprite to the screen. */
export class SpriteObject extends GameObject {

    protected sprite: Sprite;
    constructor(x:number,y:number,w:number,h:number,sprite:Sprite){
        
        super(x,y,w,h);
        this.sprite = sprite;

    }

    protected draw(gfx: GraphicsManager): void {
        gfx.drawImage(this.sprite, 0, 0, undefined, undefined, this.globalX, this.globalY);
    }

}