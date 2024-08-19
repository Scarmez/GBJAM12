export class Sprite {

    private _width: number;
    private _height: number;
    private _frameWidth: number;
    private _frameHeight: number;
    private _repeat: boolean;
    private _pixels: number[];
    private _images: HTMLImageElement[] = [];
    private _texture: WebGLTexture | null = null;

    constructor({width, height, frameWidth, frameHeight, repeat, pixels}:{width:number, height:number, frameWidth?:number, frameHeight?:number, repeat?: boolean, pixels:number[]}){
        this._width = width;
        this._height = height;
        this._frameWidth = frameWidth ? frameWidth : width;
        this._frameHeight = frameHeight ? frameHeight : height;
        this._repeat = repeat ? repeat : false;
        this._pixels = pixels;
    }

    public get width(){ return this._width; }
    public get height(){ return this._height; }
    public get frameWidth(){ return this._frameWidth; }
    public get frameHeight(){ return this._frameHeight; }
    public get repeat() { return this._repeat; }
    public get pixels(){ return this._pixels; }

    public set frameWidth(frameWidth:number){ this._frameWidth = frameWidth < this._width ? frameWidth : this._width; }
    public set frameHeight(frameHeight:number){ this._frameHeight = frameHeight < this._height ? frameHeight : this._height; }

    public set texture(texture: WebGLTexture){ this._texture = texture; }
    public get texture(): WebGLTexture { return this._texture!; }

    public setImage(image: HTMLImageElement){
        this._images.push(image);
    }
    public getImage(paletteIndex:number){
        return this._images[paletteIndex];
    }

}