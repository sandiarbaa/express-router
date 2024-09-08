const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); // install lib cookie-parser dulu karena req tidak bisa langsung membaca cookies

// define port
const port = 3000;

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// tambahkan string apapun untuk menjadi kata kunci, di sini contohnya 'secret-key'
// dia ini sebagai kata kunci untuk meng-enkripsi data dan berfungsi juga agar supaya dapat terbaca data yg di enkripsi tersebut
app.use(cookieParser("secret-key")); // secret-key ini untuk eknripsi data cookies nya, dan juga untuk membaca data yg di enkripsi nantinya
// ga harus secret-key bisa apa aja bebas, mau ditambahkan simbol atau key yg serumit mungkin

// route cookies example
app.get("/signingcookie", (req, res) => {
  // sign itu seperti menyegel atau memberikan penanda bahwa datanya itu aman, dan dari sumber yg terpercata
  // cookie nya bukan menjadikan di seperti enkripsi string acak
  res.cookie("paket", "ransel", { signed: true }); // param 1 name, param 2 cookie value // true, supaya datanya di enkripsi
  res.send("signing cookie");
});

// KARENA kita juga menggunakan key yg sama baik itu untuk meng-generate/mendapatkan cookienya
app.get("/verifycookie", (req, res) => {
  const cookies = req.signedCookies; // untuk mendapatkan cookie yg di enkripsi/sign
  res.send(cookies);
});

// define routes
app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
