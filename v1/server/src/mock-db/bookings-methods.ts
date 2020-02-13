import { Booking } from "../models/booking";
import { listings } from "./listings";
import { getTimestamp } from "../helpers";

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
