// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const removeUndefinedFromObj = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  );
};
