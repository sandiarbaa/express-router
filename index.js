const express = require("express");
const app = express();
// lib
const cookieParser = require("cookie-parser");
const session = require("express-session");

// define port
const port = 3000;
const secret = "secret-key";

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(
  // setup
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

// route cookies example
app.get("/signingcookie", (req, res) => {
  res.cookie("paket", "ransel", { signed: true });
  res.send("signing cookie");
});

app.get("/verifycookie", (req, res) => {
  const cookies = req.signedCookies;
  res.send(cookies);
});

app.get("/count", (req, res) => {
  // kalau ada session
  if (req.session.count) {
    // membuat variabel count gitu sih, isinya bebas, namanya juga ga harus count
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`count:${req.session.count}`);
});

app.get("/register", (req, res) => {
  const { username = "Anonim" } = req.query;
  req.session.username = username;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  res.send(`Welcome back ${req.session.username}`);
});

// define routes
app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
