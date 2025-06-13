import fetchOccupancyData from '@/api/occupancy';
import { useQuery } from '@tanstack/react-query';

const useOccupancy = (id: number) => {
  return useQuery({ queryKey: ['facilityOccupancy', id], queryFn: () => fetchOccupancyData(id) });
};
export default useOccupancy;
