import { WebGL2Renderer } from "../WebGL2Renderer.js";
import { Canvas2DRenderer } from "../Canvas2DRenderer.js";
import { Palette } from "../Palette.js";
import { EMath } from "../ExtendedMaths.js";
/** Graphics class. Use this to draw to the screen. */
export class GraphicsManager {
    _renderer;
    _canvas;
    _width;
    _height;
    _scale;
    _currentPalette = 0;
    _palettes = [];
    get width() { return this._width; }
    get height() { return this._height; }
    get scale() { return this._scale; }
    get palettes() { return this._palettes; }
    constructor(width, height, multiplier) {
        this._width = width;
        this._height = height;
        this._scale = multiplier;
        this._canvas = document.createElement('canvas');
        this._canvas.width = width * multiplier;
        this._canvas.height = height * multiplier;
        document.body.append(this._canvas);
        let context = this._canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
        if (context) {
            this._renderer = new WebGL2Renderer(this, context);
        }
        else {
            console.error(`Could not get WebGL2 context! Making 2d Context`);
            context = this._canvas.getContext('2d');
            this._renderer = new Canvas2DRenderer(this, context);
        }
    }
    /** Set what palette index to use for all subsequent draws (until set again). */
    setPalette(index) {
        index = EMath.clamp(index, 0, this._palettes.length);
        this._renderer.setPalette(this._palettes[index]);
        this._currentPalette = index;
    }
    /** Palettes are used to draw sprites.  */
    createPalette(paletteArray) {
        this._palettes.push(new Palette(paletteArray));
    }
    /** Cleared the screen using the Renderer's capabilities.*/
    clearScreen() {
        this._renderer.clearScreen(this._palettes[this._currentPalette].colours[4]);
    }
    /** Parses the Create Sprite instruction to the Renderer so that it will be created in a way that the Renderer supports. */
    createSprite(spriteData) {
        return this._renderer.createSprite(spriteData);
    }
    /** The main draw function. Parses the draw instructions to the Renderer class to draw using the obtained context. */
    drawImage(sprite, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, flipX, flipY, srcRotation) {
        this._renderer.drawImage(sprite, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, flipX, flipY, srcRotation);
    }
    /** Draws a strong to the screen using the specified Font Sprite. */
    drawString(text, font, x, y) {
        for (let i = 0; i < text.length; i++) {
            let charIndex = text.charCodeAt(i) - 32;
            let srcX = charIndex * font.frameWidth % font.width;
            let srcY = Math.floor((charIndex * font.frameWidth) / font.width) * font.frameHeight;
            this.drawImage(font, srcX, srcY, font.frameWidth, font.frameHeight, x + i * font.frameWidth, y, font.frameWidth, font.frameHeight);
        }
    }
    /** Used to draw Sprites that are sliced up into a 3X3 grid using the Sprite's frameWidth and frameHeight properties. */
    drawSliced(sprite, dstX, dstY, dstW, dstH) {
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let srcX = x * sprite.frameWidth;
                let srcY = y * sprite.frameHeight;
                let sliceX = dstX;
                let sliceY = dstY;
                let sliceW = sprite.frameWidth;
                let sliceH = sprite.frameHeight;
                if (x == 1) {
                    sliceX += sprite.frameWidth;
                    sliceW = dstW - sprite.frameWidth * 2;
                }
                if (x == 2)
                    sliceX = dstX + dstW - sprite.frameWidth;
                if (y == 1) {
                    sliceY += sprite.frameHeight;
                    sliceH = dstH - sprite.frameHeight * 2;
                }
                if (y == 2)
                    sliceY = dstY + dstH - sprite.frameHeight;
                this.drawImage(sprite, srcX, srcY, sprite.frameWidth, sprite.frameHeight, sliceX, sliceY, sliceW, sliceH);
            }
        }
    }
}
