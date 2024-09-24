import { Vector2 } from "./Vector2.js";
/** The main class that is used to add objects to the Game. */
export class GameObject {
    parent = null;
    children = [];
    components = [];
    enabled = true;
    _x;
    _y;
    w;
    h;
    pos;
    // properties
    get localX() { return this._x; }
    set localX(x) { this._x = x; }
    get localY() { return this._y; }
    set localY(y) { this._y = y; }
    get localPos() { return this.pos; }
    set localPos(pos) { this.pos = pos; }
    get globalX() { if (this.parent)
        return this._x + this.parent.globalX; return this._x; }
    set globalX(x) { if (this.parent) {
        this._x = x - this.parent.globalX;
    }
    else {
        this._x = x;
    } }
    get globalY() { if (this.parent)
        return this._y + this.parent.globalY; return this._y; }
    set globalY(y) { if (this.parent) {
        this._y = y - this.parent.globalY;
    }
    else {
        this._y = y;
    } }
    get globalPos() { if (this.parent)
        return this.pos.add(this.parent.globalPos); return this.pos; }
    get width() { return this.w; }
    get height() { return this.h; }
    get isEnabled() { return this.enabled; }
    constructor(x, y, w, h) {
        this._x = x;
        this._y = y;
        this.w = w;
        this.h = h;
        this.pos = new Vector2(x, y);
    }
    /** Adds a GameObject as a child of this object and then returns it. The child's update and draw calls are called by this object. */
    addChild(gameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
        return gameObject;
    }
    /** Adds a GameComponent to this GameObject that will be updated with the gameloop. */
    addComponent(component) {
        component.gameObject = this;
        this.components.push(component);
        return component;
    }
    /** Get component of Type. */
    getComponent(type) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].type == type)
                return this.components[i];
        }
        return null;
    }
    /** Get component of Type. */
    getComponents(type) {
        let components = [];
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].type == type)
                components.push(this.components[i]);
        }
        return components;
    }
    /** Get components of Type, recursively. */
    getComponentsRecursive(type) {
        let components = [];
        components.push(...this.getComponents(type));
        for (let i = 0; i < this.children.length; i++) {
            components.push(...this.children[i].getComponentsRecursive(type));
        }
        return components;
    }
    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    update(delta) { }
    /** Called by the Scene class. Don't call this directly. */
    doUpdate(delta) {
        if (!this.enabled)
            return;
        this.update(delta);
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(delta);
        }
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].doUpdate(delta);
        }
    }
    /** Override this and it will be called by doDraw during the game's loop. Only include drawing and graphics code.*/
    draw(gfx) { }
    /** Called by the Scene class. Don't call this directly. */
    doDraw(gfx) {
        if (!this.enabled)
            return;
        this.draw(gfx);
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].draw(gfx);
        }
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].doDraw(gfx);
        }
    }
    /** Use this the enable or disable a GameObject. When disabled, the GameObject will not Update or Draw itself or it's children. */
    setEnabled(enabled) {
        if (this.enabled == enabled)
            return;
        this.enabled = enabled;
        if (enabled == true)
            this.onEnable();
        if (enabled == false)
            this.onDisable();
    }
    /** Override this and it will be called when the GameObject goes from Disabled to Enabled */
    onEnable() { }
    /** Override this and it will be called when the GameObject goes from Enabled to Disabled */
    onDisable() { }
}
