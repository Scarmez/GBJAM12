import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { Scene } from "../engine/Scene.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { InputAction } from "../game/InputActions.js";
export class ChooseEggScene extends Scene {
    hatchMash = 20;
    eggObj;
    acceptInput = true;
    create() {
        this.eggObj = this.addGameobject(new AnimatedSpriteObject(55, 64, 32, 32, "egg_loop0"));
        this.eggObj.animationController.paused = true;
        this.eggObj.animationController.loop = false;
        this.eggObj.animationController.frameSpeed = 0.18;
        this.eggObj.animationController.addOnEndEvent(() => { this.acceptInput = true; });
        this.addGameobject(new WindowObject("frame2", 0, 120, 160, 24));
        this.addGameobject(new TextObject(`Mash "A" to Hatch!`, "font_Chit", 8, 128));
    }
    update(delta) {
        if (!this.acceptInput)
            return;
        if (this.hatchMash > 0) {
            if (Game.i.input.consumeInput(InputAction.A)) {
                if (this.hatchMash > 0) {
                    this.hatchMash--;
                    this.eggObj.animationController.play();
                    this.acceptInput = false;
                    if (this.hatchMash == 10)
                        this.eggObj.spriteRenderer.setSprite("egg_loop1");
                    if (this.hatchMash == 0)
                        this.eggObj.spriteRenderer.setSprite("egg_loop2");
                }
                else {
                }
            }
        }
    }
}
