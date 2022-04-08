const express = require("express");

const { createStockList, getStockList } = require("../controller/stock_list");

const router = express.Router();

router.route("/stock-list").get(createStockList);
router.route("/get-stock-list").get(getStockList);

module.exports = router;
