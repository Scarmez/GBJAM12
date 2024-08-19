import {GameObject} from "./GameObject.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** The Scene class is a container for all GameObjects that are currently active. */
export abstract class Scene {

    private gameObjects: GameObject[] = [];
    protected coroutines: Generator<any, any, number>[] = [];

    /** Override this function. This is where all the GameObjects should be created. */
    public abstract create(): void;

    protected addGameobject(gameObject:GameObject): GameObject {
        this.gameObjects.push(gameObject);
        return gameObject;
    }

    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    protected update(delta: number): void {}
    /** Called by the SceneManager. Don't call this directly. Override update() instead.*/
    public doUpdate(delta: number): void {
        this.update(delta);
        for(let i = 0; i < this.coroutines.length; i++){
            this.coroutines[i].next(delta);
        }
        for(let i = 0; i < this.gameObjects.length; i++){
            this.gameObjects[i].doUpdate(delta);
        }
    }

    /** Called by the SceneManager. Don't call this directly. */
    public draw(gfx: GraphicsManager): void {
        for(let i = 0; i < this.gameObjects.length; i++){
            this.gameObjects[i].doDraw(gfx);
        }
    }

    /** Override this method to implement a function that get's called when SceneManager changes to this scene. Called by the SceneManager. Don't call this directly. */
    public enter(){}
    /** Override this method to implement a function that get's called when SceneManager changes away from this scene. Called by the SceneManager. Don't call this directly. */
    public exit(){}

    /** Start a coroutine and add it to the scene. */
    public startCoroutine(generator:Generator<any, any, number>){
        this.coroutines.push(generator);
    }

}