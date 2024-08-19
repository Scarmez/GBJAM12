import {GameObject} from "./GameObject.js";
import {Sprite} from "./Sprite.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** Simple extension of the GameObject class that draws a string to the screen using the specified Font. */
export class TextObject extends GameObject {

    private font: Sprite;
    private text: string;
    constructor(text:string, font:Sprite,x:number,y:number){
        super(x,y,0,0);
        this.text = text;
        this.font = font;
    }

    protected draw(gfx: GraphicsManager): void {
        gfx.drawString(this.text, this.font,this.globalX,this.globalY);
    }

}