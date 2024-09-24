import { GameObject } from "./GameObject.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
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
    cursorOffset = { x: 8, y: 0 };
    interactable = true;
    constructor(frameSpriteName, cursorObject, x, y, w, h, changeSound) {
        super(x, y, w, h);
        if (cursorObject)
            this.cursorObject = this.addChild(cursorObject);
        this.changeSound = changeSound ? Game.i.assets.getAudio(changeSound) : undefined;
        if (frameSpriteName)
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
        if (!this.interactable)
            return;
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
        if (this.options.length == 0)
            return;
        let previousIndex = this.currentIndex;
        this.currentIndex += num;
        if (this.currentIndex >= this.options.length)
            this.currentIndex -= this.options.length;
        if (this.currentIndex < 0)
            this.currentIndex += this.options.length;
        if (this.currentIndex == previousIndex)
            return;
        this.options[previousIndex].unhover();
        this.options[this.currentIndex].hover();
        if (this.cursorObject) {
            this.cursorObject.localX = this.options[this.currentIndex].localX - this.cursorOffset.x;
            this.cursorObject.localY = this.options[this.currentIndex].localY - this.cursorOffset.y;
        }
        if (this.changeSound) {
            this.changeSound.currentTime = 0;
            this.changeSound.play();
        }
    }
    setIndex(num) {
        this.options[this.currentIndex].unhover();
        this.currentIndex = num;
        this.options[this.currentIndex].hover();
        if (this.cursorObject) {
            this.cursorObject.localX = this.options[this.currentIndex].localX - this.cursorOffset.x;
            this.cursorObject.localY = this.options[this.currentIndex].localY - this.cursorOffset.y;
        }
    }
}
