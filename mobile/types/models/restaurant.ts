export type RestaurantData = {
  name: string;
  type: string;
  status: 'Open' | 'Closed';
  openingTime: string;
  rating: number;
  reviews: number;
  address: string;
  images: ReturnType<typeof require>[];
};

export interface Restaurant {
  id: string;
  name: string;
  category: 'restaurant' | 'cafe' | 'library';
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  address: string;
  images: string[];
}
