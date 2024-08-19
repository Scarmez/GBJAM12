import { Game } from "../engine/Game.js";
import { GameObject } from "../engine/GameObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
export class SplashScene extends Scene {
    gbjamObject;
    credits;
    create() {
        this.credits = this.addGameobject(new GameObject(8, 8, 0, 0));
        this.credits.setEnabled(false);
        this.credits.addChild(new TextObject(`Programmer:`, Game.i.assets.getSprite("font"), 0, 0));
        this.credits.addChild(new TextObject(`Scarmez`, Game.i.assets.getSprite("font"), 0, 8));
        this.credits.addChild(new TextObject(`Artist:`, Game.i.assets.getSprite("font"), 0, 24));
        this.credits.addChild(new TextObject(`Bluewhit`, Game.i.assets.getSprite("font"), 0, 32));
        this.credits.addChild(new TextObject(`Sound:`, Game.i.assets.getSprite("font"), 0, 48));
        this.credits.addChild(new TextObject(`Brendan`, Game.i.assets.getSprite("font"), 0, 56));
        console.log(Game.i.assets.getSprite("font"));
        this.gbjamObject = this.addGameobject(new SpriteObject(0, 0, 4, 1, Game.i.assets.getSprite("splash")));
    }
    enter() {
        this.startCoroutine(this.delayFunction(2, () => {
            this.gbjamObject?.setEnabled(false);
            this.credits?.setEnabled(true);
        }));
        this.startCoroutine(this.delayFunction(4, () => {
            Game.i.sm.swapScene(1);
        }));
    }
    *delayFunction(durationS, func) {
        let totalTime = 0;
        while (true) {
            let elapsed = yield;
            totalTime += elapsed;
            if (totalTime >= durationS) {
                func();
                return;
            }
        }
    }
}
