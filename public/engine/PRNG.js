/** Feeling random... Might use later...  */
export class PRNG {
    _seed;
    _multiplier = 16807;
    _increment = 0;
    _mod = 2147483647;
    _current;
    constructor(seed) {
        this._seed = seed;
        this._current = seed;
    }
    calculate() {
        this._current = (this._multiplier * this._current + this._increment) % this._mod;
    }
    next() {
        this.calculate();
        return this._current;
    }
    nextInt(max) {
        this.calculate();
        return this._current % max;
    }
    nextFloat() {
        this.calculate();
        return this._current / this._mod;
    }
}
