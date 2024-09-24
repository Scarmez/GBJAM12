import ball_toy_anim from "../animations/ball_toy_anim.js";
import creature_anim from "../animations/creature_anim.js";
import emotes_anim from "../animations/emotes_anim.js";
import food_anim from "../animations/food_anim.js";
import smol_cauldron_anim from "../animations/smol_cauldron_anim.js";
import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Game } from "../engine/Game.js";
import { MenuObject } from "../engine/MenuObject.js";
import { MenuOptionObject } from "../engine/MenuOptionObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { SpriteRendererComponent } from "../engine/SpriteRendererComponent.js";
import { TextObject } from "../engine/TextObject.js";

import WindowObject from "../engine/WindowObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class HomeScene extends Scene {

    private _creatureObj: AnimatedSpriteObject;
    private _music: HTMLAudioElement;

    // Shop
    //private _shop: MenuObject;
    private _nameDisplay: TextObject;
    private _baseMenu: MenuObject;
    private _brewMenu: MenuObject;
    private _statsMenu: WindowObject;

    private _petEmotion: AnimatedSpriteObject;
    private _foodObj: AnimatedSpriteObject;
    private _ballObj: AnimatedSpriteObject;

    private _showingStats: boolean = false;
    private _statsMoving: boolean = false;
    private _hungerStat: TextObject;
    private _happinessStat: TextObject;

    private _cursor: SpriteObject;
    private _cauldron: AnimatedSpriteObject;

    constructor(){
        super();

        SaveData.save();

        this._music = Game.i.assets.getAudio("home_music")!;

        this.addGameobject(new SpriteObject(0,0,0,0,"bg_dots"));
        this._nameDisplay = new TextObject(SaveData.saveObj.petName,"font_rabbit",8,8);
        let nameframe = this.addGameobject(new WindowObject("pokeframe", 0,0, this._nameDisplay.textRenderer.width + 16, 24));
        nameframe.addChild(this._nameDisplay);

        let bg = this.addGameobject(new SpriteObject(0,112,0,0,"home_banner"));
        this._cauldron = new AnimatedSpriteObject(56,-4,0,0,"smol_cauldron", smol_cauldron_anim, true) as AnimatedSpriteObject;

        this._creatureObj = this.addGameobject(new AnimatedSpriteObject(0, 0, 0, 0, SaveData.getCreatureSprite(), creature_anim, true)) as AnimatedSpriteObject;
        this._creatureObj.localX =  80 - this._creatureObj.spriteRenderer.getSprite().frameWidth/2;
        this._creatureObj.localY = 72 - this._creatureObj.spriteRenderer.getSprite().frameHeight/2;

        // make home screen menu
        this._cursor = new SpriteObject(0,0,0,0,"home_cursor");
        this.addGameobject(this._baseMenu = new MenuObject("", this._cursor,0,96,160,48,"click"));
        this._baseMenu.cursorOffset = {x:-8,y:16}
        this._baseMenu.addChild(this._cauldron);

        let feedButton = new MenuOptionObject("", "font_rabbit", this.feed, undefined, "select", "home_icons");
        this._baseMenu.addOption(feedButton);
        feedButton.onHover = ()=>{(feedButton.getComponent("SpriteRenderer") as SpriteRendererComponent).setFrame(1,0);}
        feedButton.offHover = ()=>{(feedButton.getComponent("SpriteRenderer") as SpriteRendererComponent).setFrame(0,0);}
        feedButton.localY = 16;
        feedButton.localX = 16;

        let brewButtonFunc = ()=>{
            Game.i.assets.getAudio("select")?.play()
            this._baseMenu.setEnabled(false);
            this._brewMenu.setEnabled(true);
            this._brewMenu.setIndex(0);
        }

        
        let brewButton = new MenuOptionObject("", "font_rabbit", brewButtonFunc, undefined, "select");
        this._baseMenu.addOption(brewButton);
        brewButton.onHover = ()=>{this._cauldron.animationController.paused = false; }
        brewButton.offHover = ()=>{
            this._cauldron.animationController.paused = true;
            this._cauldron.animationController.setAnimation("default", true);
        }
        brewButton.localX = 64
        brewButton.localY = 4;

        let playButton = new MenuOptionObject("", "font_rabbit", this.play,undefined, "select", "home_icons");
        this._baseMenu.addOption(playButton);
        playButton.onHover = ()=>{(playButton.getComponent("SpriteRenderer") as SpriteRendererComponent).setFrame(1,1);}
        playButton.offHover = ()=>{(playButton.getComponent("SpriteRenderer") as SpriteRendererComponent).setFrame(0,1);}
        playButton.localY = 16;
        playButton.localX = 112;
        (playButton.getComponent("SpriteRenderer") as SpriteRendererComponent).setFrame(0,1);

        this._baseMenu.onLeftInput=()=>{ this._baseMenu.changeIndex(-1)};
        this._baseMenu.onRightInput=()=>{ this._baseMenu.changeIndex(1)};
        this._baseMenu.setIndex(1);
        


        // Make Brew song menu
        this.addGameobject(this._brewMenu = new MenuObject("pokeframe", new SpriteObject(0,0,0,0,"cursor"), 0, 144 - 40, 160, 40, "click"));
        for(let i = 0; i < SaveData.tracks.length; i++){
            this._brewMenu.addOption(new MenuOptionObject(SaveData.tracks[i], "font_rabbit", ()=>{
                let opt = i;
                SaveData.nextSong = opt;
                Game.i.sm.swapScene(5);
            }));
        }
        this._brewMenu.setEnabled(false);
        this._brewMenu.setCancelFunction(()=>{
            this._brewMenu.setEnabled(false);
            Game.i.assets.getAudio("cancel")!.play()
            this._baseMenu.setEnabled(true);
        });

        // Make Stats menu
        this.addGameobject(this._statsMenu = new WindowObject("pokeframe", -160,64,160,80));
        this._statsMenu.addChild(new TextObject("Age: " + SaveData.saveObj.petAge.toString(), "font_rabbit", 8,8));
        this._statsMenu.addChild(this._hungerStat = new TextObject("Hunger: " + SaveData.saveObj.petHunger.toString(), "font_rabbit", 8,16));
        this._statsMenu.addChild(this._happinessStat = new TextObject("Happiness: " + SaveData.saveObj.petHappiness.toString(), "font_rabbit", 8,24));

        for(let i = 0; i < SaveData.potions.length; i++){
            this._statsMenu.addChild(new SpriteObject(8 + (48 * i), 40,0,0, SaveData.potions[i]))
            this._statsMenu.addChild(new TextObject(SaveData.saveObj.potions[i].toString(), "font_rabbit", 26 + (48 * i), 44));
        }

        this._petEmotion = this.addGameobject(new AnimatedSpriteObject(72, 40, 0, 0, "emotes", emotes_anim, true)) as AnimatedSpriteObject;
        this._petEmotion.localY = this._creatureObj.localY - 16;

        this._foodObj = this.addGameobject(new AnimatedSpriteObject(64,80,0,0,"food", food_anim)) as AnimatedSpriteObject;
        this._foodObj.localX = this._creatureObj.localX - 16;
        this._foodObj.localY = this._creatureObj.localY + 16;
        this._foodObj.animationController.frameSpeed = 1;
        this._foodObj.setEnabled(false);
        this._foodObj.animationController.addOnEndEvent(()=>{
            SaveData.saveObj.petHunger += 10;
            if(SaveData.saveObj.petHunger > 100){
                SaveData.saveObj.petHappiness -= (SaveData.saveObj.petHunger - 100) * 5;
                SaveData.saveObj.petHunger = 100;
            }
            SaveData.save();
            this.updateStats();
            this._foodObj.setEnabled(false);
            this._petEmotion.setEnabled(true);
            this.updateEmotes();
            this._baseMenu.setEnabled(true);
        })

        this._ballObj = this.addGameobject(new AnimatedSpriteObject(64,80,0,0,"ball_toy", ball_toy_anim)) as AnimatedSpriteObject;
        this._ballObj.localX = this._creatureObj.localX - 16;
        this._ballObj.localY = this._creatureObj.localY + 16;
        this._ballObj.animationController.frameSpeed = 0.2
        this._ballObj.animationController.frameSpeed = 0.1;
        this._ballObj.setEnabled(false);
        this._ballObj.animationController.addOnEndEvent(()=>{
            SaveData.saveObj.petHappiness += 10;
            if(SaveData.saveObj.petHappiness > 100) SaveData.saveObj.petHappiness = 100;
            SaveData.save();

            this.updateStats();
            this._ballObj.setEnabled(false);
            this._petEmotion.setEnabled(true);
            this.updateEmotes();
            this._baseMenu.setEnabled(true);
            
        });


        this.updateEmotes();
        //this.updateMenuText("help");


        // // Make shop
        // this._shop_bg = this.addGameobject(new SpriteObject(16,8,0,0,"shop_bg")) as SpriteObject;
        // this._shop_bg.addChild(new WindowObject("pokeframe", -16, 144-40, 160, 32))
        // // Make Buy Section        
        // this._buyObj = new GameObject(48,16,0,0);
        // this._buyObj.addChild(new TextObject("BUY", "font_rabbit", 22,-8));
        // for(let i = 0; i < 9; i++){
        //     let x = i % 3 * 24;
        //     let y = Math.floor(i / 3) * 24;
        //     this._buyObj.addChild(new SpriteObject(x,y,0,0, "item_frame"))
        // }
        // this._shop_bg.addChild(this._buyObj);

        // // Make Sell Section
        // this._sellObj = new GameObject(8,16,0,0);
        // this._sellObj.addChild(new TextObject("SELL", "font_rabbit", 0,-8));
        // this._sellObj.addChild(new SpriteObject(4,0,0,0, "health_potion"));
        // this._sellObj.addChild(new TextObject("0", "font_rabbit", 24, 4));
        // this._sellObj.addChild(new SpriteObject(4,24,0,0, "energy_potion"));
        // this._sellObj.addChild(new TextObject("0", "font_rabbit", 24, 28));
        // this._sellObj.addChild(new SpriteObject(4,48,0,0, "mystery_potion"));
        // this._sellObj.addChild(new TextObject("0", "font_rabbit", 24, 52));

        // for(let i = 0; i < 3; i++){
        //     let x = 0;
        //     let y = i % 3 * 24;
            
        // }
        // this._shop_bg.addChild(this._sellObj);
        // this._shop_bg.setEnabled(false);

    }



    private updateEmotes = ()=>{
        if(SaveData.saveObj.petHunger <  25){
            this._petEmotion.animationController.setAnimation("hungry", true);
            this._creatureObj.animationController.setAnimation("idle");
            this._petEmotion.setEnabled(true);
        } else if(SaveData.saveObj.petHappiness < 25){
            this._petEmotion.animationController.setAnimation("frustrated", true);
            this._creatureObj.animationController.setAnimation("angry");
            this._petEmotion.setEnabled(true);
        } else {
            this._petEmotion.setEnabled(false);
            this._creatureObj.animationController.setAnimation("happy");
        }
        
    }

    private play = ()=>{
        this._baseMenu.setEnabled(false);

        this._ballObj.localX = this._creatureObj.localX - 16;
        this._ballObj.localY = this._creatureObj.localY +16;
        this._petEmotion.setEnabled(false);
        this._ballObj.setEnabled(true);
        this._ballObj.animationController.play(4);


    }

    private feed = ()=>{

        this._baseMenu.setEnabled(false);
        let nims = Object.keys(food_anim);
        this._foodObj.animationController.setAnimation( nims[Math.floor(Math.random() * nims.length)], true);
        this._foodObj.animationController.paused = true;
        this._foodObj.localX = this._creatureObj.localX - 16;
        this._foodObj.localY = this._creatureObj.localY - 32;
        this._petEmotion.setEnabled(false);
        this._foodObj.setEnabled(true);

        this.startCoroutine(this.moveTo(this._foodObj, {y: this._creatureObj.localY + 16}, 1, ()=>{
            this._creatureObj.animationController.setAnimation("eating",true);
            this._foodObj.animationController.play();
        }));
        

    }

    private updateStats(){
        this._happinessStat.textRenderer.setText("Happiness: " + SaveData.saveObj.petHappiness.toString());
        this._hungerStat.textRenderer.setText("Hunger: " + SaveData.saveObj.petHunger.toString());
    }

    public enter(): void {
        this._music.currentTime = 0;
        this._music.loop = true;
        this._music.play();
    }

    public exit(): void {
        this._music.pause();
    }

    protected update(delta: number): void {

        if(this._baseMenu.isEnabled){
            if(Game.i.input.consumeInput(InputAction.START)){
                this._baseMenu.selectOption();
            }        
        }

        if(this._brewMenu.isEnabled){
            if(Game.i.input.consumeInput(InputAction.START)){
                this._brewMenu.selectOption();
            }        
        }

        if(Game.i.input.consumeInput(InputAction.SELECT)){
            if(!this._showingStats && !this._statsMoving){
                Game.i.assets.getAudio("select")?.play();
                this._baseMenu.setEnabled(false);
                this._statsMenu.setEnabled(true);
                this._statsMoving = true;
                this._showingStats = true;
                this.startCoroutine(this.moveTo(this._statsMenu, {x:1}, 1, ()=>{
                    this._statsMoving = false;
                }));
            } else if(this._showingStats && !this._statsMoving){
                this._statsMoving = true;
                this._showingStats = false;
                this.startCoroutine(this.moveTo(this._statsMenu, {x:-160}, 1, ()=>{
                    this._statsMoving = false;
                    this._baseMenu.setEnabled(true);
                    this._statsMenu.setEnabled(false);
                }));
            }

        }

    }

}