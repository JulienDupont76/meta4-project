import { MapPin, MapPinSchema } from '@/types/dto';
import { z } from 'zod';
import mockPins from '@/mock/map.json';

const fetchMapPins = async (): Promise<MapPin[]> => {
  //const res = await fetch(`${urlAPI}/api/mapPins`);
  //if (!res.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //const json = await res.json();

  const json = mockPins;

  try {
    return z.array(MapPinSchema).parse(json);
  } catch (err) {
    console.error('Error parsing map pins data:', err);
    throw new Error('Invalid map pins data');
  }
};

export default fetchMapPins;
