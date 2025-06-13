import mockOccupancy from '@/mock/occupancy.json';
import { FacilityOccupancyDTOSchema } from '@/types/dto';
import fetchOccupancyData from './occupancy';

describe('fetchOccupancyData', () => {
  it('returns occupancy data for a valid facility id', async () => {
    const facilityId = mockOccupancy[0].facilityId;
    const result = await fetchOccupancyData(facilityId);

    expect(result).toBeDefined();
    expect(result.facilityId).toBe(facilityId);

    // Validate the result matches the schema
    expect(FacilityOccupancyDTOSchema.safeParse(result).success).toBe(true);
  });

  it('throws error when data is missing for the given id', async () => {
    // Use an id that does not exist in the mock data
    const invalidId = 999999;

    await expect(fetchOccupancyData(invalidId)).rejects.toThrow('Invalid map pins data');
  });
});
