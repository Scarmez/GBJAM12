/** SceneManager manages the Scenes. Entering, Exiting and creation of scenes. Swapping Scenes etc. */
export class SceneManager {
    scenes = [];
    activeSceneIndex = 0;
    activeScene;
    /** Add all the scenes for your Game before you call Game.StartLoop(). */
    addScene(scene) {
        this.scenes.push(scene);
        if (this.scenes.length == 1)
            this.activeScene = new scene();
    }
    swapScene(index) {
        this.activeScene.exit();
        this.activeScene = new this.scenes[index]();
        this.activeScene.enter();
    }
    /** Used by the Game class to start the game. */
    start() {
        this.activeScene?.enter();
    }
    /** Called by the Game class. Don't call this directly. */
    update(delta) {
        this.activeScene?.doUpdate(delta);
    }
    /** Called by the Game class. Don't call this directly. */
    draw(gfx) {
        this.activeScene?.doDraw(gfx);
    }
}
