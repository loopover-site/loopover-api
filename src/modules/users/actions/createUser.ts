import bcrypt from "bcrypt";
import prisma from "../../../../prisma/prisma";

export default async (username: string, password: string) => {
    const userExists = await prisma.users.findOne({ where: { username } });
    if (userExists) {
        return false;
    }
    const hashedPW = await bcrypt.hash(password, 12);
    const newUser = await prisma.users.create({ data: { username, password: hashedPW, role: "member" } });
    return newUser.id;
}
