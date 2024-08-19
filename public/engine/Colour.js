/** Provides a way to store colours and easily convert them to various formats. */
export class Colour {
    _r;
    _g;
    _b;
    _a;
    get r() { return this._r; }
    get g() { return this._g; }
    get b() { return this._b; }
    get a() { return this._a; }
    _rf;
    _gf;
    _bf;
    _af;
    get rf() { return this._rf; }
    get gf() { return this._gf; }
    get bf() { return this._bf; }
    get af() { return this._af; }
    constructor(r = 255, g = 255, b = 255, a = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
        this._rf = r / 255;
        this._gf = g / 255;
        this._bf = b / 255;
        this._af = a / 255;
    }
}
