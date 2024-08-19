import { GameObject } from "./GameObject.js";
import { Game } from "./Game.js";
export class MenuOptionObject extends GameObject {
    _text;
    get text() { return this._text; }
    _onSelect;
    _selected = false;
    constructor(text, font, onSelect, onHover) {
        super(0, 0, 0, 0);
        this._text = text;
        this._onSelect = onSelect;
    }
    draw(gfx) {
        gfx.drawString((this._selected ? ">" : " ") + this._text, Game.i.assets.getSprite("font"), this.globalX, this.globalY);
    }
    select() {
        this._selected = true;
    }
    deselect() {
        this._selected = false;
    }
    onSelect() {
        this._onSelect();
    }
    setText(text) {
        this._text = text;
    }
}
