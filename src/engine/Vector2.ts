import { EMath } from "./ExtendedMaths.js";

/** Class used for positions in game space. Provides functions like distanceTo. */
export class Vector2 {

    public x:number;
    public y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    static zero():Vector2 {
        return new Vector2(0,0);
    }

    static lerp(start:Vector2, end:Vector2, time:number): Vector2 {
        let newX = EMath.lerp(start.x, end.x, time);
        let newY = EMath.lerp(start.y, end.y, time);
        return new Vector2(newX, newY);
    }

    public add(other:Vector2): Vector2 { return new Vector2(this.x + other.x, this.y + other.y); }
    public subtract(other:Vector2): Vector2 { return new Vector2(this.x - other.x, this.y - other.y); }


}