import Score from "../types/Score";
import { categories, Category } from "../types/Category";
import { ValueOf } from "../../../common/types/helpers/ValueOf";
import prisma from "../../../../prisma/prisma";

export default <T extends Category>(category: T, subCategory: ValueOf<typeof categories[T]>) => {
    return prisma.leaderboards.findMany({ where: { category, subCategory }, orderBy: "id_ASC" }) as Promise<Score<Category>[]>;
}
