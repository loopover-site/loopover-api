import prisma from "../../../../prisma/prisma";

export default async (id: number) => {
    const user = await prisma.users.findOne({ where: { id } });
    if (!user) {
        return null;
    }
    return await prisma.leaderboards.findMany({where: {userHasAccount: true, username: user.username}});
}
