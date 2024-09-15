import { EMath } from "./ExtendedMaths.js";
/** Class used for positions in game space. Provides functions like distanceTo. */
export class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static zero() {
        return new Vector2(0, 0);
    }
    static lerp(start, end, time) {
        let newX = EMath.lerp(start.x, end.x, time);
        let newY = EMath.lerp(start.y, end.y, time);
        return new Vector2(newX, newY);
    }
    add(other) { return new Vector2(this.x + other.x, this.y + other.y); }
    subtract(other) { return new Vector2(this.x - other.x, this.y - other.y); }
}
