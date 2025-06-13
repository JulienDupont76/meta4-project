import fetchMapPins from '@/api/mapPins';
import { useQuery } from '@tanstack/react-query';

const useMapPins = () => {
  return useQuery({ queryKey: ['mapPins'], queryFn: fetchMapPins });
};
export default useMapPins;
