import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as cors from '@koa/cors';

import router from './routes';
import { promisify } from 'util';
import { startWorker } from "./worker";

const app = new Koa();
const listen = promisify(app.listen.bind(app))

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(cors());

// Routes
app.use(router.routes()).use(router.allowedMethods());

listen(8000)
    .then(_ => console.log(`server started with port 8000`))
    .then(_ => startWorker());
