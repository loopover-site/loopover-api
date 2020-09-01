import prisma from "../../../../prisma/prisma";
import Score from "../types/Score";
import { Category } from "../types/Category";

export default async (): Promise<Score<Category>[]> => {
    return prisma.leaderboards.findMany({ where: { queued: false }, orderBy: "id_ASC" }) as Promise<Score<Category>[]>;
}
