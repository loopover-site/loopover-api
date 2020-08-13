import Score from "../types/Score";
import knex from "../../../../db/knex";
import { Category } from "../types/Category";

export default <T extends Category>(category: T) => {
    return knex<Score<T>>("leaderboards").where({ category }).select("*");
}
