import mockOccupancy from '@/mock/occupancy.json';
import { FacilityOccupancyDTO, FacilityOccupancyDTOSchema } from '@/types/dto';

const fetchOccupancyData = async (id: number): Promise<FacilityOccupancyDTO> => {
  const json = mockOccupancy;

  const raw = json.find((item) => item.facilityId === id);

  try {
    return FacilityOccupancyDTOSchema.parse(raw);
  } catch (err) {
    console.error('Error parsing facility data:', err);
    throw new Error('Invalid map pins data');
  }
};

export default fetchOccupancyData;
