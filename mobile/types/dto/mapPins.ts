import { z } from 'zod';
import { FacilityTypeSchema } from '../facility';

export const MapPinSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
  type: FacilityTypeSchema,
  latitude: z.number(),
  longitude: z.number(),
});

export type MapPin = z.infer<typeof MapPinSchema>;
