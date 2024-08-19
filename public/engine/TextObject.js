import { GameObject } from "./GameObject.js";
/** Simple extension of the GameObject class that draws a string to the screen using the specified Font. */
export class TextObject extends GameObject {
    font;
    text;
    constructor(text, font, x, y) {
        super(x, y, 0, 0);
        this.text = text;
        this.font = font;
    }
    draw(gfx) {
        gfx.drawString(this.text, this.font, this.globalX, this.globalY);
    }
}
