import { factory } from "../factory";
import { STATUS_STRING_AND_CODE, createResponse } from "../shared";

export const errorHandler = factory.createMiddleware(async (c, next) => {
  try {
    await next();
    // biome-ignore lint/suspicious/noExplicitAny: always have to be AppError in errors.ts
  } catch (error: any) {
    console.error("Unhandled error:", error);
    if (Object.keys(STATUS_STRING_AND_CODE).includes(error.statusString)) {
      return c.json(
        createResponse<null>(error.statusString, null, error?.message),
        STATUS_STRING_AND_CODE[
          error.statusString as keyof typeof STATUS_STRING_AND_CODE
        ],
      );
    }
    return c.json(
      createResponse<null>(
        "SERVER_ERROR",
        null,
        error?.errorMessage ?? "Internal Server Error",
      ),
      STATUS_STRING_AND_CODE.SERVER_ERROR,
    );
  }
});
