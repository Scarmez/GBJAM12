import { Game } from "./Game.js";
import { GameObject } from "./GameObject.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
import { TextRendererComponent } from "./TextRendererComponent.js";
import { Vector2 } from "./Vector2.js";

export class MenuOptionObject extends GameObject {

    private _textRenderer: TextRendererComponent;
    protected _onSelect: Function;
    protected _hovered: boolean = false;
    public onHover: Function | undefined;
    public offHover: Function | undefined;
    protected _selectSound: HTMLAudioElement | undefined;

    public get textRenderer(){return this._textRenderer;}

    constructor(text: string, font: string, onSelect: Function, onHover?: Function, selectSound?: string, spriteName?: string){

        super(0,0,0,0);
        this._onSelect = onSelect;
        if(spriteName) this.addComponent(new SpriteRendererComponent(spriteName));
        this._textRenderer = this.addComponent(new TextRendererComponent(text, font)) as TextRendererComponent;
        if(onHover) this.onHover = onHover;
        if(selectSound) this._selectSound = Game.i.assets.getAudio(selectSound);
    }

    public hover(){
        this._hovered = true;
        if(this.onHover) this.onHover();
    }

    public unhover(){
        this._hovered = false;
        if(this.offHover) this.offHover();
    }

    public onSelect(){
        if(this._selectSound){
            this._selectSound.currentTime = 0;
            this._selectSound.play();
        }
        this._onSelect();
    }

    public setText(text: string){
        this._textRenderer.setText(text);
    }

}