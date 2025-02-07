import type { z } from "zod";

// biome-ignore lint/correctness/noUnusedVariables: そのうち使う
const parseEnv = <T extends z.ZodTypeAny>(
  schema: T,
  env: Record<string, unknown>,
): z.infer<T> => {
  const result = schema.safeParse(env);
  if (!result.success) {
    console.error(
      "Environment variable validation error:",
      result.error.format(),
    );
    throw new Error("Invalid environment variables");
  }
  return result.data;
};

export const env = {
  port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 8880,
};
