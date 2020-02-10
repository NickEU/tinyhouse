const express = require("express");

const app = express();
const port = 8888;

app.get("/", (req, res) => {
  res.send("Howdy pilgrim!");
});

app.get("/norm", (req, res) => {
  res.send("I like bananas. They're yellow.");
});

let a = 5,
  b = 7;

app.get("/math", (req, res) => {
  res.send(`${a} + ${b} = ${a + b}`);
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
