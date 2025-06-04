export function convertToRestaurant(dto: RestaurantDTO): Restaurant {
  return {
    id: crypto.randomUUID(), // or from DTO if present
    name: dto.name,
    category: mapTypeToCategory(dto.type),
    isOpen: dto.status === 'Open',
    rating: dto.rating,
    reviewCount: dto.reviews,
    address: dto.address,
    images: dto.imageUrls,
  };
}
