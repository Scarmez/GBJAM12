import { Colour } from "./Colour.js";

export class Palette {

    private _size: number;
    private _intRGB: number[][] = [];
    private _floatRGB: number[] = [];
    private _colours: Colour[] = [];

    get size() { return this._size; }
    get intRGB() { return this._intRGB; }
    get floatRGB() { return this._floatRGB; }
    get colours() { return this._colours; }

    constructor(paletteArray: number[]){
        this._size = paletteArray.length / 4;

        for(let i = 0; i < paletteArray.length; i+=4){
            this._intRGB.push([paletteArray[i+0], paletteArray[i+1], paletteArray[i+2], paletteArray[i+3]]);
            this._colours.push(new Colour(paletteArray[i+0], paletteArray[i+1], paletteArray[i+2], paletteArray[i+3]));
        }
        
        for(let i = 0; i < paletteArray.length; i++){
            this._floatRGB.push(paletteArray[i] / 255);
        }

        console.log(this._colours)

    }



}