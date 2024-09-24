import { Game } from "./Game.js";
import { GameComponent } from "./GameComponent.js";
import { GraphicsManager } from "./GraphicsManager.js";
import { Sprite } from "./Sprite.js";

enum DrawModes  {
    Basic,
    Sliced
}

export class SpriteRendererComponent extends GameComponent {

    public readonly type: string = "SpriteRenderer";

    static readonly DrawModes = DrawModes;

    private _sprite: Sprite;
    private _drawMode: DrawModes;

    private _xFrame: number = 0;
    private _yFrame: number = 0;

    public flipY: boolean = false;
    public flipX: boolean = false;
    public rotation: number = 0;

    constructor(spriteName: string, drawMode?: DrawModes){
        super();
        this._sprite = Game.i.assets.getSprite(spriteName);;
        this._drawMode = drawMode || DrawModes.Basic;
    }

    public draw(gfx: GraphicsManager): void {
        
        switch(this._drawMode){
            case DrawModes.Basic: this.drawBasic(gfx); break;
            case DrawModes.Sliced: this.drawSliced(gfx); break;
            default: this.drawBasic(gfx); break;
        }

    }

    public setFrame(x:number, y:number){
        if((x + 1) * this._sprite.frameWidth > this._sprite.width) x = this._sprite.width - this._sprite.frameWidth;
        if((y + 1) * this._sprite.frameHeight > this._sprite.height) y = this._sprite.height - this._sprite.frameHeight;
        this._xFrame = x;
        this._yFrame = y;
    }

    public setSprite(spriteName: string){
        this._sprite = Game.i.assets.getSprite(spriteName);
    }

    public getSprite(): Sprite {
        return this._sprite;
    }

    private drawBasic(gfx: GraphicsManager){
        gfx.drawImage(this._sprite, this._xFrame * this._sprite.frameWidth, this._yFrame * this._sprite.frameHeight, this._sprite.frameWidth, this._sprite.frameHeight, this.gameObject!.globalX, this.gameObject!.globalY, undefined, undefined, this.flipX, this.flipY, this.rotation);
    }

    private drawSliced(gfx: GraphicsManager){
        gfx.drawSliced(this._sprite, this.gameObject!.globalX, this.gameObject!.globalY, this.gameObject!.width, this.gameObject!.height);
    }
   

}

