import { categories, Category } from "./Category";
import { ValueOf } from "../../../common/types/helpers/ValueOf";

export default interface Score <T extends Category>{
    id: number;
    category: T;
    subCategory: ValueOf<typeof categories[T]>;
    date: number;
    time: number;
    evidence: string;
    userHasAccount: boolean;
    username: string;
    notes: string;
}
