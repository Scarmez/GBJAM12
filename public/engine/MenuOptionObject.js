import { GameObject } from "./GameObject.js";
import { TextRendererComponent } from "./TextRendererComponent.js";
export class MenuOptionObject extends GameObject {
    _textRenderer;
    _onSelect;
    _hovered = false;
    constructor(text, font, onSelect, onHover) {
        super(0, 0, 0, 0);
        this._onSelect = onSelect;
        this._textRenderer = this.addComponent(new TextRendererComponent(text, font));
    }
    hover() {
        this._hovered = true;
    }
    unhover() {
        this._hovered = false;
    }
    onSelect() {
        this._onSelect();
    }
    setText(text) {
        this._textRenderer.setText(text);
    }
}
