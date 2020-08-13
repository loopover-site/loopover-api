import Score from "../types/Score";
import knex from "../../../../db/knex";
import { categories, Category } from "../types/Category";
import { ValueOf } from "../../../common/types/helpers/ValueOf";

export default <T extends Category>(category: T, subCategory: ValueOf<typeof categories[T]>) => {
    return knex<Score<T>>("leaderboards").where({ category, subCategory }).select("*");
}
