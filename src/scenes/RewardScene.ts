import creature from "../animations/creature_anim.js";
import poop_anim from "../animations/poop_anim.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class RewardScene extends Scene {

    private _petObj: AnimatedSpriteObject;
    private _potionObjs: SpriteObject[] = [];
    private _songNameText: TextObject;
    private _scoreText: TextObject;
    private _transition: SpriteObject;
    private _poop: AnimatedSpriteObject;

    constructor(){
        super();

        SaveData.saveObj.petAge++;
        SaveData.saveObj.petHunger -= 15;

        this.bgPaletteIndex = 3;
        this.addGameobject(new WindowObject("pokeframe", 0,0,160,24));
        this.addGameobject(new WindowObject("pokeframe", 30,104,101,40));
        this._songNameText = this.addGameobject(new TextObject("Well Done!", "font_rabbit", 0, 8)) as TextObject;
        this._scoreText = this.addGameobject(new TextObject("Score:", "font_rabbit", 0, 32, 1)) as TextObject;
        this._petObj = this.addGameobject(new AnimatedSpriteObject(0,0,0,0,"c1_final", creature, true)) as AnimatedSpriteObject;
        this._petObj.animationController.setAnimation("celebrate");

        this.addGameobject(new TextObject("You Brewed:", "font_rabbit", 32, 96))

        for(let i = 0; i < 5; i++){
            // this._potionObjs.push(this.addGameobject(new SpriteObject(32 + (i % 5) * 17, Math.floor(i/5) * 16 + 116,0,0,"health_potion")) as SpriteObject);
            this._potionObjs.push(this.addGameobject(new SpriteObject(38 + i * 18, 116,0,0,SaveData.getPotionSprite())) as SpriteObject);
        }

        this._poop = this.addGameobject(new AnimatedSpriteObject(72,116,0,0,"poop", poop_anim, true)) as AnimatedSpriteObject;
        this._poop.setEnabled(false);
        this._transition = this.addGameobject(new SpriteObject(0,0,0,0, "transition")) as SpriteObject; 

        this._petObj.spriteRenderer.setSprite(SaveData.getCreatureSprite());
        this._petObj.localX = 80-this._petObj.spriteRenderer.getSprite().frameWidth/2;
        this._petObj.localY = 72-this._petObj.spriteRenderer.getSprite().frameHeight/2;

        this._songNameText.textRenderer.setText(SaveData.tracks[SaveData.nextSong]);
        this._songNameText.localX = 80 - this._songNameText.textRenderer.width/2;

        let score = Math.round(SaveData.lastScore * 100);

        if(score <= 25){
            this._petObj.animationController.setAnimation("angry");
        } else if(score <= 50) {
            this._petObj.animationController.setAnimation("idle");
        } else if(score <= 75){
            this._petObj.animationController.setAnimation("happy");
        } else {
            this._petObj.animationController.setAnimation("celebrate");
        }

        let numBrewed = Math.round(5 * SaveData.lastScore);
        SaveData.saveObj.potions[SaveData.nextSong] += numBrewed;
        SaveData.saveObj.petHappiness -= Math.floor((1 - SaveData.lastScore) * 100);
        if(SaveData.saveObj.petHappiness <= 0) SaveData.saveObj.petHappiness = 0;
        this._scoreText.textRenderer.setText("Score: " + score + "%");
        this._scoreText.localX = 80 - this._scoreText.textRenderer.width/2;

        if(numBrewed == 0){
            this._poop.setEnabled(true);
        }
        for(let i = 0; i < this._potionObjs.length; i++){
            if(i < numBrewed){
                this._potionObjs[i].setEnabled(true);
            } else {
                this._potionObjs[i].setEnabled(false);
            }
            
        }

        this._transition.localX = -8;
        this.startCoroutine(this.moveTo(this._transition, {x:160, y:0}, 0.5));

    }

    
    public update(delta: number): void {
        if(Game.i.input.consumeInput(InputAction.START)){
            this._transition.localX = 160;
            this.startCoroutine(this.moveTo(this._transition, {x:-8, y:0}, 0.5));
            this.startCoroutine(this.delayFunction(1, ()=>{ 
                if(
                    SaveData.saveObj.petStage < 1 &&
                    SaveData.saveObj.potions[0] >= 5 &&
                    SaveData.saveObj.potions[1] >= 5 &&
                    SaveData.saveObj.potions[2] >= 5
                ){
                    Game.i.sm.swapScene(7);
                } else {
                    Game.i.sm.swapScene(4);
                }
            }))
        }
    }

}