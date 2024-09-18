import creature from "../animations/creature.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { GameObject } from "../engine/GameObject.js";
import { MenuObject } from "../engine/MenuObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import WindowObject from "../engine/WindowObject.js";
import { SaveData } from "../game/SaveData.js";

export class HomeScene extends Scene {

    private _creatureObj: AnimatedSpriteObject|undefined;
    private _music: HTMLAudioElement;

    // Shop
    //private _shop: MenuObject;
    private _shop_bg: SpriteObject;
    private _buyObj: GameObject;
    private _sellObj: GameObject;

    constructor(){
        super();

        this.addGameobject(new SpriteObject(0,0,0,0,"bg_dots"));

        this._creatureObj = this.addGameobject(new AnimatedSpriteObject(0, 0, 0, 0, SaveData.getCreatureSprite(), creature, true)) as AnimatedSpriteObject;
        this._creatureObj.localX =  80 - this._creatureObj.spriteRenderer.getSprite().frameWidth/2;
        this._creatureObj.localY = 72 - this._creatureObj.spriteRenderer.getSprite().frameHeight/2;

        this._music = Game.i.assets.getAudio("home_music")!;

        this._shop_bg = this.addGameobject(new SpriteObject(16,8,0,0,"shop_bg")) as SpriteObject;
        this._shop_bg.addChild(new WindowObject("pokeframe", -16, 144-40, 160, 32))
        //this._shop_bg.setEnabled(false);

        // Make Buy Section        
        this._buyObj = new GameObject(48,16,0,0);
        this._buyObj.addChild(new TextObject("BUY", "font_rabbit", 22,-8));
        for(let i = 0; i < 9; i++){
            let x = i % 3 * 24;
            let y = Math.floor(i / 3) * 24;
            this._buyObj.addChild(new SpriteObject(x,y,0,0, "item_frame"))
        }
        this._shop_bg.addChild(this._buyObj);

        // Make Sell Section
        this._sellObj = new GameObject(8,16,0,0);
        this._sellObj.addChild(new TextObject("SELL", "font_rabbit", 0,-8));
        this._sellObj.addChild(new SpriteObject(4,0,0,0, "health_potion"));
        this._sellObj.addChild(new TextObject("0", "font_rabbit", 24, 4));
        this._sellObj.addChild(new SpriteObject(4,24,0,0, "energy_potion"));
        this._sellObj.addChild(new TextObject("0", "font_rabbit", 24, 28));
        this._sellObj.addChild(new SpriteObject(4,48,0,0, "mystery_potion"));
        this._sellObj.addChild(new TextObject("0", "font_rabbit", 24, 52));

        for(let i = 0; i < 3; i++){
            let x = 0;
            let y = i % 3 * 24;
            
        }
        this._shop_bg.addChild(this._sellObj);

    }

    public create(): void {

    }

    public enter(): void {
        this._music.currentTime = 0;
        this._music.play();
    }

    public exit(): void {
        this._music.pause();
    }

    protected update(delta: number): void {
         
    }

}