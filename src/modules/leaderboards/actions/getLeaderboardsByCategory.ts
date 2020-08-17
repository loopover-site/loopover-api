import Score from "../types/Score";
import { Category } from "../types/Category";
import prisma from "../../../../prisma/prisma";

export default <T extends Category>(category: T) => {
    return prisma.leaderboards.findMany({ where: { category } }) as Promise<Score<T>[]>;
}
