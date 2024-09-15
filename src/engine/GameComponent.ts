import { GameObject } from "./GameObject.js";
import { GraphicsManager } from "./GraphicsManager.js";

export abstract class GameComponent {

    public abstract readonly type: string;
    public gameObject: GameObject | undefined;
    
    /** Override this function to get called by the GameLoop */
    public update(delta: number){}

    /** Override this function to get called by the GameLoop */
    public draw(gfx: GraphicsManager){}

}