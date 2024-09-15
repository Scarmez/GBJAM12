export class Sprite {
    _width;
    _height;
    _frameWidth;
    _frameHeight;
    _xFrames;
    _yFrames;
    _repeat;
    _pixels;
    _images = [];
    _texture = null;
    _overrides;
    constructor({ width, height, frameWidth, frameHeight, repeat, pixels, overrides }) {
        this._width = width;
        this._height = height;
        this._frameWidth = frameWidth ? frameWidth : width;
        this._frameHeight = frameHeight ? frameHeight : height;
        this._xFrames = width / this._frameWidth;
        this._yFrames = height / this._frameHeight;
        if (overrides) {
            this._overrides = overrides;
        }
        else {
            this._overrides = {};
        }
        this._repeat = repeat ? repeat : false;
        this._pixels = pixels;
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get frameWidth() { return this._frameWidth; }
    get frameHeight() { return this._frameHeight; }
    get xFrames() { return this._xFrames; }
    get yFrames() { return this._yFrames; }
    get repeat() { return this._repeat; }
    get pixels() { return this._pixels; }
    get overrides() { return this._overrides; }
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
