import { Game } from "../engine/Game.js";
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
        
        this.addGameobject(new SpriteObject(0,0,0,0,Game.i.assets.getSprite("splash")));

        this.mainMenu = this.addGameobject(new MenuObject(Game.i.defaultBorder!, 32, 96, 96, 40)) as MenuObject;
        this.mainMenu.addOption(new MenuOptionObject("New Game", Game.i.defaultBorder!, function(){  }));
        this.mainMenu.addOption(new MenuOptionObject("Options", Game.i.defaultBorder!, this.showOptions.bind(this)));

        let palettePicker = new UIHorizontalPickerObject("Pallete: ", Game.i.assets.getSprite("font")) as UIHorizontalPickerObject;
        palettePicker.addOption({text: "LAVA-GB", onSelect: function(){Game.i.gfx.setPalette(0)}});
        palettePicker.addOption({text: "MOONLIGHT GB", onSelect: function(){Game.i.gfx.setPalette(1)}});
        palettePicker.addOption({text: "kirokaze-gameboy", onSelect: function(){Game.i.gfx.setPalette(2)}});
        palettePicker.addOption({text: "ice-cream-gb", onSelect: function(){Game.i.gfx.setPalette(3)}});
        palettePicker.addOption({text: "2bit-demichrome", onSelect: function(){Game.i.gfx.setPalette(4)}});
        palettePicker.addOption({text: "Arq4", onSelect: function(){Game.i.gfx.setPalette(5)}});

        let windowPicker = new UIHorizontalPickerObject("Window: ", Game.i.assets.getSprite("font")) as UIHorizontalPickerObject;
        windowPicker.addOption({text: "1", onSelect:(function(){Game.i.defaultBorder = Game.i.assets.getSprite("frame0")})});
        windowPicker.addOption({text: "2", onSelect:(function(){Game.i.defaultBorder = Game.i.assets.getSprite("frame1")})});
        windowPicker.addOption({text: "3", onSelect:(function(){Game.i.defaultBorder = Game.i.assets.getSprite("frame2")})});
 

        this.optionMenu = this.addGameobject(new MenuObject(Game.i.defaultBorder!, 0, 96, 160, 48)) as MenuObject;
        this.optionMenu.setCancelFunction(this.hideOptions.bind(this));
        this.optionMenu.setEnabled(false);
        //this.optionMenu.addOption(new MenuOptionObject("Rebind Controls", gameSettings.defaultFont!, this.showControls.bind(this)));
        this.optionMenu.addOption(palettePicker);
        this.optionMenu.addOption(windowPicker);
        this.optionMenu.addOption(new MenuOptionObject("Exit", Game.i.assets.getSprite("frame0"), this.hideOptions.bind(this)));

        this.controlsMenu = this.addGameobject(new MenuObject(Game.i.assets.getSprite("frame0"), 0, 0, 160, 144)) as MenuObject;
        this.controlsMenu.setEnabled(false);
        this.controlsMenu.setCancelFunction(this.hideControls.bind(this));

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