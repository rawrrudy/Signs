export type LevelData = {
    background: string;
    answer: string;
    time: number;
};

export const levels: LevelData[] = [

    // L1
    {
        background: "brokenroad",
        answer: "construction",
        time: 5.0
    },

    // L2
    {
        background: "fireroad",
        answer: "fire",
        time: 4.5
    },

    // L3
    {
        background: "waterroad",
        answer: "slippery",
        time: 4.0
    },

    // L4
    {
        background: "thunderroad",
        answer: "electric",
        time: 3.8
    },

    // L5
    {
        background: "fireroad",
        answer: "fire",
        time: 3.5
    },

    // L6
    {
        background: "brokenroad",
        answer: "construction",
        time: 3.2
    },

    // L7
    {
        background: "floodroad",
        answer: "slippery",
        time: 2.7
    },

    // L8
    {
        background: "brokenelectricity",
        answer: "electric",
        time: 2.1
    },

    // L9
    {
        background: "firebuilding",
        answer: "fire",
        time: 1.6
    },

    // L10 (Final)
    {
        background: "finalboss",
        answer: "electric",
        time: 1.0
    }

];