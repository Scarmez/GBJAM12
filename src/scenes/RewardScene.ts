import creature from "../animations/creature.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class RewardScene extends Scene {

    private _petObj: AnimatedSpriteObject;
    private _potionObjs: SpriteObject[] = [];
    private _songNameText: TextObject;
    private _scoreText: TextObject;
    private _transition: SpriteObject;

    constructor(){
        super();

        this.bgPaletteIndex = 3;

        this._songNameText = this.addGameobject(new TextObject("Well Done!", "font_rabbit", 0, 8)) as TextObject;
        this._scoreText = this.addGameobject(new TextObject("Score:", "font_rabbit", 0, 24, 1)) as TextObject;
        this._petObj = this.addGameobject(new AnimatedSpriteObject(0,0,0,0,"c1_final", creature, true)) as AnimatedSpriteObject;
        this._petObj.animationController.setAnimation("celebrate");

        this.addGameobject(new TextObject("You Brewed:", "font_rabbit", 32, 96))

        for(let i = 0; i < 5; i++){
            this._potionObjs.push(this.addGameobject(new SpriteObject(32 + i * 17,112,0,0,"health_potion")) as SpriteObject);
        }

        this._transition = this.addGameobject(new SpriteObject(0,0,0,0, "transition")) as SpriteObject; 

    }

    public create(): void { }
    public enter(): void {

        this._petObj.spriteRenderer.setSprite(SaveData.getCreatureSprite());
        this._petObj.localX = 80-this._petObj.spriteRenderer.getSprite().frameWidth/2;
        this._petObj.localY = 72-this._petObj.spriteRenderer.getSprite().frameHeight/2;

        this._songNameText.textRenderer.setText("The SpooKy Squash");
        this._songNameText.localX = 80 - this._songNameText.textRenderer.width/2;

        this._scoreText.textRenderer.setText("Score: " + "999");
        this._scoreText.localX = 80 - this._scoreText.textRenderer.width/2;

        for(let i = 0; i < this._potionObjs.length; i++){
            this._potionObjs
        }
        
        this._transition.localX = -8;
        this.startCoroutine(this.moveTo(this._transition, {x:160, y:0}, 0.5));

    }
    
    public update(delta: number): void {
        if(Game.i.input.consumeInput(InputAction.START)){
            this._transition.localX = 160;
            this.startCoroutine(this.moveTo(this._transition, {x:-8, y:0}, 0.5));
            this.startCoroutine(this.delayFunction(1, ()=>{ Game.i.sm.swapScene(4)}))
        }
    }

}