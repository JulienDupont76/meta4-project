import fetchFirebaseHardware from '@/api/hardware';
import { useQuery } from '@tanstack/react-query';

const useHardware = () => {
  return useQuery({
    queryKey: ['hardwareData'],
    queryFn: fetchFirebaseHardware,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });
};
export default useHardware;
