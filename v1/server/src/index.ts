import express from "express";
import bodyParser from "body-parser";
import { listings, doesListingExist, deleteListing } from "./listings";
import { totalBookings } from "./bookings";
import { Booking } from "./models/booking";
import { Listing } from "./models/listing";
import { userFavorites } from "./favorites";
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
  res.send(listings);
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
  const reqBodyId = req.body.id;
  if (reqBodyId !== undefined && doesListingExist(reqBodyId)) {
    const id = reqBodyId;
    let index;
    const result = userFavorites.find((el, idx) => {
      if (el === id) {
        index = idx;
        return true;
      }
    });
    if (result === undefined) {
      userFavorites.push(id);
    } else {
      if (index !== undefined) {
        userFavorites.splice(index, 1);
      }
    }
    res.send("Fav status changed!");
  } else {
    res.send(`Error! No listing with ID ${reqBodyId} was found`);
  }
  console.log(userFavorites);
});

app.post("/del-listing", (req, res) => {
  const id: string = req.body.id;
  const result: Listing | undefined = deleteListing(id);
  if (result) {
    res.send(result);
  } else {
    res.send(`Failed to delete listing with id: ${id}`);
  }
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
