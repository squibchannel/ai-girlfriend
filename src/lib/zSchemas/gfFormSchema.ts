import { z } from "zod";

export const gfConfigSchema = z.object({
  introduction: z.object({
    aiName: z.string().min(1),
    username: z.string().min(1),
  }),
  traits: z.array(z.string().min(1)),
  physical: z.object({
    hair: z.string().min(1),
    body: z.string().min(1),
    eyes: z.string().min(1),
    age: z.number().int().min(1),
  }),
});

export const chatConfigParamsSchema = z.object({
  temperature: z.number().int().min(0).optional(),
  max_tokens: z.number().int().min(0).optional(),
  presence_penalty: z.number().min(0).optional(),
  frequency_penalty: z.number().min(0).optional(),
  top_p: z.number().min(0).max(1).optional(),
  stop: z.union([z.string(), z.array(z.string())]).optional(),
  logit_bias: z.union([z.string(), z.array(z.string())]).optional(),
});

export const gfFormSchema = z.object({
  textModel: z.string().min(1),
  imgModel: z.string().min(1),
  defaultParams: chatConfigParamsSchema,
  gfConfig: gfConfigSchema,
});
