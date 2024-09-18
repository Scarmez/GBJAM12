import { Game } from "../engine/Game.js";
import { MenuObject } from "../engine/MenuObject.js";
import { MenuOptionObject } from "../engine/MenuOptionObject.js";
import { Scene } from "../engine/Scene.js";
import { SpriteObject } from "../engine/SpriteObject.js";
import { InputAction } from "../game/InputActions.js";
import { SaveData } from "../game/SaveData.js";
export class MainMenuScene extends Scene {
    mainMenu;
    optionMenu;
    controlsMenu;
    bg_music;
    create() {
        this.bg_music = Game.i.assets.getAudio("intro_theme");
        this.addGameobject(new SpriteObject(0, -24, 0, 0, "splash"));
        this.mainMenu = this.addGameobject(new MenuObject("frame", "cursor", 32, 96, 96, 40, "click"));
        if (SaveData.saveExists()) {
            this.mainMenu.addOption(new MenuOptionObject("Continue", "font_rabbit", function () { }));
        }
        this.mainMenu.addOption(new MenuOptionObject("New Game", "font_rabbit", () => {
            this.mainMenu.setEnabled(false);
            this.bg_music?.pause();
            Game.i.assets.getAudio("start_game")?.play();
            this.startCoroutine(this.delayFunction(3, () => { Game.i.sm.swapScene(2); }));
        }));
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
    showOptions() {
        this.optionMenu?.setEnabled(true);
        this.mainMenu?.setEnabled(false);
    }
    hideOptions() {
        this.optionMenu?.setEnabled(false);
        this.mainMenu?.setEnabled(true);
    }
    showControls() {
        this.optionMenu?.setEnabled(false);
        this.controlsMenu?.setEnabled(true);
    }
    hideControls() {
        this.optionMenu?.setEnabled(true);
        this.controlsMenu?.setEnabled(false);
    }
    enter() {
        this.bg_music.loop = true;
        this.bg_music.play();
    }
    exit() {
        this.bg_music.pause();
    }
    update(delta) {
        if (Game.i.input.consumeInput(InputAction.START)) {
            this.mainMenu?.selectOption();
        }
        ;
    }
}
