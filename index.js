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
  request(url, (error, response, body) => {
    if (error) {
      res.status(500).send("Error fetching data from the target server.");
      return;
    }
    // Log the response body for debugging
    console.log("Response from target server:", body);
    res.send(body);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
