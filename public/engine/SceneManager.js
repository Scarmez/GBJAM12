/** SceneManager manages the Scenes. Entering, Exiting and creation of scenes. Swapping Scenes etc. */
export class SceneManager {
    scenes = [];
    activeSceneIndex = 0;
    /** Add all the scenes for your Game before you call Game.StartLoop(). */
    addScene(scene) {
        this.scenes.push(scene);
        if (this.scenes.length == 1)
            this.scenes[0].create();
    }
    /** Swap active scene to new index.*/
    swapScene(index) {
        if (index >= this.scenes.length)
            return console.error(`Could not load scene index ${index}`);
        this.scenes[this.activeSceneIndex].exit();
        this.activeSceneIndex = index;
        this.scenes[this.activeSceneIndex].create();
        this.scenes[this.activeSceneIndex].enter();
    }
    /** Used by the Game class to start the game. */
    start() {
        this.scenes[0].enter();
    }
    /** Called by the Game class. Don't call this directly. */
    update(delta) {
        this.scenes[this.activeSceneIndex].doUpdate(delta);
    }
    /** Called by the Game class. Don't call this directly. */
    draw(gfx) {
        this.scenes[this.activeSceneIndex].draw(gfx);
    }
}
