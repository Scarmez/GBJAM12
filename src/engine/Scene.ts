import { EMath } from "./ExtendedMaths.js";
import {GameObject} from "./GameObject.js";
import {GraphicsManager} from "./GraphicsManager.js";

/** The Scene class is a container for all GameObjects that are currently active. */
export class Scene {

    private gameObjects: GameObject[] = [];
    protected coroutines: Generator<any, any, number>[] = [];

    protected bgPaletteIndex = 3;

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

    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    protected draw(gfx: GraphicsManager): void {}
    protected lateDraw(gfx: GraphicsManager): void {}
    /** Called by the SceneManager. Don't call this directly. */
    public doDraw(gfx: GraphicsManager): void {
        gfx.clearScreen(this.bgPaletteIndex);
        this.draw(gfx);
        for(let i = 0; i < this.gameObjects.length; i++){
            this.gameObjects[i].doDraw(gfx);
        }
        this.lateDraw(gfx);
    }

    /** Override this method to implement a function that get's called when SceneManager changes to this scene. Called by the SceneManager. Don't call this directly. */
    public enter(){}
    /** Override this method to implement a function that get's called when SceneManager changes away from this scene. Called by the SceneManager. Don't call this directly. */
    public exit(){}

    /** Start a coroutine and add it to the scene. */
    public startCoroutine(generator:Generator<any, any, number>){
        this.coroutines.push(generator);
    }

    protected* moveTo(entity: GameObject, destination: {x?: number, y?: number}, durationMs: number, callback?: Function): Generator<void, void, number> {
        let totalTime = 0;
        if(!destination.x) destination.x = entity.localX;
        if(!destination.y) destination.y = entity.localY;
        const { localX: originalX, localY: originalY} = entity;
        while(true) {
            let elapsed = yield;
            totalTime += elapsed;
            const currentTime = totalTime / durationMs;

            const currentX = EMath.lerp(originalX, destination.x, currentTime);
            const currentY = EMath.lerp(originalY, destination.y, currentTime);
            entity.localX = Math.round(currentX);
            entity.localY = Math.round(currentY);
            if (totalTime >= durationMs) {
                entity.localX = destination.x;
                entity.localY = destination.y;
                if(callback) callback();
                return;
            }
            
        }
    }

    protected * delayFunction(durationS:number, func: Function): Generator<any,any,number> {
        let totalTime = 0;
        while(true) {
            let elapsed = yield;
            totalTime += elapsed;
            if (totalTime >= durationS){
                func();
                return;
            }
        }
    }

}