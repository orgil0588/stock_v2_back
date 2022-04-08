const express = require("express");

const { getTradeHistory } = require("../controller/trade_history");

const router = express.Router();

router.route("/:id").get(getTradeHistory);


module.exports = router;
