import Router from "./Router";

import authRouter from "./auth/router";
import leaderboardsRouter from "./leaderboards/router";
import usersRouter from "./users/router";

const router = new Router({ prefix: "/api" });

router.use(authRouter);
router.use(leaderboardsRouter);
router.use(usersRouter);

export default router.routes();
