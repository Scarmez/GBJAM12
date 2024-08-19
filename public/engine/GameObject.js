import { Vector2 } from "./Vector2.js";
/** The main class that is used to add objects to the Game. */
export class GameObject {
    parent = null;
    children = [];
    enabled = true;
    x;
    y;
    w;
    h;
    pos;
    // properties
    get localX() { return this.x; }
    set localX(x) { this.x = x; }
    get localY() { return this.y; }
    set localY(y) { this.y = y; }
    get localPos() { return this.pos; }
    set localPos(pos) { this.pos = pos; }
    get globalX() { if (this.parent)
        return this.x + this.parent.globalX; return this.x; }
    get globalY() { if (this.parent)
        return this.y + this.parent.globalY; return this.y; }
    get globalPos() { if (this.parent)
        return this.pos.add(this.parent.globalPos); return this.pos; }
    get isEnabled() { return this.enabled; }
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
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
    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    update(delta) { }
    /** Called by the Scene class. Don't call this directly. */
    doUpdate(delta) {
        if (!this.enabled)
            return;
        this.update(delta);
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
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(gfx);
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
