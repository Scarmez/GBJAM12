import { Game } from "../engine/Game.js";
import { GameSettings } from "../engine/GameSettings.js";
import { MenuObject } from "../engine/MenuObject.js";
import { MenuOptionObject } from "../engine/MenuOptionObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import {UIHorizontalPickerObject} from "../engine/UIHorizontalPickerObject.js";

export class MainMenuScene extends Scene {

    private mainMenu: MenuObject|undefined;
    private optionMenu: MenuObject|undefined;
    private controlsMenu: MenuObject|undefined;

    public create(): void {
        
        let defaultFontName = GameSettings.i.getValue("defaultFont", "font_Chit");
        let defaultFrameName = GameSettings.i.getValue("defaultFrame", "frame0");

        this.addGameobject(new SpriteObject(0,-24,0,0,"splash"));

        this.mainMenu = this.addGameobject(new MenuObject(defaultFrameName, "cursor", 32, 96, 96, 40)) as MenuObject;
        //this.mainMenu.addOption(new MenuOptionObject("Continue", defaultFontName, function(){  }));
        this.mainMenu.addOption(new MenuOptionObject("New Game", defaultFontName, function(){ Game.i.sm.swapScene(2); }));
        this.mainMenu.addOption(new MenuOptionObject("Options", defaultFontName, this.showOptions.bind(this)));

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
 

        this.optionMenu = this.addGameobject(new MenuObject(defaultFrameName, "cursor", 0, 96, 160, 48)) as MenuObject;
        this.optionMenu.setCancelFunction(this.hideOptions.bind(this));
        this.optionMenu.setEnabled(false);
        // //this.optionMenu.addOption(new MenuOptionObject("Rebind Controls", gameSettings.defaultFont!, this.showControls.bind(this)));
        // this.optionMenu.addOption(palettePicker);
        // this.optionMenu.addOption(windowPicker);
        // this.optionMenu.addOption(new MenuOptionObject("Exit", GameSettings.i.getValue("defaultFont", "font_chit"), this.hideOptions.bind(this)));

        // this.controlsMenu = this.addGameobject(new MenuObject(GameSettings.i.getValue("defaultFrame", "frame0"), 0, 0, 160, 144)) as MenuObject;
        // this.controlsMenu.setEnabled(false);
        // this.controlsMenu.setCancelFunction(this.hideControls.bind(this));



    }

    public updateDefaults(){

    }

    public showOptions(){
        this.optionMenu?.setEnabled(true);
        this.mainMenu?.setEnabled(false)
    }

    public hideOptions(){
        this.optionMenu?.setEnabled(false);
        this.mainMenu?.setEnabled(true);
    }

    public showControls(){
        this.optionMenu?.setEnabled(false);
        this.controlsMenu?.setEnabled(true);
    }

    public hideControls(){
        this.optionMenu?.setEnabled(true);
        this.controlsMenu?.setEnabled(false);
    }

}