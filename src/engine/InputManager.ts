import { InputAction } from "../game/InputActions.js";

export class InputManager {

    private keyMaps: Map<InputAction, string> = new Map();
    private pressedKeys: string[] = [];
    private heldKeys: string[] = [];

    constructor(){
        window.addEventListener("keydown", (e=>{e.preventDefault(); this.handleKeyDown(e)}));
        window.addEventListener("keyup", (e=>{e.preventDefault(); this.handleKeyUp(e)}));
    }

    public addMapping(key:string, action:InputAction ){
        this.keyMaps.set(action, key);
    }

    private handleKeyDown(e:KeyboardEvent){
        if(e.repeat) return;
        this.pressedKeys.push(e.code);
        this.heldKeys.push(e.code);
    }

    private handleKeyUp(e:KeyboardEvent){
        let index = this.heldKeys.indexOf(e.code);
        if(index > -1)this.heldKeys.splice(index);
    }


    public update(delta:number) {
        this.pressedKeys = [];
    }

    public isPressed(action: InputAction){
        let key = this.keyMaps.get(action);
        if(!key) return false;
        return this.pressedKeys.includes(key);
    }

    public consumeInput(action: InputAction): boolean{
        let key = this.keyMaps.get(action);
        if(!key) return false;

        if(this.pressedKeys.includes(key)){
            let index = this.pressedKeys.indexOf(key);
            if(index > -1)this.pressedKeys.splice(index);
            return true;
        } else return false;
    }

    public usedPress(action: InputAction){
        let key = this.keyMaps.get(action);
        if(!key) return false;
        let index = this.pressedKeys.indexOf(key);
        if(index > -1)this.pressedKeys.splice(index);
    }

    public isHeld(action: InputAction){
        let key = this.keyMaps.get(action);
        if(!key) return false;
        return this.heldKeys.includes(key);
    }


}