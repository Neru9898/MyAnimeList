const express = require("express");
const event = require("events");
const app = express();
const port = 3000;
const cust = new event();

cust.on("response", () => {
  console.log(`Yuur`);
});
cust.on("response", () => {
  console.log(`Yuur111`);
});
cust.on("response", () => {
  console.log(`Yuur222`);
});
cust.emit("response");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
