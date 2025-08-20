import { z } from "zod";

// Payload used by /api/cancel
export const cancelSchema = z.object({
  reason: z.string().nullable().optional(),
  lawyer: z.string().nullable().optional(),
  visa: z.string().nullable().optional(),
  accepted_downsell: z.boolean().optional(),
  // Send variant from client so it is persisted (server can't read localStorage)
  variant: z.enum(["A", "B"]).optional(),
});
