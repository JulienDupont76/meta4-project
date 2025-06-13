import { z } from 'zod';
import { FacilityTypeSchema } from '../facility';

export const FacilityDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
  type: FacilityTypeSchema,
  status: z.enum(['Open', 'Closed']),
  openingTime: z.string(),
  rating: z.number().nonnegative().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  address: z.string(),
  images: z.array(z.string()),
});

export type FacilityDTO = z.infer<typeof FacilityDTOSchema>;
