import mockFacilities from '@/mock/facility.json';
import { FacilityDTOSchema } from '@/types/dto';
import fetchFacilityData from './facility';

describe('fetchFacilityData', () => {
  it('returns facility data for a valid id', async () => {
    const facilityId = mockFacilities[0].id;
    const result = await fetchFacilityData(facilityId);

    expect(result).toBeDefined();
    expect(result.id).toBe(facilityId);
    expect(FacilityDTOSchema.safeParse(result).success).toBe(true);
  });

  it('throws an error if facility data is missing for the given id', async () => {
    const invalidId = 999999;

    await expect(fetchFacilityData(invalidId)).rejects.toThrow('Invalid map pins data');
  });
});
