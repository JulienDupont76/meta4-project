import { useQuery } from '@tanstack/react-query';

import fetchFacilityData from '@/api/facility';

const useFacilityData = (id: number | null) => {
  return useQuery({
    queryKey: ['facility', id],
    queryFn: () => fetchFacilityData(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
};
export default useFacilityData;
