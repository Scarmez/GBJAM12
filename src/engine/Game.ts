import {GraphicsManager} from "./GraphicsManager.js";
import {SceneManager} from "./SceneManager.js";
import {AssetManager} from "./AssetManager.js";
import {InputManager} from "./InputManager.js";
import { Sprite } from "./Sprite.js";
import { AudioManager } from "./AudioManager.js";

/** The main Game class. A singleton class that serves as the root of all Game code. */
export class Game {

    /** Singleton accessor */
    public static i: Game;

    public gfx: GraphicsManager;
    public aud: AudioManager;
    public sm: SceneManager;
    public assets: AssetManager;
    public input: InputManager;

    public constructor(config: GameConfig){
        this.gfx = new GraphicsManager(config.xRes, config.yRes, config.scale);
        this.aud = new AudioManager();
        this.assets = new AssetManager(this.gfx, this.aud);
        this.sm = new SceneManager();
        this.input = new InputManager();
        Game.i = this;
    }

    /** Start the game loop. */
    public start(): void {
        this.sm.start();
        this.loop();
    }

    private loop(): void {

        let previousMs: number;
        const fixedDelta = 1 / 60;
        const step = fixedDelta * 1000;

        let lastTime = 0;
        let ticksThisSecond = 0;
        let lastTPS = 0;
        let drawsThisSecond = 0;
        let lastFPS = 0;

        const stepFn = (timestampMs: number) => {

            if (previousMs === undefined) {
                previousMs = timestampMs;
                lastTime = timestampMs;
            } else {
                if(timestampMs > lastTime + 1000){
                    lastTime = timestampMs;
                    lastFPS = drawsThisSecond;
                    drawsThisSecond = 0;
                    lastTPS = ticksThisSecond;
                    ticksThisSecond = 0;
                }
            }

            let delta = (timestampMs - previousMs);
            while (delta >= step) {
                this.sm.update(fixedDelta);
                this.input.update(fixedDelta);
                ticksThisSecond++;
                delta -= step;
            }

            this.gfx.clearScreen();
            this.sm.draw(this.gfx);
            drawsThisSecond++;
            previousMs = timestampMs - delta; 

            requestAnimationFrame(stepFn)

        }

        requestAnimationFrame(stepFn);

    }

}

interface GameConfig {
    /** The X resolution of the game. */
    xRes: number;
    /** The Y resolution of the game. */
    yRes: number;
    /** The upscale factor of the game. */
    scale: number;

}