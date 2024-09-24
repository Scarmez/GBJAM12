import creature from "../animations/creature_anim.js";
import egg_anim from "../animations/egg_anim.js";
import egg from "../animations/egg_anim.js";
import emotes_anim from "../animations/emotes_anim.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { GameObject } from "../engine/GameObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class ChooseEggScene extends Scene {

    private _phase = Phase.CHOOSE;
    private hatchMash = 10;
    private eggChoices: AnimatedSpriteObject[] = [];
    private currentChoice: number = 0;
    private choiceCursor: SpriteObject;
    private eggObj: AnimatedSpriteObject;
    private creatureObj: AnimatedSpriteObject;
    private textDisplay: TextObject;
    private frameObj: GameObject;
    private acceptInput = true;

    private emote: AnimatedSpriteObject;

    private wobbleSound: HTMLAudioElement;
    private hatchSound: HTMLAudioElement;

    constructor(){
        super();

        this.wobbleSound = Game.i.assets.getAudio("egg_wobble")!;
        this.hatchSound = Game.i.assets.getAudio("egg_hatch")!;
        
        this.eggChoices.push(this.addGameobject(new AnimatedSpriteObject(0,0,0,0, "c1_egg",egg_anim, true)) as AnimatedSpriteObject);
        this.eggChoices.push(this.addGameobject(new AnimatedSpriteObject(0,0,0,0, "c2_egg",egg_anim, true)) as AnimatedSpriteObject);
        this.choiceCursor = this.addGameobject(new SpriteObject(0,0,0,0,"rhythm_inputs")) as SpriteObject;
        for(let i = 0; i < this.eggChoices.length; i++){
            if(i > 0) this.eggChoices[i].animationController.paused = true;
            this.eggChoices[i].localY = 72 - this.eggChoices[i].spriteRenderer.getSprite().frameHeight / 2;
            this.eggChoices[i].localX = (160 / (this.eggChoices.length + 1) * (i + 1)) - this.eggChoices[i].spriteRenderer.getSprite().frameWidth / 2;
        }

        this.eggObj = this.addGameobject(new AnimatedSpriteObject(55, 64, 0, 0, "c1_egg", egg)) as AnimatedSpriteObject;
        this.eggObj.localX =  80 - this.eggObj.spriteRenderer.getSprite().frameWidth/2;
        this.eggObj.localY = 120 - this.eggObj.spriteRenderer.getSprite().frameHeight - 16;

        this.creatureObj = this.addGameobject(new AnimatedSpriteObject(0,0,0,0, "c1_infant", creature)) as AnimatedSpriteObject;
        this.creatureObj.localX =  80 - this.creatureObj.spriteRenderer.getSprite().frameWidth/2;
        this.creatureObj.localY = 120 - this.creatureObj.spriteRenderer.getSprite().frameHeight - 16;
        this.creatureObj.setEnabled(false);

        this.eggObj.animationController.paused = true;
        this.eggObj.animationController.loop = false;
        this.eggObj.animationController.frameSpeed = 0.18;
        this.eggObj.animationController.addOnEndEvent(()=>{ this.acceptInput = true; })

        this.frameObj = this.addGameobject(new WindowObject("frame", 0, 120,160,24))
        this.textDisplay = new TextObject(`Mash "A" to Hatch!`, "font_rabbit",8, 8);
        this.frameObj.addChild(this.textDisplay);

        this.currentChoice = 0;
        this.hatchMash = 10;
        this.wobbleSound = Game.i.assets.getAudio("egg_wobble")!;
        this._phase = Phase.CHOOSE;
        this.acceptInput = true;

        this.eggObj.setEnabled(false);
        this.creatureObj.setEnabled(false);
        for(let i = 0; i < this.eggChoices.length; i++){
            this.eggChoices[i].setEnabled(true);
        }
        this.textDisplay.textRenderer.setText("Choose an Egg");
        this.choiceCursor.localX = this.eggChoices[this.currentChoice].localX + this.eggChoices[this.currentChoice].width/2 - this.choiceCursor.width/2;
        this.choiceCursor.localY = this.eggChoices[this.currentChoice].localY + this.eggChoices[this.currentChoice].height;

        this.changeChoice(0);

        this.emote = this.addGameobject(new AnimatedSpriteObject(0,0,0,0, "emotes",emotes_anim, true)) as AnimatedSpriteObject;
        this.emote.localX = 80 - this.emote.spriteRenderer.getSprite().frameWidth/2;
        this.emote.localY = this.creatureObj.localY - 16;
        this.emote.setEnabled(false);
        this.emote.animationController.setAnimation("love");

    }


    private changeChoice(input: number){

        let newIndex = this.currentChoice + input;
        if(newIndex < 0) newIndex = 0;
        if(newIndex >= this.eggChoices.length) newIndex = this.eggChoices.length - 1;
        
        if(newIndex == this.currentChoice) return;
        this.eggChoices[this.currentChoice].animationController.paused = true;
        this.eggChoices[this.currentChoice].spriteRenderer.setFrame(0,0);
        this.currentChoice = newIndex;
        this.eggChoices[this.currentChoice].animationController.paused = false;
        Game.i.assets.getAudio("click")!.currentTime = 0;
        Game.i.assets.getAudio("click")!.play();
        this.choiceCursor.localX = this.eggChoices[this.currentChoice].localX + this.eggChoices[this.currentChoice].width/2 - this.choiceCursor.width/2;
        this.choiceCursor.localY = this.eggChoices[this.currentChoice].localY + this.eggChoices[this.currentChoice].height;

        

    }

    protected update(delta: number): void {
        
        if(!this.acceptInput) return;

        if(this._phase == Phase.CHOOSE){

            if(Game.i.input.consumeInput(InputAction.LEFT)){
                this.changeChoice(-1);
            }

            if(Game.i.input.consumeInput(InputAction.RIGHT)){
                this.changeChoice(1);
            }

            if(Game.i.input.consumeInput(InputAction.START) || Game.i.input.consumeInput(InputAction.A)){
                SaveData.saveObj.petSpecies = this.currentChoice;
                SaveData.saveObj.petStage = 0;
                for(let i = 0; i < this.eggChoices.length; i++){
                    this.eggChoices[i].setEnabled(false);
                }

                Game.i.assets.getAudio("select")!.currentTime = 0;
                Game.i.assets.getAudio("select")!.play()
                
                this.choiceCursor.setEnabled(false);
                this.textDisplay.textRenderer.setText(`Mash "A" to hatch!`)
                this._phase = Phase.HATCH;
                this.eggObj.setEnabled(true);
                this.eggObj.spriteRenderer.setSprite(SaveData.getEggSprite());
                this.creatureObj.spriteRenderer.setSprite(SaveData.getCreatureSprite());
            }


        }




        if(this._phase == Phase.HATCH){
            if(this.hatchMash > 0){
                if(Game.i.input.consumeInput(InputAction.A)){

                    if(this.hatchMash > 0){
                        this.hatchMash--;
                        this.wobbleSound!.currentTime = 0;
                        this.wobbleSound!.play();
                        this.eggObj!.animationController.play();
                        this.acceptInput = false;
                        if(this.hatchMash == 5) {
                            this.wobbleSound = Game.i.assets.getAudio("egg_wobble_big")!;
                            this.eggObj!.animationController.setAnimation("stage1")
                        }

                        if(this.hatchMash == 0) {
                            this.frameObj?.setEnabled(false);
                            this.eggObj!.animationController.setAnimation("stage2");
                            this.eggObj!.animationController.play();
                            this.hatchSound?.play();
                            this.eggObj!.animationController.clearOnEndEvents();
                            this.eggObj!.animationController.addOnEndEvent(()=>{

                                this.eggObj!.setEnabled(false);
                                this.creatureObj!.setEnabled(true);
                                this.emote.setEnabled(true);
                                this.creatureObj!.animationController.setAnimation("celebrate");
                                this.creatureObj!.animationController.play(2);
                                this.creatureObj!.animationController.addOnEndEvent(()=>{
                                    Game.i.sm.swapScene(3);
                                });

                            });
                        }
                    } else {

                    }
            

                }
            }
        }

    }

}

enum Phase {
    CHOOSE,
    HATCH
}