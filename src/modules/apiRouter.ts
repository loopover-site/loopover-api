import Router from "./Router";

import authRouter from "./auth/router";
import leaderboardsRouter from "./leaderboards/router";

const router = new Router({ prefix: "/api" });

router.use(authRouter);
router.use(leaderboardsRouter);

export default router.routes();
