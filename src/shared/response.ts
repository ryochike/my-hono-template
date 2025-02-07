import { z } from "zod";
import { removeFields, toUnix } from "./serializer";

export const STATUS_STRING_AND_CODE_GENERAL = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST_ERROR: 400,
  VALIDATION_ERROR: 400,
  UNAUTHORIZED_ERROR: 401,
  ITEM_NOT_FOUND: 404,
  CONFLICTED_ERROR: 409,
  SERVER_ERROR: 500,
} as const;

export const STATUS_STRING_AND_CODE = {
  // ここにサービス固有のステータスを追加していく想定
  ...STATUS_STRING_AND_CODE_GENERAL,
} as const;

export const StatusEnum = z.enum(
  Object.keys(STATUS_STRING_AND_CODE) as [
    keyof typeof STATUS_STRING_AND_CODE,
    ...Array<keyof typeof STATUS_STRING_AND_CODE>,
  ],
);

export const createResponseBodySchema = <T extends z.ZodTypeAny>(
  resultSchema: T,
) =>
  z.object({
    status: StatusEnum,
    result: resultSchema.optional(),
    errorMessage: z.union([z.string(), z.record(z.any())]).optional(),
  });

export const ResponseBodySchema = z.object({
  status: StatusEnum,
  result: z.any().optional(),
  errorMessage: z.union([z.string(), z.record(z.any())]).optional(),
});

export type ResponseBody<T = unknown> = z.infer<typeof ResponseBodySchema>;

export function createResponse<T>(
  status: keyof typeof STATUS_STRING_AND_CODE,
  result: T | null,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  errorMessage?: string | Record<string, any>,
  excludeFields: string[] = [],
): ResponseBody<T> {
  const serialized = removeFields(toUnix(result), excludeFields);
  return {
    status,
    result: (serialized as T) || undefined,
    errorMessage,
  };
}
