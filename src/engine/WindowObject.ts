import {Sprite} from "./Sprite.js";
import { GameObject } from "./GameObject.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";

/** Simple extension of the GameObject and SpriteObject classes that displays the sprite using the sliced method. */
export default class WindowObject extends GameObject {

    constructor(spriteName:string, x:number, y:number, w:number,h:number){
        super(x,y,w,h);
        this.addComponent(new SpriteRendererComponent(spriteName, SpriteRendererComponent.DrawModes.Sliced));
    }

}