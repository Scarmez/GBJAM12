/** A class to store math functions that aren't included in the standard Math Library. */
export class EMath {
    static lerp(start: number, end: number, time: number):number {
        return start * (1-time) + end * time;
    }
    
    static clamp(val: number, min: number, max: number):number {
        return Math.min(max, Math.max(val, min));
    }
}



