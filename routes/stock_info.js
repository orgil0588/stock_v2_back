const express = require("express");

const { getStockInfo, getStockById } = require("../controller/stock_info");

const router = express.Router();

router.route("/").get(getStockInfo);
router.route("/:id").get(getStockById);

module.exports = router;
