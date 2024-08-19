/** A class to store math functions that aren't included in the standard Math Library. */
export class EMath {
    static lerp(start, end, time) {
        return start * (1 - time) + end * time;
    }
    static clamp(val, min, max) {
        return Math.min(max, Math.max(val, min));
    }
}
