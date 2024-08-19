import {Sprite} from "./Sprite.js";
import {Colour} from "./Colour.js";
import {Palette} from "./Palette.js";
import { SpriteData } from "./SpriteData.js";
import { GraphicsManager } from "./GraphicsManager.js";

/** Used by the GraphicsManager to actually Render Sprites to the screen. */
export abstract class Renderer {

    protected gfxManager: GraphicsManager;
    protected palettes: Palette[] = [];

    constructor(gfxManager: GraphicsManager){
        this.gfxManager = gfxManager;
    }

    public createPalette(paletteArray: number[]){
        this.palettes.push(new Palette(paletteArray));
    }

    /** Draws a sprite to the screen. */
    public abstract drawImage(sprite:Sprite, 
        srcX?:number, srcY?:number, srcWidth?:number, srcHeight?:number, 
        dstX?:number, dstY?:number, dstWidth?:number, dstHeight?:number, 
        flipX?:boolean, flipY?:boolean, srcRotation?:number): void;

    /** Set the Palette for subsequent drawImage calls. */
    public abstract setPalette(palette: Palette): void;

    /** Clears the screen by filling it with the specified Colour. Mainly used to clear to start drawing anew. */
    public abstract clearScreen(colour: Colour): void;

    /** Create the sprite in a format that this renderer can handle. */
    public abstract createSprite(spriteData: SpriteData): Sprite;

}