import { Palette } from "./Palette.js";
/** Used by the GraphicsManager to actually Render Sprites to the screen. */
export class Renderer {
    gfxManager;
    palettes = [];
    constructor(gfxManager) {
        this.gfxManager = gfxManager;
    }
    createPalette(paletteArray) {
        this.palettes.push(new Palette(paletteArray));
    }
}
