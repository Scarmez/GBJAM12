/** Feeling random... Might use later...  */
export class PRNG {

    private _seed: number;
    private _multiplier: number = 16807;
    private _increment: number = 0;
    private _mod: number = 2147483647;

    private _current:number;

    constructor(seed:number){
        this._seed = seed;
        this._current = seed ;
    }

    private calculate(){
        this._current = (this._multiplier * this._current + this._increment) % this._mod;
    }

    public next():number{

        this.calculate();
        return this._current;

    }

    public nextInt(max:number):number{

        this.calculate();
        return this._current % max;

    }

    public nextFloat():number {
        this.calculate();
        return this._current / this._mod;
    }

}