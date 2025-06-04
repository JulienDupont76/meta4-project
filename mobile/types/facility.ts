import { MaterialIcons } from '@expo/vector-icons';
import { z } from 'zod';

export const FacilityTypeSchema = z.enum(['restaurant', 'cafe', 'library']);
export type FacilityType = 'restaurant' | 'cafe' | 'library';

type FacilityInfo = {
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export const FacilityTypeIdMap: Record<FacilityType, number> = {
  restaurant: 1,
  cafe: 2,
  library: 3,
};

export const FacilityData: Record<FacilityType, FacilityInfo> = {
  restaurant: {
    color: '#FF7500',
    icon: 'restaurant',
  },
  cafe: {
    color: '#00B4A7',
    icon: 'local-cafe',
  },
  library: {
    color: '#FFB503',
    icon: 'menu-book',
  },
};
