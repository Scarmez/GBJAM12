import { GameObject } from "./GameObject.js";
import { TextRendererComponent } from "./TextRendererComponent.js";

export class MenuOptionObject extends GameObject {

    private _textRenderer: TextRendererComponent;
    protected _onSelect: Function;
    protected _hovered: boolean = false;

    constructor(text: string, font: string, onSelect: Function, onHover?: Function){

        super(0,0,0,0);
        this._onSelect = onSelect;
        this._textRenderer = this.addComponent(new TextRendererComponent(text, font)) as TextRendererComponent;

    }

    public hover(){
        this._hovered = true;
    }

    public unhover(){
        this._hovered = false;
    }

    public onSelect(){
        this._onSelect();
    }

    public setText(text: string){
        this._textRenderer.setText(text);
    }

}