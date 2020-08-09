import bcrypt from "bcrypt";
import Router from "../Router";
import { requireUnauthenticated } from "./middleware/requireUnauthenticated";
import { validateSchema } from "../schema/middleware/validateSchema";
import { loginBody } from "./schema/loginBody";
import findUser from "../users/actions/findUser";
import { LoginBody } from "./types/LoginBody";
import { HttpError } from "../../common/error/classes/httpError";
import { requireAuthenticated } from "./middleware/requireAuthenticated";

const router = new Router({ prefix: "/auth" });

router.post(
    "/login",
    requireUnauthenticated(),
    validateSchema(loginBody, "body"),
    async (ctx, next) => {
        const { username, password } = ctx.request.body as LoginBody;

        const session = ctx.session!;

        const user = await findUser("username", username);
        if (!user)
            throw new HttpError(
                400,
                "There seems to be no user with that username"
            );

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new HttpError(400, "The password seems to be wrong");

        session.user = user.id;
        ctx.status = 200;
        ctx.body = {
            message: "Successfully log in",
            user: {
                username: user.username,
                role: user.role,
                id: user.id
            }
        };

        await next();
    }
);

router.get("/logout", requireAuthenticated(), async (ctx, next) => {
    ctx.session = null;

    ctx.status = 200;
    ctx.body = {
        message: "Successfully logged out"
    };

    await next();
});

export default router.routes();
