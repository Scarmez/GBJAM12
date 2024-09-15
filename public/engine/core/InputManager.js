export class InputManager {
    keyMaps = new Map();
    pressedKeys = [];
    heldKeys = [];
    constructor() {
        window.addEventListener("keydown", (e => { this.handleKeyDown(e); }));
        window.addEventListener("keyup", (e => { this.handleKeyUp(e); }));
    }
    addMapping(key, action) {
        this.keyMaps.set(action, key);
    }
    handleKeyDown(e) {
        if (e.repeat)
            return;
        this.pressedKeys.push(e.code);
        this.heldKeys.push(e.code);
    }
    handleKeyUp(e) {
        let index = this.heldKeys.indexOf(e.code);
        if (index > -1)
            this.heldKeys.splice(index);
    }
    update(delta) {
        this.pressedKeys = [];
    }
    isPressed(action) {
        let key = this.keyMaps.get(action);
        if (!key)
            return false;
        return this.pressedKeys.includes(key);
    }
    usedPress(action) {
        let key = this.keyMaps.get(action);
        if (!key)
            return false;
        let index = this.pressedKeys.indexOf(key);
        if (index > -1)
            this.pressedKeys.splice(index);
    }
    isHeld(action) {
        let key = this.keyMaps.get(action);
        if (!key)
            return false;
        return this.heldKeys.includes(key);
    }
}
