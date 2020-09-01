import prisma from "../../../../prisma/prisma";

export default () => {
    return prisma.leaderboards.findMany({ where: { queued: true } });
}
