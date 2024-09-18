import { GameObject } from "./GameObject.js";
import { MenuOptionObject } from "./MenuOptionObject.js";
import { Game } from "./Game.js";
import { InputAction } from "../game/InputActions.js";
import { SpriteRendererComponent } from "./SpriteRendererComponent.js";
import { SpriteObject } from "./SpriteObject.js";

export class MenuObject extends GameObject {

    private options: MenuOptionObject[] = []
    private currentIndex: number = 0;
    private cancelFunction: Function|undefined;
    private cursorObject: GameObject;
    private changeSound: HTMLAudioElement | undefined;

    public onUpInput: Function | undefined;
    public onDownInput: Function | undefined;
    public onLeftInput: Function | undefined;
    public onRightInput: Function | undefined;

    constructor(frameSpriteName: string, cursorSpriteName: string, x:number, y:number, w:number, h:number, selectSound?: string){
        super(x,y,w,h);
        this.cursorObject = this.addChild(new SpriteObject(8,8,8,8,cursorSpriteName));
        this.changeSound = selectSound? Game.i.assets.getAudio(selectSound) : undefined;
        this.addComponent(new SpriteRendererComponent(frameSpriteName, SpriteRendererComponent.DrawModes.Sliced))
    }

    public addOption(option: MenuOptionObject): MenuOptionObject{
        this.options.push(option);
        this.addChild(option);
        if(this.options.length == 1) option.hover();
        option.localX = 16;
        option.localY = this.options.length * 8;
        return option;
    }

    public selectOption(){
        if(this.options.length > 0) this.options[this.currentIndex].onSelect();
    }

    public setCancelFunction(func: Function){
        this.cancelFunction = func;
    }

    protected update(delta: number): void {

        if(Game.i.input.consumeInput(InputAction.DOWN)) {
            if(this.onDownInput) {
                this.onDownInput();
            } else {
                this.changeIndex(1);
            }
        }
        if(Game.i.input.consumeInput(InputAction.UP)){
            if(this.onUpInput){
                this.onUpInput();
            } else {
                this.changeIndex(-1);
            }
            
        }

        if(this.onLeftInput){
            if(Game.i.input.consumeInput(InputAction.LEFT)){
                this.onLeftInput();
            }
        }
        if(this.onRightInput){
            if(Game.i.input.consumeInput(InputAction.RIGHT)){
                this.onRightInput();
            }
        }
        if(Game.i.input.consumeInput(InputAction.A)){
            this.selectOption();
        }
        if(Game.i.input.consumeInput(InputAction.B)){
            if(this.cancelFunction) this.cancelFunction();
        }


    }

    changeIndex(num: number){

        let previousIndex = this.currentIndex;

        this.currentIndex += num;
        if(this.currentIndex >= this.options.length) this.currentIndex -= this.options.length;
        if(this.currentIndex < 0) this.currentIndex += this.options.length;

        if(this.currentIndex == previousIndex) return;

        this.options[this.currentIndex].unhover();
        this.options[this.currentIndex].hover();

        if(this.cursorObject) {
            this.cursorObject.localX = this.options[this.currentIndex].localX - 8;
            this.cursorObject.localY = this.options[this.currentIndex].localY;
        }
        
        if(this.changeSound){
            this.changeSound.currentTime = 0;
            this.changeSound.play();
        }

    }

}
