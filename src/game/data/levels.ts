export type LevelData = {
    background: string;
    answer: string;
    time: number;
};

export const levels: LevelData[] = [

    {
        background: "brokenroad",
        answer: "construction",
        time: 5
    },

    {
        background: "fireroad",
        answer: "fire",
        time: 4
    },

    {
        background: "waterroad",
        answer: "slippery",
        time: 4
    },

    {
        background: "thunderroad",
        answer: "electric",
        time: 3
    }

];