import { AnimatedSpriteObject } from "../engine/AnimatedSpriteObject.js";
import { Scene } from "../engine/Scene.js";

export class HomeScene extends Scene {

    public create(): void {
        this.addGameobject(new AnimatedSpriteObject(48, 48, 0, 0, "c1_idle", true))
    }

}