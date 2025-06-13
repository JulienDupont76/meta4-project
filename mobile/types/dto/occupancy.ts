import { z } from 'zod';

export const OccupancyLevelSchema = z.enum(['low', 'medium', 'high', 'closed']);

export const FacilityOccupancyDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  facilityId: z.number().int().nonnegative(),
  occupancyLevel: OccupancyLevelSchema,
  date: z.string(),
  waitingTime: z.number().int().nonnegative(),
});

export type FacilityOccupancyDTO = z.infer<typeof FacilityOccupancyDTOSchema>;
