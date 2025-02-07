import { Hono } from "hono";
import { errorHandler } from "../../middlewares";
import type { Env } from "../../types";

export const createTestApp = (
  route: Hono<Env>,
  basePath: string,
): Hono<Env> => {
  const app = new Hono<Env>();

  app.use("*", errorHandler);
  app.route(basePath, route);

  return app;
};
