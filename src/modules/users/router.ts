import Router from "../Router";
import { requireUnauthenticated } from "../auth/middleware/requireUnauthenticated";
import createUser from "./actions/createUser";
import { HttpError } from "../../common/error/classes/httpError";

const router = new Router({ prefix: "/users" });

router.post("/create", requireUnauthenticated(), async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const resp = await createUser(username, password);
    if (!resp) {
        throw new HttpError(400, "That user already exists");
    }

    ctx.session!.user = resp;

    ctx.status = 200;
    ctx.body = {
        message: "Successfully created user",
        id: resp
    }
    await next();
});

router.post("/loggedIn", async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        loggedIn: !!ctx.session!.user
    }

    await next();
})

export default router.routes();
