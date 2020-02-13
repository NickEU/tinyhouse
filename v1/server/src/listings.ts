import { Listing } from "./models/listing";

export const listings: Listing[] = [
  {
    id: "001",
    title: "Clean and fully furnished apartment. 5 min away from CN Tower",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    price: 10000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 2,
    rating: 5,
    bookings: []
  },
  {
    id: "002",
    title: "Luxurious home with private pool",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
    address: "100 Hollywood Hills Dr, Los Angeles, California",
    price: 15000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 1,
    rating: 4,
    bookings: []
  },
  {
    id: "003",
    title: "Single bedroom located in the heart of downtown San Fransisco",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
    address: "200 Sunnyside Rd, San Fransisco, California",
    price: 25000,
    numOfGuests: 3,
    numOfBeds: 2,
    numOfBaths: 2,
    rating: 3,
    bookings: []
  }
];

export const doesListingExist = function(id: string): boolean {
  return listings.some(el => el.id === id) === true;
};

export const deleteListing = function(id: string): Listing | undefined {
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return listings.splice(i, 1)[0];
    }
  }
};
