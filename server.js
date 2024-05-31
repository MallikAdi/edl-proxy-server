const express = require("express");
const request = require("request");
const app = express();

// Respond with "Hi" when accessing the root URL
app.get("/", (req, res) => {
  res.send("Hi there!");
});

// Proxy all other requests
app.use((req, res) => {
  const url = `https://www.irflabs.in${req.url}`;
  req.pipe(request(url)).pipe(res);
});

app.listen(3001, () => {
  console.log("Proxy server is running on port 3001");
});
