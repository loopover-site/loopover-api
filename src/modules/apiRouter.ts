import Router from "./Router";

import authRouter from "./auth/router";

const router = new Router({ prefix: "/api" });

router.use(authRouter);

export default router.routes();
