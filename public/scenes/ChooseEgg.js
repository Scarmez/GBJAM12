import creature from "../animations/creature.js";
import egg from "../animations/egg.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { Scene } from "../engine/Scene.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { InputAction } from "../game/InputActions.js";
export class ChooseEggScene extends Scene {
    hatchMash = 10;
    eggObj;
    creatureObj;
    frameObj;
    acceptInput = true;
    create() {
        this.eggObj = this.addGameobject(new AnimatedSpriteObject(55, 64, 0, 0, "c1_egg", egg));
        this.eggObj.localX = 80 - this.eggObj.spriteRenderer.getSprite().frameWidth / 2;
        this.eggObj.localY = 120 - this.eggObj.spriteRenderer.getSprite().frameHeight - 16;
        this.creatureObj = this.addGameobject(new AnimatedSpriteObject(0, 0, 0, 0, "c1_infant", creature));
        this.creatureObj.localX = 80 - this.creatureObj.spriteRenderer.getSprite().frameWidth / 2;
        this.creatureObj.localY = 120 - this.creatureObj.spriteRenderer.getSprite().frameHeight - 16;
        this.creatureObj.setEnabled(false);
        this.eggObj.animationController.paused = true;
        this.eggObj.animationController.loop = false;
        this.eggObj.animationController.frameSpeed = 0.18;
        this.eggObj.animationController.addOnEndEvent(() => { this.acceptInput = true; });
        this.frameObj = this.addGameobject(new WindowObject("frame", 0, 120, 160, 24));
        this.frameObj.addChild(new TextObject(`Mash "A" to Hatch!`, "font_rabbit", 8, 8));
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
                    if (this.hatchMash == 5) {
                        this.eggObj.animationController.setAnimation("stage1");
                        console.log(this.eggObj.animationController);
                    }
                    if (this.hatchMash == 0) {
                        this.frameObj?.setEnabled(false);
                        this.eggObj.animationController.setAnimation("stage2");
                        this.eggObj.animationController.play();
                        this.eggObj.animationController.clearOnEndEvents();
                        this.eggObj.animationController.addOnEndEvent(() => {
                            this.eggObj.setEnabled(false);
                            this.creatureObj.setEnabled(true);
                            this.creatureObj.animationController.setAnimation("celebrate");
                            this.creatureObj.animationController.play();
                            this.creatureObj.animationController.addOnEndEvent(() => {
                                Game.i.sm.swapScene(3);
                            });
                        });
                    }
                }
                else {
                }
            }
        }
    }
}
