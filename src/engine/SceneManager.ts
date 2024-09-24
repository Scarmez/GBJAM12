import {Scene} from "./Scene.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** SceneManager manages the Scenes. Entering, Exiting and creation of scenes. Swapping Scenes etc. */
export class SceneManager {

    private scenes: typeof Scene[] = [];
    private activeSceneIndex: number = 0;
    private activeScene: Scene | undefined;

    /** Add all the scenes for your Game before you call Game.StartLoop(). */
    public addScene(scene:typeof Scene){
        this.scenes.push(scene);
        if(this.scenes.length == 1) this.activeScene = new scene();
    }

    public swapScene(index: number): void {
        this.activeScene!.exit();
        this.activeScene = new this.scenes[index]();
        this.activeScene.enter();
    }

    /** Used by the Game class to start the game. */
    public start(){
        this.activeScene?.enter();
    }

    /** Called by the Game class. Don't call this directly. */
    public update(delta: number): void {
        this.activeScene?.doUpdate(delta);
    }

    /** Called by the Game class. Don't call this directly. */
    public draw(gfx: GraphicsManager): void {
        this.activeScene?.doDraw(gfx);
    }

}