import prisma from "../../../../prisma/prisma";
import Score from "../types/Score";
import { Category } from "../types/Category";

export default (): Promise<Score<Category>[]> => {
    return prisma.leaderboards.findMany({ orderBy: "id_ASC" }) as Promise<Score<Category>[]>;
}
