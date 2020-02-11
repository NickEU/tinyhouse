import express from "express";

const app = express();
const port: number = 8888;

const greeting: string = "Howdy pilgrim!";

app.get("/", (req, res) => {
  console.log(req.ip);
  res.send(greeting);
});

app.get("/norm", (req, res) => {
  res.send("I like bananas. They're yellow.");
});

let a: number = 5,
  b: number = 7;

app.get("/math", (req, res) => {
  res.send(`${a} + ${b} = ${a + b}`);
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
