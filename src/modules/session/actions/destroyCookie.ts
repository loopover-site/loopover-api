import { Session } from "../types/Session";
import prisma from "../../../../prisma/prisma";

export const destroyCookie = async (key: Session["key"]) =>
    prisma.sessions.deleteMany({ where: { key } });
