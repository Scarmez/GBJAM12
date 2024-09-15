import { MenuOptionObject } from "./MenuOptionObject.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
/** UI element that displays the current object selected and can screen using the left and right inputs. */
export class UIHorizontalPickerObject extends MenuOptionObject {
    currentIndex = 0;
    options = [];
    prefix;
    constructor(text, font) {
        super(text, font, function () { });
        this.prefix = text;
    }
    addOption(option) {
        this.options.push(option);
        if (this.options.length == 1)
            this.setText(this.prefix + option.text);
    }
    removeOption(index) {
        this.options.splice(index, 1);
    }
    update(delta) {
        if (this._hovered) {
            if (Game.i.input.isPressed(InputAction.LEFT)) {
                Game.i.input.usedPress(InputAction.LEFT);
                this.currentIndex--;
                if (this.currentIndex < 0)
                    this.currentIndex = this.options.length - 1;
                this.options[this.currentIndex].onSelect();
                this.setText(this.prefix + this.options[this.currentIndex].text);
            }
            if (Game.i.input.isPressed(InputAction.RIGHT)) {
                Game.i.input.usedPress(InputAction.RIGHT);
                this.currentIndex++;
                if (this.currentIndex >= this.options.length)
                    this.currentIndex = 0;
                this.options[this.currentIndex].onSelect();
                this.setText(this.prefix + this.options[this.currentIndex].text);
            }
        }
    }
}
