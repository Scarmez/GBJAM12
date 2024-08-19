import { GameObject } from "./GameObject.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
export class MenuObject extends GameObject {
    options = [];
    currentIndex = 0;
    sprite;
    cancelFunction;
    constructor(sprite, x, y, w, h) {
        super(x, y, w, h);
        this.sprite = sprite;
    }
    addOption(option) {
        this.options.push(option);
        this.addChild(option);
        if (this.options.length == 1)
            option.select();
        option.localX = 8;
        option.localY = this.options.length * 8;
    }
    draw(gfx) {
        gfx.drawSliced(this.sprite, this.globalX, this.globalY, this.w, this.h);
    }
    selectOption() {
        if (this.options.length > 0)
            this.options[this.currentIndex].onSelect();
    }
    setCancelFunction(func) {
        this.cancelFunction = func;
    }
    update(delta) {
        if (Game.i.input.isPressed(InputAction.DOWN)) {
            this.options[this.currentIndex].deselect();
            this.currentIndex++;
            if (this.currentIndex >= this.options.length)
                this.currentIndex = 0;
            this.options[this.currentIndex].select();
            Game.i.input.usedPress(InputAction.DOWN);
        }
        if (Game.i.input.isPressed(InputAction.UP)) {
            this.options[this.currentIndex].deselect();
            this.currentIndex--;
            if (this.currentIndex < 0)
                this.currentIndex = this.options.length - 1;
            this.options[this.currentIndex].select();
            Game.i.input.usedPress(InputAction.UP);
        }
        if (Game.i.input.isPressed(InputAction.START) || Game.i.input.isPressed(InputAction.A)) {
            this.selectOption();
            Game.i.input.usedPress(InputAction.START);
            Game.i.input.usedPress(InputAction.A);
        }
        if (Game.i.input.isPressed(InputAction.B)) {
            if (this.cancelFunction)
                this.cancelFunction();
            Game.i.input.usedPress(InputAction.B);
        }
    }
}
