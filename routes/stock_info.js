const express = require("express");

const { getStockInfo } = require("../controller/stock_info");

const router = express.Router();

router.route("/").get(getStockInfo);


module.exports = router;
