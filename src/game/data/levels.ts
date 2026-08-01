export type LevelData = {
    background: string;
    answer: string;
    time: number;
};

export const levels: LevelData[] = [

    // Level 1
    {
        background: "brokenroad",
        answer: "construction",
        time: 5.0
    },

    // Level 2
    {
        background: "fireroad",
        answer: "fire",
        time: 4.5
    },

    // Level 3
    {
        background: "waterroad",
        answer: "slippery",
        time: 4.0
    },

    // Level 4
    {
        background: "thunderroad",
        answer: "electric",
        time: 3.8
    },

    // Level 5
    {
        background: "fireroad",
        answer: "fire",
        time: 3.5
    },

    // Level 6
    {
        background: "brokenroad",
        answer: "construction",
        time: 3.2
    },

    // Level 7
    {
        background: "waterroad",
        answer: "slippery",
        time: 2.8
    },

    // Level 8
    {
        background: "thunderroad",
        answer: "electric",
        time: 2.4
    },

    // Level 9
    {
        background: "fireroad",
        answer: "fire",
        time: 2.0
    },

    // Level 10 (Final)
    {
        background: "thunderroad",
        answer: "electric",
        time: 1.5
    }

];