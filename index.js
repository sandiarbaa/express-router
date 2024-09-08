const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); // install lib cookie-parser dulu karena req tidak bisa langsung membaca cookies

// define port
const port = 3000;

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // digunakan sebagai middleware

// define routes
app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
