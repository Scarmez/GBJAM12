import { GameObject } from "./GameObject.js";
import { TextRendererComponent } from "./TextRendererComponent.js";
/** Simple extension of the GameObject class that draws a string to the screen using the specified Font. */
export class TextObject extends GameObject {
    _textRenderer;
    get textRenderer() { return this._textRenderer; }
    ;
    constructor(text, fontName, x, y, colour = 0) {
        super(x, y, 0, 0);
        this._textRenderer = this.addComponent(new TextRendererComponent(text, fontName, colour));
    }
}
