import { Game } from "./Game.js";
import { GameComponent } from "./GameComponent.js";
export class TextRendererComponent extends GameComponent {
    type = "TextRenderer";
    _font;
    _text = "";
    _width = 0;
    _colour;
    get width() { return this._width; }
    constructor(text, fontName, colour = 0) {
        super();
        this._font = Game.i.assets.getSprite(fontName);
        this._colour = colour;
        this.setText(text);
    }
    draw(gfx) {
        gfx.drawString(this._text, this._font, this.gameObject.globalX, this.gameObject.globalY, this._colour);
    }
    setText(text) {
        this._text = text;
        let width = 0;
        for (let i = 0; i < this._text.length; i++) {
            if (text.charCodeAt(i) in this._font.overrides) {
                width += this._font.overrides[text.charCodeAt(i)];
            }
            else {
                width += this._font.frameWidth;
            }
        }
        this._width = width;
    }
}
