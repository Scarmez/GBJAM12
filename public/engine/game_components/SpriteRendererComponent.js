import { Game } from "../Game.js";
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
    constructor(spriteName, drawMode) {
        super();
        this._sprite = Game.i.assets.getSprite(spriteName);
        ;
        this._drawMode = drawMode || DrawModes.Basic;
    }
    draw(gfx) {
        switch (this._drawMode) {
            case DrawModes.Basic: this.drawBasic(gfx);
            case DrawModes.Sliced: this.drawSliced(gfx);
            default: this.drawBasic(gfx);
        }
    }
    setSprite(spriteName) {
        this._sprite = Game.i.assets.getSprite(spriteName);
    }
    drawBasic(gfx) {
        gfx.drawImage(this._sprite, 0, 0, undefined, undefined, this.gameObject.globalX, this.gameObject.globalY);
    }
    drawSliced(gfx) {
        gfx.drawSliced(this._sprite, this.gameObject.globalX, this.gameObject.globalY, this.gameObject.width, this.gameObject.height);
    }
}
