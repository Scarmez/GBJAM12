import AssetManifest from "./AssetManifest.js";
import { Game } from "./engine/Game.js";
import { GameSettings } from "./engine/GameSettings.js";
import { InputAction } from "./game/InputActions.js";
import { ChooseEggScene } from "./scenes/ChooseEggScene.js";
import { EvolveScene } from "./scenes/EvolveScene.js";
import { HomeScene } from "./scenes/HomeScene.js";
import { MainMenuScene } from "./scenes/MainMenuScene.js";
import { NamePetScene } from "./scenes/NamePetScene.js";
import { RewardScene } from "./scenes/RewardScene.js";
import { RythymScene } from "./scenes/RhythmScene.js";
import { SplashScene } from "./scenes/SplashScene.js";

let game: Game;
let gameSettings: GameSettings;

// let startButton = document.createElement('button');
// startButton.style.width = "200px";
// startButton.style.height = "20px";
// startButton.textContent = "START";
//startButton.onclick = ()=>{
window.onload = ()=>{

    // startButton.remove();
    gameSettings = new GameSettings();
    
    gameSettings.loadAll();

    game = new Game({xRes: 160, yRes: 144, scale: 4});
    game.gfx.createPalette([0,0,0,0,41,1,67,255,162,47,201,255,255,139,64,255,255,244,184,255]);
    // game.gfx.createPalette([0,0,0,0,68,68,41,255,115,130,92,255,176,184,127,255,226,223,177,255]);      // Whitney
    // game.gfx.createPalette([0,0,0,0,5,31,57,255,74,36,128,255,197,58,157,255,255,142,128,255]);         // LAVA-GB
    // game.gfx.createPalette([0,0,0,0,15,5,45,255,32,54,113,255,54,134,143,255,95,199,93,255]);           // MOONLIGHT GB
    // game.gfx.createPalette([0,0,0,0,51,44,80,255,70,135,143,255,148,227,68,255,226,243,228,255]);       // kirokaze-gameboy
    // game.gfx.createPalette([0,0,0,0,124,63,88,255,235,107,111,255,249,168,117,255,255,246,211,255]);    // ice-cream-gb
    // game.gfx.createPalette([0,0,0,0,33,30,32,255,85,85,104,255,160,160,139,255,233,239,236,255]);       // 2bit-demichrome
    // game.gfx.createPalette([0,0,0,0,255,255,255,255,103,114,169,255,58,50,119,255,0,0,0,255]);          // ARQ4
    game.gfx.setPalette(0);

    game.assets.loadManifest(AssetManifest);

    game.input.addMapping("KeyZ",InputAction.A);
    game.input.addMapping("KeyX",InputAction.B);
    game.input.addMapping("Enter",InputAction.START);
    game.input.addMapping("ShiftRight",InputAction.SELECT);
    game.input.addMapping("ArrowUp",InputAction.UP);
    game.input.addMapping("ArrowDown",InputAction.DOWN);
    game.input.addMapping("ArrowLeft",InputAction.LEFT);
    game.input.addMapping("ArrowRight",InputAction.RIGHT);

    game.aud.setBGVolume(Number(gameSettings.getValue("bg_volume", "0.5")));
    game.aud.setSFXVolume(Number(gameSettings.getValue("sfx_volume", "0.5")));

    game.sm.addScene(SplashScene);
    game.sm.addScene(MainMenuScene);
    game.sm.addScene(ChooseEggScene);
    game.sm.addScene(NamePetScene);
    game.sm.addScene(HomeScene);
    game.sm.addScene(RythymScene);
    game.sm.addScene(RewardScene);
    game.sm.addScene(EvolveScene);

    game.start();
    //game.sm.swapScene(6);

};
//document.body.append(startButton);