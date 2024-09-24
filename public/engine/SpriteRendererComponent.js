import { Game } from "./Game.js";
import { GameComponent } from "./GameComponent.js";
var DrawModes;
(function (DrawModes) {
    DrawModes[DrawModes["Basic"] = 0] = "Basic";
    DrawModes[DrawModes["Sliced"] = 1] = "Sliced";
})(DrawModes || (DrawModes = {}));
export class SpriteRendererComponent extends GameComponent {
    type = "SpriteRenderer";
    static DrawModes = DrawModes;
    _sprite;
    _drawMode;
    _xFrame = 0;
    _yFrame = 0;
    flipY = false;
    flipX = false;
    rotation = 0;
    constructor(spriteName, drawMode) {
        super();
        this._sprite = Game.i.assets.getSprite(spriteName);
        ;
        this._drawMode = drawMode || DrawModes.Basic;
    }
    draw(gfx) {
        switch (this._drawMode) {
            case DrawModes.Basic:
                this.drawBasic(gfx);
                break;
            case DrawModes.Sliced:
                this.drawSliced(gfx);
                break;
            default:
                this.drawBasic(gfx);
                break;
        }
    }
    setFrame(x, y) {
        if ((x + 1) * this._sprite.frameWidth > this._sprite.width)
            x = this._sprite.width - this._sprite.frameWidth;
        if ((y + 1) * this._sprite.frameHeight > this._sprite.height)
            y = this._sprite.height - this._sprite.frameHeight;
        this._xFrame = x;
        this._yFrame = y;
    }
    setSprite(spriteName) {
        this._sprite = Game.i.assets.getSprite(spriteName);
    }
    getSprite() {
        return this._sprite;
    }
    drawBasic(gfx) {
        gfx.drawImage(this._sprite, this._xFrame * this._sprite.frameWidth, this._yFrame * this._sprite.frameHeight, this._sprite.frameWidth, this._sprite.frameHeight, this.gameObject.globalX, this.gameObject.globalY, undefined, undefined, this.flipX, this.flipY, this.rotation);
    }
    drawSliced(gfx) {
        gfx.drawSliced(this._sprite, this.gameObject.globalX, this.gameObject.globalY, this.gameObject.width, this.gameObject.height);
    }
}
