type Category = "3x3" | "4x4" | "5x5" | "6x6" | "7x7" | "8x8" | "9x9" | "10x10" | "11x11" | "12x12" | "13x13" | "14x14" | "15x15" | "20x20";

type SubCategory = "regular" | "mo3" | "ao5" | "blindAo5" | "blind" | "fmc" | "nrg";

interface Score <T extends Category>{
    category: T;
    subCategory: SubCategory;
    date: number;
    time: number;
    evidence: string;
    userHasAccount: boolean;
    username: string;
}

export default [
    {
        category: "5x5",
        subCategory: "regular",
        date: 1234567,
        time: 12345,
        evidence: "https://google.com",
        userHasAccount: false,
        username: "test"
    },
    {
        category: "5x5",
        subCategory: "ao5",
        date: 1234567,
        time: 13345,
        evidence: "https://google.com",
        userHasAccount: true,
        username: "lepepe"
    },
    {
        category: "4x4",
        subCategory: "regular",
        date: 3215647,
        time: 6382,
        evidence: "https://bing.com",
        userHasAccount: true,
        username: "lepepe"
    }
] as readonly Score<Category>[];
