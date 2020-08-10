import { Category } from "./Category";
import Score from "./Score";

export default interface SubmitBody <T extends Category>{
    category: T;
    subCategory: Score<T>["subCategory"];
    time: number;
    evidence: string;
    username?: string;
}
