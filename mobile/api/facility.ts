import { FacilityDTO, FacilityDTOSchema } from '@/types/dto';
import mockFacilities from '@/mock/facility.json';

const fetchFacilityData = async (id: number): Promise<FacilityDTO> => {
  //const res = await fetch(`${urlAPI}/api/mapPins`);
  //if (!res.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //const json = await res.json();

  const json = mockFacilities;

  const raw = json.find((item) => item.id === id);

  try {
    return FacilityDTOSchema.parse(raw);
  } catch (err) {
    console.error('Error parsing facility data:', err);
    throw new Error('Invalid map pins data');
  }
};

export default fetchFacilityData;
