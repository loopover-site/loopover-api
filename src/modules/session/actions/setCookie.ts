import { Session } from "../types/Session";

import { destroyCookie } from "./destroyCookie";
import prisma from "../../../../prisma/prisma";

export const setCookie = async (
    key: Session["key"],
    session: Session["session"],
    maxAge: Session["maxAge"]
) => {
    await destroyCookie(key);

    return await prisma.sessions.create({data: {key, session, maxAge}});
};
