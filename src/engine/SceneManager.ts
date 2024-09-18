import {Scene} from "./Scene.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** SceneManager manages the Scenes. Entering, Exiting and creation of scenes. Swapping Scenes etc. */
export class SceneManager {

    private scenes: Scene[] = [];
    private activeSceneIndex: number = 0;

    /** Add all the scenes for your Game before you call Game.StartLoop(). */
    public addScene(scene:Scene){
        this.scenes.push(scene);
        if(this.scenes.length == 1) this.scenes[0].create();
    }

    /** Swap active scene to new index.*/
    public swapScene(index: number): void {
        if(index >= this.scenes.length) return console.error(`Could not load scene index ${index}`);
        this.scenes[this.activeSceneIndex].exit();
        this.activeSceneIndex = index;
        this.scenes[this.activeSceneIndex].create();
        this.scenes[this.activeSceneIndex].enter();
    }

    /** Used by the Game class to start the game. */
    public start(){
        this.scenes[0].enter();
    }

    /** Called by the Game class. Don't call this directly. */
    public update(delta: number): void {
        this.scenes[this.activeSceneIndex].doUpdate(delta);
    }

    /** Called by the Game class. Don't call this directly. */
    public draw(gfx: GraphicsManager): void {
        this.scenes[this.activeSceneIndex].doDraw(gfx);
    }

}