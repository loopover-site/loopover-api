import { PrismaClient } from "@prisma/client";
import users from "./examples/users";
import solves from "./examples/solves";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const seed = async () => {
    await prisma.users.deleteMany({});
    const hashedUsers: typeof users = await Promise.all(
        users.map(async u => ({
            ...u,
            password: await bcrypt.hash(u.password, 12)
        }))
    );
    await Promise.all(hashedUsers.map(l => prisma.users.create({ data: l })));
    await prisma.leaderboards.deleteMany({});
    await Promise.all(solves.map(l => prisma.leaderboards.create({ data: l })));
}

export default prisma;
