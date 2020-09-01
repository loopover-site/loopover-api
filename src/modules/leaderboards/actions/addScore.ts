import { categories, Category } from "../types/Category";
import prisma from "../../../../prisma/prisma";
import { ValueOf } from "../../../common/types/helpers/ValueOf";
import videoEvidenceThreshold from "./videoEvidenceThreshold";

export default async <T extends Category>(category: T, subCategory: ValueOf<typeof categories[T]>, time: number, evidence: string, userHasAccount: boolean, username: string, notes: string = "") => {
    const date = Date.now();
    const userHasSubmission = (await prisma.leaderboards.findMany({ where: { category, subCategory, userHasAccount, username }, take: 1 }))[0];
    const threshold = await videoEvidenceThreshold(category, subCategory);
    const queued = threshold === -1 ? true : threshold > time;
    if (userHasSubmission) {
        if (userHasSubmission.time < time) {
            return false;
        }
        if (queued) {
            await prisma.leaderboards.create({
                data: {
                    category,
                    subCategory: subCategory as string,
                    date,
                    time,
                    evidence,
                    userHasAccount,
                    username,
                    notes,
                    queued,
                },
            });
        } else {
            await prisma.leaderboards.updateMany({
                data: { time, evidence, date, notes },
                where: { category, subCategory, username },
            });
        }
        return true;
    } else {
        await prisma.leaderboards.create({
            data: { category, subCategory: subCategory as string, date, time, evidence, userHasAccount, username, notes, queued }
        });
        return true;
    }
};
