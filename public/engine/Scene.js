import { EMath } from "./ExtendedMaths.js";
/** The Scene class is a container for all GameObjects that are currently active. */
export class Scene {
    gameObjects = [];
    coroutines = [];
    bgPaletteIndex = 3;
    addGameobject(gameObject) {
        this.gameObjects.push(gameObject);
        return gameObject;
    }
    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    update(delta) { }
    /** Called by the SceneManager. Don't call this directly. Override update() instead.*/
    doUpdate(delta) {
        this.update(delta);
        for (let i = 0; i < this.coroutines.length; i++) {
            this.coroutines[i].next(delta);
        }
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].doUpdate(delta);
        }
    }
    /** Override this and it will be called by doUpdate during the game's loop. Include all physics and movement code. */
    draw(gfx) { }
    lateDraw(gfx) { }
    /** Called by the SceneManager. Don't call this directly. */
    doDraw(gfx) {
        gfx.clearScreen(this.bgPaletteIndex);
        this.draw(gfx);
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].doDraw(gfx);
        }
        this.lateDraw(gfx);
    }
    /** Override this method to implement a function that get's called when SceneManager changes to this scene. Called by the SceneManager. Don't call this directly. */
    enter() { }
    /** Override this method to implement a function that get's called when SceneManager changes away from this scene. Called by the SceneManager. Don't call this directly. */
    exit() { }
    /** Start a coroutine and add it to the scene. */
    startCoroutine(generator) {
        this.coroutines.push(generator);
    }
    *moveTo(entity, destination, durationMs, callback) {
        let totalTime = 0;
        if (!destination.x)
            destination.x = entity.localX;
        if (!destination.y)
            destination.y = entity.localY;
        const { localX: originalX, localY: originalY } = entity;
        while (true) {
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
                if (callback)
                    callback();
                return;
            }
        }
    }
    *delayFunction(durationS, func) {
        let totalTime = 0;
        while (true) {
            let elapsed = yield;
            totalTime += elapsed;
            if (totalTime >= durationS) {
                func();
                return;
            }
        }
    }
}
