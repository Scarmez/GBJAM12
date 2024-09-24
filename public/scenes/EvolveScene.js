import creature_anim from "../animations/creature_anim.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { Scene } from "../engine/Scene.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { SaveData } from "../game/SaveData.js";
export class EvolveScene extends Scene {
    _text;
    _prevCreature;
    _nextCreature;
    constructor() {
        super();
        this._prevCreature = this.addGameobject(new AnimatedSpriteObject(0, 0, 0, 0, SaveData.getCreatureSprite(), creature_anim, true));
        if (SaveData.saveObj.petStage < 1) {
            SaveData.saveObj.petStage++;
        }
        this._nextCreature = this.addGameobject(new AnimatedSpriteObject(0, 0, 0, 0, SaveData.getCreatureSprite(), creature_anim, false));
        this._prevCreature.animationController.setAnimation("celebrate", true);
        this._prevCreature.localX = 80 - this._prevCreature.spriteRenderer.getSprite().frameWidth / 2;
        this._prevCreature.localY = 72 - this._prevCreature.spriteRenderer.getSprite().frameHeight / 2;
        this._nextCreature.animationController.setAnimation("evolve0", true);
        this._nextCreature.setEnabled(false);
        this._nextCreature.localX = 80 - this._nextCreature.spriteRenderer.getSprite().frameWidth / 2;
        this._nextCreature.localY = 72 - this._nextCreature.spriteRenderer.getSprite().frameHeight / 2;
        this._nextCreature.animationController.frameSpeed = 0.2;
        this._text = this.addGameobject(new TextObject(``, "font_rabbit", 8, 8));
        this.addGameobject(new WindowObject("pokeframe", 0, 112, 160, 32)).addChild(this._text);
    }
    enter() {
        this.startCoroutine(this.animation());
    }
    *animation() {
        yield* this.sequence(this.typeText("WHAT!?", this._text.textRenderer, 0.01), this.delayFunction(1, () => { }), this.typeText(`${SaveData.saveObj.petName} is\nEVOLVING!`, this._text.textRenderer, 0.01), this.delayFunction(0, () => {
            this._prevCreature.setEnabled(false);
            this._nextCreature.setEnabled(true);
            this._nextCreature.animationController.play(6);
            Game.i.assets.getAudio("evolving")?.play();
        }), this.waitForAninmationEnd(this._nextCreature.animationController), this.delayFunction(0, () => { this._nextCreature.animationController.setAnimation("evolve1", true); this._nextCreature.animationController.play(6); }), this.waitForAninmationEnd(this._nextCreature.animationController), this.delayFunction(0, () => {
            this._nextCreature.animationController.setAnimation("celebrate", true);
            this._nextCreature.animationController.frameSpeed = 0.5;
            this._nextCreature.animationController.play(4);
            Game.i.assets.getAudio("evolve")?.play();
        }), this.waitForAninmationEnd(this._nextCreature.animationController), this.delayFunction(0, () => { Game.i.sm.swapScene(4); }));
    }
    *typeText(text, textRenderer, charDelay, callback) {
        let totalTime = 0;
        let currentChars = 0;
        while (true) {
            let elapsed = yield;
            totalTime += elapsed;
            if (totalTime >= charDelay) {
                totalTime = 0;
                currentChars++;
                textRenderer.setText(text.substring(0, currentChars));
                if (currentChars >= text.length) {
                    if (callback)
                        callback();
                    return;
                }
            }
        }
    }
    *waitForInput(inputs, callback) {
        while (true) {
            for (let i = 0; i < inputs.length; i++) {
                if (Game.i.input.consumeInput(inputs[i])) {
                    if (callback)
                        callback();
                    return;
                }
            }
            yield;
        }
    }
    *waitForAninmationEnd(animationController) {
        while (true) {
            if (animationController.ended)
                return;
            yield;
        }
    }
    sequence(...animations) {
        return function* generatorSequence() {
            for (let generator of animations) {
                yield* generator;
            }
        }();
    }
}
