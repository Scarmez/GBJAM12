import { Game } from "../engine/Game.js";
import { MenuObject } from "../engine/MenuObject.js";
import { MenuOptionObject } from "../engine/MenuOptionObject.js";
import { Scene } from "../engine/Scene.js";
import { TextObject } from "../engine/TextObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class NamePetScene extends Scene {

    private _inputMenu: MenuObject|undefined;
    private _currentName: string = "";
    private _currentNameDisplay: TextObject|undefined;

    public create(): void {
        
        this.addGameobject(new TextObject("Name Your Pet!", "font_rabbit", 24, 8))
        this._inputMenu = this.addGameobject(new MenuObject("frame", "cursor", 0, 32, 160, 48)) as MenuObject;
        this._inputMenu.setCancelFunction(()=>{this.delete()});
        this._inputMenu.onDownInput = function(){ this.changeIndex(9); }
        this._inputMenu.onUpInput = function()  { this.changeIndex(-9);}
        this._inputMenu.onLeftInput = function(){ this.changeIndex(-1);}
        this._inputMenu.onRightInput = function(){ this.changeIndex(1);}

        this._currentNameDisplay = this.addGameobject(new TextObject("________", "font_rabbit", 48,24)) as TextObject;
        this.addGameobject(new TextObject("A: Select", "font_rabbit", 8, 80));
        this.addGameobject(new TextObject("B: Delete", "font_rabbit", 8, 88));
        this.addGameobject(new TextObject("START: Confirm", "font_rabbit", 8, 104));

        for(let i = 0; i <= 25; i++){
            let newObj = this._inputMenu.addOption(new MenuOptionObject(String.fromCharCode( i + 65), "font_rabbit", ()=>{
                this.appendChar(String.fromCharCode( i + 65));
            }));
            newObj.localX = 16 + i % 9 * 16;
            newObj.localY = 8 + Math.floor(i / 9) * 8
        }

        let newObj = this._inputMenu.addOption(new MenuOptionObject("_", "font_rabbit", ()=>{
            this.appendChar(" ");
        }));
        newObj.localX = 16 + 26 % 9 * 16;
        newObj.localY = 8 + Math.floor(26 / 9) * 8

    }

    private appendChar(char: string){

        if(this._currentName.length == 8) return;

        this._currentName += char;
        this._currentNameDisplay!.textRenderer.setText(this._currentName.padEnd(8,"_"));

    }

    private delete(){
        if(this._currentName.length == 0 ) return;
        this._currentName = this._currentName.substring(0, this._currentName.length - 1);
        this._currentNameDisplay!.textRenderer.setText(this._currentName.padEnd(8,"_"));
    }

    protected update(delta: number): void {
        if(Game.i.input.consumeInput(InputAction.START)){
            SaveData.saveObj.petName = this._currentName;
            Game.i.sm.swapScene(4)
        }
    }

}