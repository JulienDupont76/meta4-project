import { z } from 'zod';

export const SensorDataDTOSchema = z.object({
  busy_score: z.number(),
  confidence_level: z.enum(['low', 'medium', 'high']),
  current_distance: z.number(),
  current_people: z.number().int().nonnegative(),
  detection_active: z.boolean(),
  predicted_wait_formatted: z.string(),
  predicted_wait_seconds: z.number().int().nonnegative(),
  queue_intensity: z.number(),
  sensor_occupied: z.boolean(),
  timestamp: z.string(),
});

export type SensorDataDTO = z.infer<typeof SensorDataDTOSchema>;
