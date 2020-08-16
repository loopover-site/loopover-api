import User from "../types/User";
import prisma from "../../../../prisma/prisma";

export default async <T extends keyof Omit<User, "password">>(
    property: T,
    value: User[T]
) => {
    if (!property || !value) return null;
    const result = (await prisma.users.findMany({ where: { [property]: value }, take: 1 }))[0];
    if (!result) return null;

    return result;
};
