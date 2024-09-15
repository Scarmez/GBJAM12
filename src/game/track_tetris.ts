export const tetrisTrack: RythymTrack = {
    song: "tetris",
    bpm: 100,
    notes: [
        {time: 1, note: 0},
        {time: 2, note: 0},
        {time: 3, note: 0},
        {time: 4, note: 0},
        {time: 5, note: 0},
        {time: 6, note: 0},
        {time: 7, note: 0}
    ]

}

export interface RythymTrack {
    song: string;
    bpm: number;
    notes: {time: number; note: number}[]
}