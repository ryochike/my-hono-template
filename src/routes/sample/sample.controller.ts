import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { factory } from "../../factory";
import { createResponse } from "../../shared";
import { getAllSamples, getSampleById } from "./sample.repository";

const sample = factory
  .createApp()
  .get("/", async (c) => {
    const sampleItems = await getAllSamples();
    return c.json(createResponse("OK", sampleItems));
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const sampleItem = await getSampleById(id);
      return c.json(createResponse("OK", sampleItem));
    },
  );

export { sample };
