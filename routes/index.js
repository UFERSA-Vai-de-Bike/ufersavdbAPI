const express = require("express");

const router = express.Router();

function present(req, res) {
  res.send("UFERSA Vai de Bike API");
}

router.get("/", present);

module.exports = router;
