/** Provides a way to store colours and easily convert them to various formats. */
export class Colour {

    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;

    public get r(){ return this._r; }
    public get g(){ return this._g; }
    public get b(){ return this._b; }
    public get a(){ return this._a; }

    private _rf: GLfloat;
    private _gf: GLfloat;
    private _bf: GLfloat;
    private _af: GLfloat;

    public get rf(){ return this._rf; }
    public get gf(){ return this._gf; }
    public get bf(){ return this._bf; }
    public get af(){ return this._af; }

    constructor(r: number=255, g: number=255, b: number=255, a: number=255){
        
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