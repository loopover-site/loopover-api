import prisma from "../../../../prisma/prisma";

export default async (id: number) => {
    const solve = (await prisma.leaderboards.findMany({ where: { id, queued: true }, take: 1}))[0];
    if (!solve) {
        return false;
    }
    await prisma.leaderboards.deleteMany({ where: { category: solve.category, subCategory: solve.subCategory, queued: false }});
    await prisma.leaderboards.updateMany({ where: { id }, data: { queued: false }});
    return true;
}
