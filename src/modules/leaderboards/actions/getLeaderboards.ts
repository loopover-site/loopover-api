import Score from "../types/Score";
import knex from "../../../../db/knex";
import { Category } from "../types/Category";

export default () => {
    return knex<Score<Category>>("leaderboards").select("*");
}
