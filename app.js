import { Application, viewEngine, engineFactory, adapterFactory, Session, oakCors } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';

const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();

app.use(session.use()(session));

app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.serveStaticFilesMiddleware);
app.use(middleware.checkIfAuthNeededMiddleware);

app.use(oakCors());

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));


app.use(router.routes());


app.listen({ port: 7777 });


export { app };