import {Sprite} from "./Sprite.js";
import {SpriteObject} from "./SpriteObject.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** Simple extension of the GameObject and SpriteObject classes that displays the sprite using the sliced method. */
export default class WindowObject extends SpriteObject {

    constructor(sprite:Sprite, x:number, y:number, w:number,h:number){
        super(x,y,w,h,sprite);
    }

    protected draw(gfx: GraphicsManager): void {
        gfx.drawSliced(this.sprite, this.globalX, this.globalY, this.w, this.h);
    }

}