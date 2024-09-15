import { Game } from "./Game.js";
import { GameComponent } from "./GameComponent.js";
import { GraphicsManager } from "./GraphicsManager.js";
import { Sprite } from "./Sprite.js";

export class TextRendererComponent extends GameComponent {

    public readonly type: string = "TextRenderer";

    private _font: Sprite;
    private _text: string;

    constructor(text: string, fontName: string){
        super();
        this._font = Game.i.assets.getSprite(fontName);
        this._text = text;
    }

    public draw(gfx: GraphicsManager): void {
        gfx.drawString(this._text, this._font, this.gameObject!.globalX, this.gameObject!.globalY);
    }

    public setText(text: string){
        this._text = text;
    }

}