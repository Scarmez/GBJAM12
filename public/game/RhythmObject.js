import { GameObject } from "../engine/GameObject";
export class RhythmObject extends GameObject {
    _track;
    constructor(track) {
        super(0, 0, 0, 0);
        this._track = track;
    }
    draw(gfx) {
    }
}
