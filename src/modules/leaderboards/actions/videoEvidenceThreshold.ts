import { Category, SubCategory } from "../types/Category";
import prisma from "../../../../prisma/prisma";

export default async <T extends Category>(category: T, subCategory: SubCategory<T>) => {
    const games = await prisma.leaderboards.findMany({ where: { category, subCategory }, orderBy: "time_ASC" });
    return games.length === 0 ? -1 : games[0].time * 2;
}
