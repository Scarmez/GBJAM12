import { GameObject } from "./GameObject.js";
import { MenuOptionObject } from "./MenuOptionObject.js";
import { GraphicsManager } from "./GraphicsManager.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
import { Sprite } from "./Sprite.js";
export class MenuObject extends GameObject {

    private options: MenuOptionObject[] = []
    private currentIndex: number = 0;

    private sprite:Sprite;

    private cancelFunction: Function|undefined;

    constructor(sprite: Sprite, x:number, y:number, w:number, h:number){
        super(x,y,w,h);
        this.sprite = sprite;
    }

    public addOption(option: MenuOptionObject){
        this.options.push(option);
        this.addChild(option);
        if(this.options.length == 1) option.select();
        option.localX = 8;
        option.localY = this.options.length * 8;
    }

    protected draw(gfx: GraphicsManager): void {
        gfx.drawSliced(this.sprite, this.globalX, this.globalY, this.w, this.h);
    }

    public selectOption(){
        if(this.options.length > 0) this.options[this.currentIndex].onSelect();
    }

    public setCancelFunction(func: Function){
        this.cancelFunction = func;
    }

    protected update(delta: number): void {
        if(Game.i.input.isPressed(InputAction.DOWN)) {
            this.options[this.currentIndex].deselect();
            this.currentIndex++;
            if(this.currentIndex >= this.options.length) this.currentIndex = 0;
            this.options[this.currentIndex].select();
            Game.i.input.usedPress(InputAction.DOWN);
        }
        if(Game.i.input.isPressed(InputAction.UP)){
            this.options[this.currentIndex].deselect();
            this.currentIndex--;
            if(this.currentIndex < 0) this.currentIndex = this.options.length - 1;
            this.options[this.currentIndex].select();
            Game.i.input.usedPress(InputAction.UP);
        }
        if(Game.i.input.isPressed(InputAction.START) || Game.i.input.isPressed(InputAction.A)){
            this.selectOption();
            Game.i.input.usedPress(InputAction.START);
            Game.i.input.usedPress(InputAction.A);
        }
        if(Game.i.input.isPressed(InputAction.B)){
            if(this.cancelFunction) this.cancelFunction();
            Game.i.input.usedPress(InputAction.B);
        }
    }

}
