import {GameObject} from "./GameObject.js";
import { TextRendererComponent } from "./TextRendererComponent.js";

/** Simple extension of the GameObject class that draws a string to the screen using the specified Font. */
export class TextObject extends GameObject {

    constructor(text:string, fontName:string, x:number, y:number){
        super(x,y,0,0);
        this.addComponent(new TextRendererComponent(text, fontName));
    }


}