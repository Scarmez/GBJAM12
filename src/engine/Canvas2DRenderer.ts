import {Renderer} from "./Renderer.js";
import {Sprite} from "./Sprite.js";
import {Palette} from "./Palette.js";
import { SpriteData } from "./SpriteData.js";
import { GraphicsManager } from "./GraphicsManager.js";
export class Canvas2DRenderer extends Renderer {

    private _ctx: CanvasRenderingContext2D;
    private _currentPaletteIndex: number = 0;

    constructor(gfxManager: GraphicsManager, context: CanvasRenderingContext2D){
        super(gfxManager);
        this._ctx = context;
        this._ctx.imageSmoothingEnabled = false;
        this._ctx.scale(this.gfxManager.scale, this.gfxManager.scale);
    }

    public drawImage(sprite: Sprite, srcX?: number, srcY?: number, srcWidth?: number, srcHeight?: number, dstX?: number, dstY?: number, dstWidth?: number, dstHeight?: number, flipX?: boolean, flipY?: boolean, srcRotation?: number): void {
        if (srcX === undefined) { srcX = 0; }
        if (srcY === undefined) { srcY = 0; }
        if (dstX === undefined) { dstX = srcX; }
        if (dstY === undefined) { dstY = srcY; }
        if (srcWidth === undefined) { srcWidth = sprite.width; }
        if (srcHeight === undefined) { srcHeight = sprite.height; }
        if (dstWidth === undefined) {
            dstWidth = srcWidth;
            srcWidth = sprite.width;
        }
        if (dstHeight === undefined) {
            dstHeight = srcHeight;
            srcHeight = sprite.height;
        }
        if (srcRotation === undefined) {
            srcRotation = 0;
        }

        if(flipX){
            dstX += dstWidth;
            dstWidth *= -1;
        }

        if(flipY){
            dstY += dstHeight;
            dstHeight *= -1;
        }
        this._ctx.drawImage(sprite.getImage(this._currentPaletteIndex), srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight);
    }

    public setPalette(palette: Palette): void {
        this._currentPaletteIndex = 0;
    }
    
    public clearScreen(): void {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }

    public createSprite(spriteData: SpriteData): Sprite {
        
        let sprite = new Sprite(spriteData);
        let tempCanvas = document.createElement('canvas');
        tempCanvas.width = spriteData.width;
        tempCanvas.height = spriteData.height;
        let tempCTX = tempCanvas.getContext('2d');
        if(!tempCTX) throw Error(`Couldn't get temporary CTX`);

        tempCTX.imageSmoothingEnabled = false;

        let imgs: HTMLImageElement[] = [];

        for(let i = 0; i < this.gfxManager.palettes.length; i++){
            
            let imageData = tempCTX?.createImageData(spriteData.width, spriteData.height);
            let pixelData = new Uint8ClampedArray(spriteData.width * spriteData.height * 4);
            let palette = this.gfxManager.palettes[i];

            for(i = 0; i < spriteData.pixels.length; i++){
                pixelData[i * 4 + 0] = palette.intRGB[spriteData.pixels[i]][0];
                pixelData[i * 4 + 1] = palette.intRGB[spriteData.pixels[i]][1];
                pixelData[i * 4 + 2] = palette.intRGB[spriteData.pixels[i]][2];
                pixelData[i * 4 + 3] = palette.intRGB[spriteData.pixels[i]][3];
            }

            imageData?.data.set(pixelData);
            tempCTX.putImageData(imageData,0,0);
            let image = new Image();
            image.src = tempCanvas.toDataURL();
            sprite.setImage(image);

        }

        return sprite;

    }    

}