import express from "express";
import bodyParser from "body-parser";
import * as dbList from "./listings-methods";
import { listings } from "./models/listings";
import * as dbBook from "./bookings-methods";
import { Booking } from "./models/booking";
import { Listing } from "./models/listing";
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
  const result = dbList.getListings();
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

  dbBook.totalBookings.count++;

  const newBooking: Booking = {
    id: dbBook.totalBookings.count.toString(),
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
  const result = dbBook.getBookings();
  const responseMsg =
    result.length === 0 ? "None of the listings were booked!" : result;
  res.send(responseMsg);
});

app.post(`/favorite-listing`, (req, res) => {
  const id = req.body.id;
  const result = dbList.favoriteListing(id);
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
  const result: Listing | undefined = dbList.deleteListing(id);
  if (result) {
    res.send(result);
  } else {
    res.send(`Failed to delete listing with id: ${id}`);
  }
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
