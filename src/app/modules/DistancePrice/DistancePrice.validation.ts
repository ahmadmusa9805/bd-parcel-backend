import { z } from 'zod';

export const createDistancePriceValidationSchema = z.object({
  body: z.object({
      distancePrice: z.number()
  }),
});

export const updateDistancePriceValidationSchema = z.object({
  body: z.object({
      distancePrice: z.number().min(1).optional()
  }),
});
