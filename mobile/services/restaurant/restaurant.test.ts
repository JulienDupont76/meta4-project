// describe('convertToRestaurant', () => {
//   const fakeDto: RestaurantDTO = {
//     name: 'Bab1tol',
//     type: 'Korean food',
//     status: 'Closed',
//     openingTime: 'Opens at 11:40',
//     rating: 400,
//     reviews: 797,
//     address: 'Seoul, South Korea',
//     imageUrls: ['https://example.com/image1.jpg'],
//   };

//   it('should convert DTO to Restaurant model correctly', () => {
//     const restaurant = convertToRestaurant(fakeDto);

//     expect(restaurant.name).toBe('Bab1tol');
//     expect(restaurant.category).toBe('restaurant'); // depends on your `mapTypeToCategory` logic
//     expect(restaurant.isOpen).toBe(false);
//     expect(restaurant.rating).toBe(400);
//     expect(restaurant.reviewCount).toBe(797);
//     expect(restaurant.address).toBe('Seoul, South Korea');
//     expect(restaurant.images).toEqual(['https://example.com/image1.jpg']);
//   });
// });
