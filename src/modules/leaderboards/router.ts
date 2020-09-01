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
import videoEvidenceThreshold from "./actions/videoEvidenceThreshold";
import { requireAdmin } from "../auth/middleware/requireAdmin";
import verifySolve from "./actions/verifySolve";
import getQueue from "./actions/getQueue";

const router = new Router({ prefix: "/leaderboards" });

router.get("/", async (ctx, next) => {
    const leaderboards = await getLeaderboards();
    ctx.status = 200;
    ctx.body = leaderboards;
    await next();
});

router.get("/queue", async (ctx) => {
    const queue = await getQueue();
    ctx.status = 200;
    ctx.body = queue;
    // await next(); Not sure why this breaks stuff, but it does.
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

router.get("/videoThreshold/:category/:subcategory", async (ctx, next) => {
    const threshold = await videoEvidenceThreshold(ctx.params.category, ctx.params.subcategory);
    ctx.status = 200;
    ctx.body = {
        place: threshold
    };
    await next();
});

router.post("/submit", validateSchema(submitBody, "body"), async (ctx, next) => {
    const { category, subCategory, time, evidence } = ctx.request.body as SubmitBody<typeof ctx.request.body.category>;

    const notes = ctx.request.body.notes || "";

    const username = ctx.session?.user ? (await findUser("id", ctx.session.user))!.username : ctx.request.body.username;

    const userHasAccount = !!ctx.session?.user;

    const resp = await addScore(category, subCategory, time, evidence, userHasAccount, username, notes);

    if (!resp) {
        throw new HttpError(400, "Your solve does not beat your current record");
    }

    ctx.status = 200;
    ctx.body = {
        message: "Successfully submitted solve"
    };

    await next();
});

router.patch("/verify", requireAdmin(), async (ctx, next) => {
    const { id } = ctx.request.body;
    const resp = await verifySolve(id);
    if (!resp) {
        throw new HttpError(400, "That solve cannot be verified!");
    }
    ctx.status = 200;
    ctx.body = "Successfully verified solve";
    await next();
});

export default router.routes();
