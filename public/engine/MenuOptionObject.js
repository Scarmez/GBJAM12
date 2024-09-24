import { Game } from "./Game.js";
import { GameObject } from "./GameObject.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
import { TextRendererComponent } from "./TextRendererComponent.js";
export class MenuOptionObject extends GameObject {
    _textRenderer;
    _onSelect;
    _hovered = false;
    onHover;
    offHover;
    _selectSound;
    get textRenderer() { return this._textRenderer; }
    constructor(text, font, onSelect, onHover, selectSound, spriteName) {
        super(0, 0, 0, 0);
        this._onSelect = onSelect;
        if (spriteName)
            this.addComponent(new SpriteRendererComponent(spriteName));
        this._textRenderer = this.addComponent(new TextRendererComponent(text, font));
        if (onHover)
            this.onHover = onHover;
        if (selectSound)
            this._selectSound = Game.i.assets.getAudio(selectSound);
    }
    hover() {
        this._hovered = true;
        if (this.onHover)
            this.onHover();
    }
    unhover() {
        this._hovered = false;
        if (this.offHover)
            this.offHover();
    }
    onSelect() {
        if (this._selectSound) {
            this._selectSound.currentTime = 0;
            this._selectSound.play();
        }
        this._onSelect();
    }
    setText(text) {
        this._textRenderer.setText(text);
    }
}
