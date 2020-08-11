import User from "../types/User";
import knex from "../../../../db/knex";
import bcrypt from "bcrypt";

export default async (username: string, password: string) => {
    const userExists = await knex<User>("users").where({ username }).first();
    if (userExists) {
        return false;
    }
    const hashedPW = await bcrypt.hash(password, 12);
    const newUser = await knex<User>("users").insert({ username, password: hashedPW, role: "member" }, "*");
    return newUser[0].id;
}
