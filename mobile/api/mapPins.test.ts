import { MapPinSchema } from '@/types/dto';
import fetchMapPins from './mapPins';

describe('fetchMapPins', () => {
  it('returns map pins when data is valid', async () => {
    const result = await fetchMapPins();
    // Validate the return matches the schema array
    expect(Array.isArray(result)).toBe(true);
    result.forEach((pin) => {
      expect(MapPinSchema.safeParse(pin).success).toBe(true);
    });
  });
});
