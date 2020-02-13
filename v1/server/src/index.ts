import express from "express";
import bodyParser from "body-parser";
import * as db from "./listings-methods";
import { listings } from "./models/listings";
import { totalBookings } from "./bookings-methods";
import { Booking } from "./models/booking";
import { Listing } from "./models/listing";
import { userFavorites } from "./models/favorites";
import { getTimestamp } from "./helpers";

const app = express();
const port = 8888;

app.use(bodyParser.json());

app.get("/ip", (req, res) => {
  const greeting = "Howdy pilgrim!";

  let ip = req.ip;
  ip = ip.replace("::ffff:", "");
  ip = ip.replace("::1", "127.0.0.1");
  console.log(ip);

  res.send(`${greeting} Your IP is: ${ip}`);
});

app.get("/listings", (_req, res) => {
  const result = db.getListings();
  if (result.length) {
    res.send(result);
  } else {
    res.send("Sorry, nothing is available right now!");
  }
});

app.post("/create-booking", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  let index: number | undefined;

  const chosenListing = listings.find((el, idx) => {
    if (el.id === id) {
      index = idx;
      return true;
    }
  });

  if (!chosenListing) {
    res.send("Error! Wrong ID or listing is not available.");
    return;
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
    res.send("The booking was successfully added!");
  } else {
    console.log(
      "Oops! Not supposed to reach this. Something went horribly wrong!"
    );
  }
});

app.get("/bookings", (_req, res) => {
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

  if (result.length === 0) {
    res.send("None of the listings were booked!");
  } else {
    res.send(result.sort((a, b) => parseInt(a.id) - parseInt(b.id)));
  }
});

app.post(`/favorite-listing`, (req, res) => {
  const id = req.body.id;
  const result = db.favoriteListing(id);
  let responseMsg = `Error! No listing with ID ${id} was found`;
  if (result.success) {
    responseMsg = result.added
      ? `Listing with ID ${id} added to favorites!`
      : `Listing with ID ${id} removed from favorites!`;
  }
  res.send(responseMsg);
});

app.post("/del-listing", (req, res) => {
  const id: string = req.body.id;
  const result: Listing | undefined = db.deleteListing(id);
  if (result) {
    res.send(result);
  } else {
    res.send(`Failed to delete listing with id: ${id}`);
  }
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
