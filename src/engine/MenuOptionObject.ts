import {GameObject} from "./GameObject.js";
import {Sprite} from "./Sprite.js";
import {GraphicsManager} from "./GraphicsManager.js";
import { Game } from "./Game.js";
export class MenuOptionObject extends GameObject {

    protected _text: string;
    public get text():string {return this._text; }
    protected _onSelect: Function;
    protected _selected: boolean = false;

    constructor(text: string, font: Sprite, onSelect: Function, onHover?: Function){

        super(0,0,0,0);
        this._text = text;
        this._onSelect = onSelect;

    }

    protected draw(gfx: GraphicsManager): void {
        gfx.drawString((this._selected?">": " ") + this._text, Game.i.assets.getSprite("font"), this.globalX, this.globalY);
    }

    public select(){
        this._selected = true;
    }

    public deselect(){
        this._selected = false;
    }

    public onSelect(){
        this._onSelect();
    }

    public setText(text: string){
        this._text = text;
    }

}