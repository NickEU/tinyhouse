import { Booking } from "../models/booking";
import { listings } from "./listings";
import { getTimestamp } from "../helpers";

export const createBooking = function(id: string): boolean {
  let index: number | undefined;

  const chosenListing = listings.find((el, idx) => {
    if (el.id === id) {
      index = idx;
      return true;
    }
  });

  if (!chosenListing) {
    return false;
  }

  totalBookings.count++;

  const newBooking: Booking = {
    id: totalBookings.count.toString(),
    title: chosenListing.title,
    image: chosenListing.image,
    address: chosenListing.address,
    timestamp: getTimestamp()
  };

  if (index !== undefined) {
    console.log(listings[index]);
    listings[index].bookings.push(newBooking);
    return true;
  } else {
    console.log(
      "Oops! Not supposed to reach this. Something went horribly wrong!"
    );
    return false;
  }
};

export const getBookings = function(): Booking[] {
  const listingsWithBookings = listings.filter(
    item => item.bookings.length > 0
  );
  const bookingsArrays = listingsWithBookings.map(item => item.bookings);
  const result: Booking[] = [];
  bookingsArrays.forEach(bookings => {
    bookings.forEach(booking => {
      result.push(booking);
    });
  });

  console.log(getTimestamp());
  return result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
};

export const totalBookings = {
  count: 0
};
