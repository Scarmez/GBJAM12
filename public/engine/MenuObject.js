import { GameObject } from "./GameObject.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
import { SpriteObject } from "./SpriteObject.js";
export class MenuObject extends GameObject {
    options = [];
    currentIndex = 0;
    cancelFunction;
    cursorObject;
    constructor(frameSpriteName, cursorSpriteName, x, y, w, h) {
        super(x, y, w, h);
        this.cursorObject = this.addChild(new SpriteObject(8, 8, 8, 8, cursorSpriteName));
        this.addComponent(new SpriteRendererComponent(frameSpriteName, SpriteRendererComponent.DrawModes.Sliced));
    }
    addOption(option) {
        this.options.push(option);
        this.addChild(option);
        if (this.options.length == 1)
            option.hover();
        option.localX = 16;
        option.localY = this.options.length * 8;
    }
    selectOption() {
        if (this.options.length > 0)
            this.options[this.currentIndex].onSelect();
    }
    setCancelFunction(func) {
        this.cancelFunction = func;
    }
    update(delta) {
        if (Game.i.input.consumeInput(InputAction.DOWN)) {
            this.options[this.currentIndex].unhover();
            this.currentIndex++;
            if (this.currentIndex >= this.options.length)
                this.currentIndex = 0;
            this.options[this.currentIndex].hover();
            this.cursorObject.localY = this.options[this.currentIndex].localY;
        }
        if (Game.i.input.consumeInput(InputAction.UP)) {
            this.options[this.currentIndex].unhover();
            this.currentIndex--;
            if (this.currentIndex < 0)
                this.currentIndex = this.options.length - 1;
            this.options[this.currentIndex].hover();
            this.cursorObject.localY = this.options[this.currentIndex].localY;
        }
        if (Game.i.input.consumeInput(InputAction.START) || Game.i.input.consumeInput(InputAction.A)) {
            this.selectOption();
            Game.i.input.usedPress(InputAction.START);
            Game.i.input.usedPress(InputAction.A);
        }
        if (Game.i.input.consumeInput(InputAction.B)) {
            if (this.cancelFunction)
                this.cancelFunction();
        }
    }
}
