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
  res.send("administrator");
});

module.exports = router;
