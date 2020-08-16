import { categories, Category } from "../types/Category";
import prisma from "../../../../prisma/prisma";
import { ValueOf } from "../../../common/types/helpers/ValueOf";

export default async <T extends Category>(category: T, subCategory: ValueOf<typeof categories[T]>, time: number, evidence: string, userHasAccount: boolean, username: string) => {
    const date = Date.now();
    const userHasSubmission = (await prisma.leaderboards.findMany({ where: { category, subCategory, userHasAccount, username }, take: 1 }))[0];
    if (userHasSubmission) {
        if (userHasSubmission.time < time) {
            return false;
        }
        await prisma.leaderboards.updateMany({
            data: { time, evidence, date },
            where: { category, subCategory, username }
        });
        return true;
    } else {
        await prisma.leaderboards.create({
            data: { category, subCategory: subCategory as string, date, time, evidence, userHasAccount, username }
        });
        return true;
    }
};
