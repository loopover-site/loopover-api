import Knex from "knex";

export const up = async (knex: Knex) =>
    knex.schema.createTable("leaderboards", table => {
        table.increments("id");
        table.string("category").notNullable();
        table.string("subCategory").notNullable();
        table.bigInteger("date").notNullable();
        table.float("time").notNullable();
        table.string("evidence").notNullable();
        table.boolean("userHasAccount").notNullable();
        table.string("username").notNullable();
    });

export const down = async (knex: Knex) => knex.schema.dropTable("leaderboards");
