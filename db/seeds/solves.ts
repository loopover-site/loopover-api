import Knex from "knex";

import solves from "./examples/solves";

export const seed = async (knex: Knex) => {
    await knex("leaderboards").del();
    return knex("leaderboards").insert(solves);
};
