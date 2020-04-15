import * as Router from "koa-router";
import { getBase } from "../controller";

const router = new Router();

router.get('/', async (ctx, next) => {
    try {
        const results = await getBase();
        ctx.body = results;
    } catch (e) {
        ctx.body = e;
        ctx.status = 404
    }
    await next();
});

export default router;