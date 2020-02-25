import express from "express";
import bodyParser from "body-parser";
import db from "./mock-db/db-public";
import { Listing } from "./models/listing";

const app = express();
const port = process.env.PORT || 3333;

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
  const responseMsg =
    result.length === 0 ? "Sorry, nothing is available right now!" : result;
  res.send(responseMsg);
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
  if (db.createBooking(id)) {
    res.send("The booking was successfully added!");
  } else {
    res.send("Error! Wrong ID or listing is not available.");
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
