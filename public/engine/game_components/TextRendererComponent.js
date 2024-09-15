import { Game } from "../Game.js";
import { GameComponent } from "./GameComponent.js";
export class TextRendererComponent extends GameComponent {
    type = "TextRenderer";
    _font;
    _text;
    constructor(text, fontName) {
        super();
        this._font = Game.i.assets.getSprite(fontName);
        this._text = text;
    }
    draw(gfx) {
        gfx.drawString(this._text, this._font, this.gameObject.globalX, this.gameObject.globalY);
    }
    setText(text) {
        this._text = text;
    }
}
