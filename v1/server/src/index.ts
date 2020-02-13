import express from "express";
import bodyParser from "body-parser";
import { listings } from "./mock-db/listings";
import db from "./mock-db/db-public";
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
  const result = db.getListings();
  if (result.length) {
    res.send(result);
  } else {
    res.send("Sorry, nothing is available right now!");
  }
});

app.get("/favorites", (_req, res) => {
  const result = db.getFavorites();
  const responseMsg =
    result.length === 0 ? "You don't have any favorite listings yet!" : result;
  res.send(responseMsg);
});

app.get("/bookings", (_req, res) => {
  const result = db.getBookings();
  const responseMsg =
    result.length === 0 ? "None of the listings were booked!" : result;
  res.send(responseMsg);
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

  db.totalBookings.count++;

  const newBooking: Booking = {
    id: db.totalBookings.count.toString(),
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
