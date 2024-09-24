import { GameObject } from "./GameObject.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
/** Simple extension of the GameObject class that Draws a sprite to the screen. */
export class SpriteObject extends GameObject {
    _spriteRenderer;
    get spriteRenderer() { return this._spriteRenderer; }
    constructor(x, y, w, h, spriteName) {
        super(x, y, w, h);
        this._spriteRenderer = this.addComponent(new SpriteRendererComponent(spriteName));
        this.w = this._spriteRenderer.getSprite().frameWidth;
        this.h = this._spriteRenderer.getSprite().frameHeight;
    }
}
