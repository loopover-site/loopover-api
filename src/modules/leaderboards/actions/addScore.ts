import knex from "../../../../db/knex";
import Score from "../types/Score";
import { Category } from "../types/Category";

export default async <T extends Category>(category: T, subCategory: Score<T>["subCategory"], time: number, evidence: string, userHasAccount: boolean, username: string) => {
    const date = Date.now();
    const userHasSubmission = await knex<Score<T>>("leaderboards").where({ category, subCategory, userHasAccount, username }).first();
    if (userHasSubmission) {
        if (userHasSubmission.time < time) {
            return false;
        }
        await knex<Score<T>>("leaderboards").update({ time, evidence, date }).where({ category, subCategory, username });
        return true;
    } else {
        await knex<Score<T>>("leaderboards").insert({ category, subCategory, time, evidence, userHasAccount, username, date });
        return true;
    }
};
