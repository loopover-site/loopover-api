export type Category = "3x3" | "4x4" | "5x5" | "6x6" | "7x7" | "8x8" | "9x9" | "10x10" | "11x11" | "12x12" | "13x13" | "14x14" | "15x15" | "20x20";

export type SubCategory = "regular" | "mo3" | "ao5" | "blindAo5" | "blind" | "fmc" | "nrg"

export const categories: Record<Category, SubCategory[]> = {
    "3x3": ["blindAo5"],
    "4x4": ["regular", "ao5", "fmc", "blind"],
    "5x5": ["regular", "ao5", "fmc", "blind"],
    "6x6": ["regular", "ao5", "fmc"],
    "7x7": ["regular", "ao5", "fmc"],
    "8x8": ["regular", "ao5"],
    "9x9": ["regular", "ao5"],
    "10x10": ["regular", "ao5"],
    "11x11": ["regular", "ao5"],
    "12x12": ["regular", "ao5"],
    "13x13": ["regular", "ao5"],
    "14x14": ["regular", "ao5"],
    "15x15": ["regular", "mo3"],
    "20x20": ["regular", "mo3"],
}
