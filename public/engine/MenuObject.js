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
    changeSound;
    onUpInput;
    onDownInput;
    onLeftInput;
    onRightInput;
    constructor(frameSpriteName, cursorSpriteName, x, y, w, h, selectSound) {
        super(x, y, w, h);
        this.cursorObject = this.addChild(new SpriteObject(8, 8, 8, 8, cursorSpriteName));
        this.changeSound = selectSound ? Game.i.assets.getAudio(selectSound) : undefined;
        this.addComponent(new SpriteRendererComponent(frameSpriteName, SpriteRendererComponent.DrawModes.Sliced));
    }
    addOption(option) {
        this.options.push(option);
        this.addChild(option);
        if (this.options.length == 1)
            option.hover();
        option.localX = 16;
        option.localY = this.options.length * 8;
        return option;
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
            if (this.onDownInput) {
                this.onDownInput();
            }
            else {
                this.changeIndex(1);
            }
        }
        if (Game.i.input.consumeInput(InputAction.UP)) {
            if (this.onUpInput) {
                this.onUpInput();
            }
            else {
                this.changeIndex(-1);
            }
        }
        if (this.onLeftInput) {
            if (Game.i.input.consumeInput(InputAction.LEFT)) {
                this.onLeftInput();
            }
        }
        if (this.onRightInput) {
            if (Game.i.input.consumeInput(InputAction.RIGHT)) {
                this.onRightInput();
            }
        }
        if (Game.i.input.consumeInput(InputAction.A)) {
            this.selectOption();
        }
        if (Game.i.input.consumeInput(InputAction.B)) {
            if (this.cancelFunction)
                this.cancelFunction();
        }
    }
    changeIndex(num) {
        let previousIndex = this.currentIndex;
        this.currentIndex += num;
        if (this.currentIndex >= this.options.length)
            this.currentIndex -= this.options.length;
        if (this.currentIndex < 0)
            this.currentIndex += this.options.length;
        if (this.currentIndex == previousIndex)
            return;
        this.options[this.currentIndex].unhover();
        this.options[this.currentIndex].hover();
        if (this.cursorObject) {
            this.cursorObject.localX = this.options[this.currentIndex].localX - 8;
            this.cursorObject.localY = this.options[this.currentIndex].localY;
        }
        if (this.changeSound) {
            this.changeSound.currentTime = 0;
            this.changeSound.play();
        }
    }
}
