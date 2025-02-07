import { customLogger } from "./customLogger";
import type { STATUS_STRING_AND_CODE } from "./response";

// 可能なエラーステータス文字列を文字列リテラルのユニオンとして定義
type StatusString = keyof typeof STATUS_STRING_AND_CODE;
export type ErrorStatusString = Omit<StatusString, "OK">;

// アプリケーションエラーの構造を定義
export interface AppError {
  statusString: ErrorStatusString;
  message?: string;
  details?: unknown;
}

// 特定のエラーステータス文字列を生成するファクトリ関数
/**
 * NotFoundError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns NotFoundError を表す AppError オブジェクト。
 */
export const createNotFoundError = (
  message?: string,
  details?: unknown,
): AppError => {
  customLogger("NotFoundError", message, details);
  return {
    statusString: "ITEM_NOT_FOUND",
    message,
    details,
  };
};

/**
 * ValidationError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns ValidationError を表す AppError オブジェクト。
 */
export const createValidationError = (
  message?: string,
  details?: unknown,
): AppError => {
  customLogger("ValidationError", message, details);
  return {
    statusString: "VALIDATION_ERROR",
    message,
    details,
  };
};

/**
 * DatabaseError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns DatabaseError を表す AppError オブジェクト。
 */
export const createDatabaseError = (
  message?: string,
  details?: unknown,
): AppError => ({
  statusString: "SERVER_ERROR",
  message,
  details,
});

/**
 * UnauthorizedError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns UnauthorizedError を表す AppError オブジェクト。
 */
export const createUnauthorizedError = (
  message?: string,
  details?: unknown,
): AppError => ({
  statusString: "UNAUTHORIZED_ERROR",
  message,
  details,
});

/**
 * BadRequestError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns BadRequestError を表す AppError オブジェクト。
 */
export const createBadRequestError = (
  message?: string,
  details?: unknown,
): AppError => ({
  statusString: "BAD_REQUEST_ERROR",
  message,
  details,
});

/**
 * UnknownError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns UnknownError を表す AppError オブジェクト。
 */
export const createUnknownError = (
  message?: string,
  details?: unknown,
): AppError => ({
  statusString: "SERVER_ERROR",
  message,
  details,
});

/**
 * ConflictedError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns ConflictedError を表す AppError オブジェクト。
 */
export const createConflictedError = (
  message?: string,
  details?: unknown,
): AppError => ({
  statusString: "CONFLICTED_ERROR",
  message,
  details,
});

/**
 * ForbiddenError を生成します。
 * @param message - エラーメッセージ。
 * @param details - 任意の追加情報。
 * @returns ForbiddenError を表す AppError オブジェクト。
 */
export const createForbiddenError = (
  message?: string,
  details?: unknown,
): AppError => ({
  statusString: "FORBIDDEN_ERROR",
  message,
  details,
});

// 実行時にエラーステータス文字列を識別するためのガード関数
/**
 * エラーが AppError であるかをチェックするための statusString ガード。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが AppError であれば true、そうでなければ false。
 */
export const isAppError = (error: unknown): error is AppError => {
  return typeof error === "object" &&
    error !== null &&
    "statusString" in error &&
    "message" in error
    ? // biome-ignore lint/suspicious/noExplicitAny: message プロパティが文字列であるかをチェックする必要がある
      typeof (error as any).message === "string"
    : true;
};

/**
 * エラーが NotFoundError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが NotFoundError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isNotFoundError = (error: any): error is AppError =>
  error && error.statusString === "ITEM_NOT_FOUND";

/**
 * エラーが ValidationError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが ValidationError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isValidationError = (error: any): error is AppError =>
  error && error.statusString === "VALIDATION_ERROR";

/**
 * エラーが DatabaseError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが DatabaseError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isDatabaseError = (error: any): error is AppError =>
  error && error.statusString === "SERVER_ERROR";

/**
 * エラーが UnauthorizedError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが UnauthorizedError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isUnauthorizedError = (error: any): error is AppError =>
  error && error.statusString === "UNAUTHORIZED_ERROR";

/**
 * エラーが BadRequestError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが BadRequestError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isBadRequestError = (error: any): error is AppError =>
  error && error.statusString === "BAD_REQUEST_ERROR";

/**
 * エラーが UnknownError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが UnknownError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isUnknownError = (error: any): error is AppError =>
  error && error.statusString === "SERVER_ERROR";

/**
 * エラーが ConflictedError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが ConflictedError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isConflictedError = (error: any): error is AppError =>
  error && error.statusString === "CONFLICTED_ERROR";

/**
 * エラーが ForbiddenError であるかをチェックします。
 * @param error - チェックするエラーオブジェクト。
 * @returns エラーが ForbiddenError であれば true、そうでなければ false。
 */
// biome-ignore lint/suspicious/noExplicitAny: エラーは任意の statusString を持つ可能性があるため、実行時チェックのために any を受け入れる必要があります。
export const isForbiddenError = (error: any): error is AppError =>
  error && error.statusString === "FORBIDDEN_ERROR";

export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceError";
  }
}
