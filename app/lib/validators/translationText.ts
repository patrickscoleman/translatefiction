import { z } from "zod";

export const TranslationTextSchema = z.object({
  id: z.string(),
  isSource: z.boolean(),
  text: z.string(),
});

// array validator
export const TranslationTextArraySchema = z.array(TranslationTextSchema);

export type TranslationText = z.infer<typeof TranslationTextSchema>;
