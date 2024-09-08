const express = require("express");
const router = express.Router();

// middleware ini hanya akan bekerja di route admin ini
// karena dia di definisikan di route ini saja
// route lain tidak terkena dampaknya
router.use((req, res, next) => {
  if (req.query.isAdmin) {
    next();
  }
  res.send("you are not an admin");
});

router.get("/", (req, res) => {
  // data cookies ini bisa dimanfaatkan di berbagai page dari si websitenya itu sendiri dengan 1 kali akses
  // membuat cookies bisa lebih dari 1, dan dibuatnya harus wajib sebelum respon misal:send, render
  // datanya akan hilang kalau melakukan clear cache/cookies
  res.cookie("token", "1234567890abcd");
  res.cookie("user", "admin");
  res.send("administrator");
});

module.exports = router;
