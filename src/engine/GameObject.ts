import { GameComponent } from "./GameComponent.js";
import { GraphicsManager } from "./GraphicsManager.js";
import { Vector2 } from "./Vector2.js";

/** The main class that is used to add objects to the Game. */
export class GameObject {

    public parent: GameObject|null = null;
    protected children: GameObject[] = [];
    protected components: GameComponent[] = [];

    protected enabled: boolean = true;
    private _x: number;
    private _y: number;
    protected w: number;
    protected h: number;

    protected pos: Vector2;

    // properties
    public get localX():number { return this._x; }
    public set localX(x: number) { this._x = x; }
    public get localY():number { return this._y; }
    public set localY(y: number) { this._y = y; }

    public get localPos():Vector2 { return this.pos; }
    public set localPos(pos:Vector2) { this.pos = pos; }

    public get globalX():number { if(this.parent) return this._x + this.parent.globalX; return this._x; }
    public set globalX(x: number) { if(this.parent){ this._x = x - this.parent.globalX } else { this._x = x;}}
    public get globalY():number { if(this.parent) return this._y + this.parent.globalY; return this._y; }
    public set globalY(y: number) { if(this.parent){ this._y = y - this.parent.globalY } else { this._y = y;}}
    public get globalPos():Vector2 {if(this.parent) return this.pos.add(this.parent.globalPos); return this.pos; }

    public get width():number { return this.w; }
    public get height():number { return this.h; }

    public get isEnabled():boolean {return this.enabled; }

    public constructor(x:number,y:number,w:number,h:number){

        this._x = x;
        this._y = y;
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

    /** Adds a GameComponent to this GameObject that will be updated with the gameloop. */
    public addComponent(component: GameComponent): GameComponent{
        component.gameObject = this;
        this.components.push(component);
        return component;
    }

    /** Get component of Type. */
    public getComponent(type: string): GameComponent | null {
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i].type == type) return this.components[i];
        }
        return null;
    }

    /** Get component of Type. */
    public getComponents(type: string): GameComponent[] {
        let components: GameComponent[] = []
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i].type == type) components.push(this.components[i]);
        }
        return components;
    }

    /** Get components of Type, recursively. */
    public getComponentsRecursive(type:string): GameComponent[] {
        let components: GameComponent[] = [];
        components.push(...this.getComponents(type));
        for(let i = 0; i < this.children.length; i++){
            components.push(...this.children[i].getComponentsRecursive(type));
        }
        return components;
    }


    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    protected update(delta: number): void {}
    /** Called by the Scene class. Don't call this directly. */
    public doUpdate(delta: number): void {
        if(!this.enabled) return;
        this.update(delta);
        for(let i = 0; i < this.components.length; i++){
            this.components[i].update(delta);
        }
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
        for(let i = 0; i < this.components.length; i++){
            this.components[i].draw(gfx);
        }
        for(let i = 0; i < this.children.length; i++){
            this.children[i].doDraw(gfx);
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