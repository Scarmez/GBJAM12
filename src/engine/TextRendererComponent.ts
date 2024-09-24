import { Game } from "./Game.js";
import { GameComponent } from "./GameComponent.js";
import { GraphicsManager } from "./GraphicsManager.js";
import { Sprite } from "./Sprite.js";

export class TextRendererComponent extends GameComponent {

    public readonly type: string = "TextRenderer";

    private _font: Sprite;
    private _text: string = "";
    private _width: number = 0;
    private _colour: number;

    public get width(){ return this._width; }
    public setColour(num: number){
        this._colour = num;
    }

    constructor(text: string, fontName: string, colour: number = 0){
        super();
        this._font = Game.i.assets.getSprite(fontName);
        this._colour = colour;
        this.setText(text);
    }

    public draw(gfx: GraphicsManager): void {
        gfx.drawString(this._text, this._font, this.gameObject!.globalX, this.gameObject!.globalY, this._colour);
    }

    public setText(text: string){
        this._text = text;

        let width = 0;
        for(let i = 0; i < this._text.length; i++){
            if(text.charCodeAt(i) in this._font.overrides){
                width += this._font.overrides[text.charCodeAt(i)];
            } else {
                width += this._font.frameWidth;
            }
        }
        this._width = width;

    }

}