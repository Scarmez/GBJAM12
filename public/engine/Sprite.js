export class Sprite {
    _width;
    _height;
    _frameWidth;
    _frameHeight;
    _repeat;
    _pixels;
    _images = [];
    _texture = null;
    constructor({ width, height, frameWidth, frameHeight, repeat, pixels }) {
        this._width = width;
        this._height = height;
        this._frameWidth = frameWidth ? frameWidth : width;
        this._frameHeight = frameHeight ? frameHeight : height;
        this._repeat = repeat ? repeat : false;
        this._pixels = pixels;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get frameWidth() { return this._frameWidth; }
    get frameHeight() { return this._frameHeight; }
    get repeat() { return this._repeat; }
    get pixels() { return this._pixels; }
    set frameWidth(frameWidth) { this._frameWidth = frameWidth < this._width ? frameWidth : this._width; }
    set frameHeight(frameHeight) { this._frameHeight = frameHeight < this._height ? frameHeight : this._height; }
    set texture(texture) { this._texture = texture; }
    get texture() { return this._texture; }
    setImage(image) {
        this._images.push(image);
    }
    getImage(paletteIndex) {
        return this._images[paletteIndex];
    }
}
