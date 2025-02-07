import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { factory } from "./factory";
import { errorHandler } from "./middlewares";
import { customLogger, env } from "./shared";

const app = factory
  .createApp()
  // Middlewares -----------------------------------------------------------------
  .use(logger(customLogger))
  .use(prettyJSON())
  .use("*", cors()) // TODO: fix this
  .use("*", errorHandler)
  // -----------------------------------------------------------------------------
  // Routes ----------------------------------------------------------------------
  .get("/", (c) => {
    return c.text("OK");
  })
  .get("/health", (c) => {
    return c.text("OK");
  });
// -----------------------------------------------------------------------------

serve({
  fetch: app.fetch,
  port: env.port,
});

export default app;

export type AppRouteType = typeof app;
