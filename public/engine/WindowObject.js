import { SpriteObject } from "./SpriteObject.js";
/** Simple extension of the GameObject and SpriteObject classes that displays the sprite using the sliced method. */
export default class WindowObject extends SpriteObject {
    constructor(sprite, x, y, w, h) {
        super(x, y, w, h, sprite);
    }
    draw(gfx) {
        gfx.drawSliced(this.sprite, this.globalX, this.globalY, this.w, this.h);
    }
}
