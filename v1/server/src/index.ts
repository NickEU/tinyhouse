import express from "express";

const app = express();
const port = 8888;

const greeting = "Howdy pilgrim!";

app.get("/", (req, res) => {
  console.log(req.ip);
  res.send(greeting);
});

app.get("/norm", (_req, res) => {
  res.send("I like bananas. They're yellow.");
});

const a = 5,
  b = 7;

app.get("/math", (_req, res) => {
  res.send(`${a} + ${b} = ${a + b}`);
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
