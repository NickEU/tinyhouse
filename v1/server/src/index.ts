import express from "express";
import { listings } from "./listings";

const app = express();
const port = 8888;

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

const a = 5,
  b = 7;

app.get("/math", (_req, res) => {
  res.send(`${a} + ${b} = ${a + b}`);
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
