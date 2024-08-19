import { GameObject } from "./GameObject.js";
/** Simple extension of the GameObject class that Draws a sprite to the screen. */
export class SpriteObject extends GameObject {
    sprite;
    constructor(x, y, w, h, sprite) {
        super(x, y, w, h);
        this.sprite = sprite;
    }
    draw(gfx) {
        gfx.drawImage(this.sprite, 0, 0, undefined, undefined, this.globalX, this.globalY);
    }
}
