const express = require("express");
const app = express();

// define port
const port = 3000;

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// define routes
app.use("/theater", require("./routes/theater")); // parameter 1 is the path, parameter 2 is the route
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
