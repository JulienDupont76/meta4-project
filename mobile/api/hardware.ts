import { firebaseAPI } from '@/constants/API';
import { SensorDataDTO, SensorDataDTOSchema } from '@/types/dto';

const fetchFirebaseHardware = async (): Promise<SensorDataDTO> => {
  console.log('Fetching hardware data from Firebase');
  const res = await fetch(`${firebaseAPI}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await res.json();

  try {
    const result = SensorDataDTOSchema.safeParse(json);

    if (!result.success) {
      console.error('Error parsing Firebase hardware data:', result.error);
      throw new Error('Invalid hardware data from Firebase');
    }
    return result.data;
  } catch (err) {
    console.error('Error parsing Firebase hardware data:', err);
    throw new Error('Invalid hardware data from Firebase');
  }
};

export default fetchFirebaseHardware;
