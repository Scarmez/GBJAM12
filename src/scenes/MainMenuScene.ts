import { Game } from "../engine/Game.js";
import { GameSettings } from "../engine/GameSettings.js";
import { MenuObject } from "../engine/MenuObject.js";
import { MenuOptionObject } from "../engine/MenuOptionObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { TextObject } from "../engine/TextObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";

export class MainMenuScene extends Scene {

    private mainMenu: MenuObject;
    //private optionMenu: MenuObject;
    //private controlsMenu: MenuObject;
    private bg_music: HTMLAudioElement;
    private title: SpriteObject;
    private pressstarttext: TextObject;

    private pressstartmode = true;
    private flashTimer = 0.2;

    constructor(){
        super();

        this.bg_music = Game.i.assets.getAudio("intro_theme")!;

        this.addGameobject(this.title = new SpriteObject(0,0,0,0,"title_screen"));
        this.pressstarttext = new TextObject("PRESS START", "font_rabbit", 0,0);
        this.pressstarttext.localX = 80 - this.pressstarttext.textRenderer.width/2;
        this.pressstarttext.localY = 144 - 24;
        this.title.addChild(this.pressstarttext);

        this.mainMenu = this.addGameobject(new MenuObject("", new SpriteObject(0,0,0,0,"cursor"), 32, 112, 96, 40, "click")) as MenuObject;
        if(SaveData.saveExists()) {
            this.mainMenu.addOption(new MenuOptionObject("Continue", "font_rabbit", ()=>{ 
                SaveData.load();
                this.mainMenu!.setEnabled(false);
                this.bg_music?.pause();
                Game.i.assets.getAudio("start_game")?.play();
                this.startCoroutine(this.delayFunction(3, ()=>{Game.i.sm.swapScene(4); }))
            }));
        }
    
        this.mainMenu.addOption(new MenuOptionObject("New Game", "font_rabbit", ()=>{ 
            this.mainMenu!.setEnabled(false);
            this.bg_music?.pause();
            Game.i.assets.getAudio("start_game")?.play();
            this.startCoroutine(this.delayFunction(3, ()=>{Game.i.sm.swapScene(2); }))
        }));

        this.mainMenu.setIndex(0);
        this.mainMenu.setEnabled(false);

        // this.mainMenu.addOption(new MenuOptionObject("Options", "font_rabbit", this.showOptions.bind(this)));

        // let palettePicker = new UIHorizontalPickerObject("Pallete: ", "font_Torment") as UIHorizontalPickerObject;
        // palettePicker.addOption({text: "LAVA-GB", onSelect: function(){Game.i.gfx.setPalette(0)}});
        // palettePicker.addOption({text: "MOONLIGHT GB", onSelect: function(){Game.i.gfx.setPalette(1)}});
        // palettePicker.addOption({text: "kirokaze-gameboy", onSelect: function(){Game.i.gfx.setPalette(2)}});
        // palettePicker.addOption({text: "ice-cream-gb", onSelect: function(){Game.i.gfx.setPalette(3)}});
        // palettePicker.addOption({text: "2bit-demichrome", onSelect: function(){Game.i.gfx.setPalette(4)}});
        // palettePicker.addOption({text: "Arq4", onSelect: function(){Game.i.gfx.setPalette(5)}});

        // let windowPicker = new UIHorizontalPickerObject("Window: ", "font_Torment") as UIHorizontalPickerObject;
        // windowPicker.addOption({text: "1", onSelect:(function(){})});
        // windowPicker.addOption({text: "2", onSelect:(function(){})});
        // windowPicker.addOption({text: "3", onSelect:(function(){})});
 

        // this.optionMenu = this.addGameobject(new MenuObject("frame", "cursor", 0, 96, 160, 48, "click")) as MenuObject;
        // this.optionMenu.setCancelFunction(this.hideOptions.bind(this));
        // this.optionMenu.setEnabled(false);
        // //this.optionMenu.addOption(new MenuOptionObject("Rebind Controls", gameSettings.defaultFont!, this.showControls.bind(this)));
        // this.optionMenu.addOption(palettePicker);
        // this.optionMenu.addOption(windowPicker);
        // this.optionMenu.addOption(new MenuOptionObject("Exit", GameSettings.i.getValue("defaultFont", "font_chit"), this.hideOptions.bind(this)));

        // this.controlsMenu = this.addGameobject(new MenuObject(GameSettings.i.getValue("defaultFrame", "frame0"), 0, 0, 160, 144)) as MenuObject;
        // this.controlsMenu.setEnabled(false);
        // this.controlsMenu.setCancelFunction(this.hideControls.bind(this));
    }

    // public showOptions(){
    //     this.optionMenu?.setEnabled(true);
    //     this.mainMenu?.setEnabled(false)
    // }

    // public hideOptions(){
    //     this.optionMenu?.setEnabled(false);
    //     this.mainMenu?.setEnabled(true);
    // }

    // public showControls(){
    //     this.optionMenu?.setEnabled(false);
    //     this.controlsMenu?.setEnabled(true);
    // }

    // public hideControls(){
    //     this.optionMenu?.setEnabled(true);
    //     this.controlsMenu?.setEnabled(false);
    // }

    public enter(): void {
        this.bg_music!.loop = true;
        this.bg_music!.play();
    }

    public exit(): void {
        this.bg_music!.pause();
    }

    public update(delta: number): void {
        
        if(this.pressstartmode ){
            this.flashTimer -= delta;
            if(this.flashTimer <= 0){
                this.flashTimer = 0.5;
                this.pressstarttext.setEnabled(!this.pressstarttext.isEnabled);
            }
            if(Game.i.input.consumeInput(InputAction.START)){
                this.pressstartmode = false;
                Game.i.assets.getAudio("select")!.currentTime = 0;
                Game.i.assets.getAudio("select")?.play()
                this.pressstarttext.setEnabled(false)
                this.mainMenu!.setEnabled(true);
            }

        }

        if(Game.i.input.consumeInput(InputAction.START)){
            this.mainMenu?.selectOption();
        };
    }

}