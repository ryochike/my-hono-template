import { hc } from "hono/client";
import type { AppRouteType } from "..";

type ClientType = typeof hc<AppRouteType>;

export const createClient = (
  ...args: Parameters<ClientType>
): ReturnType<ClientType> => {
  return hc<AppRouteType>(...args);
};
