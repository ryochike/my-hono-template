import { z } from "zod";

export const sampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export type SampleItem = z.infer<typeof sampleSchema>;
