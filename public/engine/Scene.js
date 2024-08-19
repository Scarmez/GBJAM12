/** The Scene class is a container for all GameObjects that are currently active. */
export class Scene {
    gameObjects = [];
    coroutines = [];
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
    /** Called by the SceneManager. Don't call this directly. */
    draw(gfx) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].doDraw(gfx);
        }
    }
    /** Override this method to implement a function that get's called when SceneManager changes to this scene. Called by the SceneManager. Don't call this directly. */
    enter() { }
    /** Override this method to implement a function that get's called when SceneManager changes away from this scene. Called by the SceneManager. Don't call this directly. */
    exit() { }
    /** Start a coroutine and add it to the scene. */
    startCoroutine(generator) {
        this.coroutines.push(generator);
    }
}
