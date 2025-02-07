const isoDateRegex = /^\d{4}-\d{2}-\d{2}T.*$/;

export function toUnix(
  value: unknown,
): number | number[] | Record<string, number> {
  if (value instanceof Date) {
    return Math.floor(value.getTime() / 1000);
  }
  if (typeof value === "string" && isoDateRegex.test(value)) {
    const parsed = new Date(value);
    return Math.floor(parsed.getTime() / 1000);
  }
  if (Array.isArray(value)) {
    return value.map(toUnix) as number[];
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, toUnix(v)]),
    ) as Record<string, number>;
  }
  return value as number;
}

export function removeFields(obj: unknown, exclude: string[]): unknown {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => removeFields(item, exclude));
  }
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !exclude.includes(key))
      .map(([key, val]) => [key, removeFields(val, exclude)]),
  );
}
