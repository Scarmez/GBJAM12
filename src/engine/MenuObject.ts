import { GameObject } from "./GameObject.js";
import { MenuOptionObject } from "./MenuOptionObject.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
import { SpriteObject } from "./SpriteObject.js";
import { Vector2 } from "./Vector2.js";

export class MenuObject extends GameObject {

    private options: MenuOptionObject[] = []
    private currentIndex: number = 0;
    private cancelFunction: Function|undefined;
    private cursorObject: GameObject;

    constructor(frameSpriteName: string, cursorSpriteName: string, x:number, y:number, w:number, h:number){
        super(x,y,w,h);
        this.cursorObject = this.addChild(new SpriteObject(8,8,8,8,cursorSpriteName));
        this.addComponent(new SpriteRendererComponent(frameSpriteName, SpriteRendererComponent.DrawModes.Sliced))
    }

    public addOption(option: MenuOptionObject){
        this.options.push(option);
        this.addChild(option);
        if(this.options.length == 1) option.hover();
        option.localX = 16;
        option.localY = this.options.length * 8;
    }

    public selectOption(){
        if(this.options.length > 0) this.options[this.currentIndex].onSelect();
    }

    public setCancelFunction(func: Function){
        this.cancelFunction = func;
    }

    protected update(delta: number): void {

        if(Game.i.input.consumeInput(InputAction.DOWN)) {
            this.options[this.currentIndex].unhover();
            this.currentIndex++;
            if(this.currentIndex >= this.options.length) this.currentIndex = 0;
            this.options[this.currentIndex].hover();
            this.cursorObject.localY = this.options[this.currentIndex].localY;
        }
        if(Game.i.input.consumeInput(InputAction.UP)){
            this.options[this.currentIndex].unhover();
            this.currentIndex--;
            if(this.currentIndex < 0) this.currentIndex = this.options.length - 1;
            this.options[this.currentIndex].hover();
            this.cursorObject.localY = this.options[this.currentIndex].localY;
        }
        if(Game.i.input.consumeInput(InputAction.START) || Game.i.input.consumeInput(InputAction.A)){
            this.selectOption();
            Game.i.input.usedPress(InputAction.START);
            Game.i.input.usedPress(InputAction.A);
        }
        if(Game.i.input.consumeInput(InputAction.B)){
            if(this.cancelFunction) this.cancelFunction();
        }


    }

}
