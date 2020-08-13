import Router from "../Router";
import { validateSchema } from "../schema/middleware/validateSchema";
import { submitBody } from "./schema/submitBody";
import SubmitBody from "./types/SubmitBody";
import findUser from "../users/actions/findUser";
import addScore from "./actions/addScore";
import { HttpError } from "../../common/error/classes/httpError";
import getLeaderboards from "./actions/getLeaderboards";
import getLeaderboardsByCategory from "./actions/getLeaderboardsByCategory";
import getLeaderboardsByCategoryAndSubCategory from "./actions/getLeaderboardsByCategoryAndSubCategory";

const router = new Router({ prefix: "/leaderboards" });

router.get("/", async (ctx, next) => {
    const leaderboards = await getLeaderboards();
    ctx.status = 200;
    ctx.body = leaderboards;
    await next();
});

router.get("/:category", async (ctx, next) => {
    const leaderboards = await getLeaderboardsByCategory(ctx.params.category);
    ctx.status = 200;
    ctx.body = leaderboards;
    await next();
});

router.get("/:category/:subcategory", async (ctx, next) => {
    const leaderboards = await getLeaderboardsByCategoryAndSubCategory(ctx.params.category, ctx.params.subcategory);
    ctx.status = 200;
    ctx.body = leaderboards;
    await next();
});

router.post("/submit", validateSchema(submitBody, "body"), async (ctx, next) => {
    const { category, subCategory, time, evidence } = ctx.request.body as SubmitBody<typeof ctx.request.body.category>;

    const username = ctx.session?.user ? (await findUser("id", ctx.session.user))!.username : ctx.request.body.username;

    const userHasAccount = !!ctx.session?.user;

    const resp = await addScore(category, subCategory, time, evidence, userHasAccount, username);

    if (!resp) {
        throw new HttpError(400, "Your solve does not beat your current record");
    }

    ctx.status = 200;
    ctx.body = {
        message: "Successfully submitted solve"
    };

    await next();
});

export default router.routes();
