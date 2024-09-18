import { Game } from "../engine/Game.js";
import { GameObject } from "../engine/GameObject.js";
import { GameSettings } from "../engine/GameSettings.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import { InputAction } from "../game/InputActions.js";

export class SplashScene extends Scene {

    private gbjamObject: GameObject|undefined;
    private credits: GameObject|undefined;

    public create(): void {

        this.credits = this.addGameobject(new GameObject(8,8,0,0));
        this.credits.setEnabled(false);

        let fontName = GameSettings.i.getValue("defaultFont", "font_rabbit");
        this.credits.addChild(new TextObject(`Programmer:`, fontName, 0, 0));
        this.credits.addChild(new TextObject(`Scarmez`, fontName, 0, 8));
        this.credits.addChild(new TextObject(`Artists:`, fontName, 0, 24));
        this.credits.addChild(new TextObject(`Bluewhit`, fontName, 0, 32));
        this.credits.addChild(new TextObject(`Rabbit`, fontName, 0, 40));
        this.credits.addChild(new TextObject(`Sound:`, fontName, 0, 56));
        this.credits.addChild(new TextObject(`Brendan`, fontName, 0, 64));

        this.gbjamObject = this.addGameobject(new SpriteObject(0,0,4,1,"splash"));

    }

    public enter(): void {

        this.startCoroutine(this.delayFunctionWithInterupt(2, ()=>{ 
            this.gbjamObject?.setEnabled(false);
            this.credits?.setEnabled(true);
        }));
        this.startCoroutine(this.delayFunctionWithInterupt(4, ()=>{ 
            Game.i.sm.swapScene(1);
        }));

    }

    private * delayFunctionWithInterupt(durationS:number, func: Function): Generator<any,any,number> {
        let totalTime = 0;
        while(true) {
            let elapsed = yield;
            totalTime += elapsed;
            if (totalTime >= durationS || Game.i.input.consumeInput(InputAction.START)){
                func();
                return;
            }
        }
    }

}

