import { Session } from "../types/Session";
import prisma from "../../../../prisma/prisma";

export const getCookie = async (key: Session["key"]) => {
    const cookie = (await prisma.sessions.findMany({
        where: { key },
        select: { key: true, maxAge: true, session: true },
        take: 1
    }))[0];

    if (!cookie) return null;
    return cookie.session;
};
