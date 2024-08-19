import {GraphicsManager} from "./GraphicsManager.js";
import {Vector2} from "./Vector2.js";

/** The main class that is used to add objects to the Game. */
export class GameObject {

    public parent: GameObject|null = null;
    protected children: GameObject[] = [];

    protected enabled: boolean = true;
    private x: number;
    private y: number;
    protected w: number;
    protected h: number;

    protected pos: Vector2;

    // properties
    public get localX():number { return this.x; }
    public set localX(x: number) { this.x = x; }
    public get localY():number { return this.y; }
    public set localY(y: number) { this.y = y; }

    public get localPos():Vector2 { return this.pos; }
    public set localPos(pos:Vector2) { this.pos = pos; }

    public get globalX():number { if(this.parent) return this.x + this.parent.globalX; return this.x; }
    public get globalY():number { if(this.parent) return this.y + this.parent.globalY; return this.y; }
    public get globalPos():Vector2 {if(this.parent) return this.pos.add(this.parent.globalPos); return this.pos; }

    public get isEnabled():boolean {return this.enabled; }

    public constructor(x:number,y:number,w:number,h:number){

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.pos = new Vector2(x,y);
    }

    /** Adds a GameObject as a child of this object and then returns it. The child's update and draw calls are called by this object. */
    public addChild(gameObject: GameObject): GameObject {
        gameObject.parent = this;
        this.children.push(gameObject);
        return gameObject;
    }

    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    protected update(delta: number): void {}
    /** Called by the Scene class. Don't call this directly. */
    public doUpdate(delta: number): void {
        if(!this.enabled) return;
        this.update(delta);
        for(let i = 0; i < this.children.length; i++){
            this.children[i].doUpdate(delta);
        }
    }

    /** Override this and it will be called by doDraw during the game's loop. Only include drawing and graphics code.*/
    protected draw(gfx: GraphicsManager): void {}
    /** Called by the Scene class. Don't call this directly. */
    public doDraw(gfx: GraphicsManager): void {
        if(!this.enabled) return;
        this.draw(gfx);
        for(let i = 0; i < this.children.length; i++){
            this.children[i].draw(gfx);
        }
    }

    /** Use this the enable or disable a GameObject. When disabled, the GameObject will not Update or Draw itself or it's children. */
    public setEnabled(enabled:boolean){
        if(this.enabled == enabled) return;
        this.enabled = enabled;
        if(enabled == true) this.onEnable();
        if(enabled == false) this.onDisable();
    }
    
    /** Override this and it will be called when the GameObject goes from Disabled to Enabled */
    protected onEnable(): void {}
    /** Override this and it will be called when the GameObject goes from Enabled to Disabled */
    protected onDisable(): void {}

}