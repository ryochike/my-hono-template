import dayjs from "dayjs";

export const customLogger = (tag: string, ...rest: unknown[]) => {
  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(now, tag, JSON.stringify(rest, null, 2));
};
