const express = require("express");

const {
  getStockFinancialDetails,
  createStockFinancialDetails,
} = require("../controller/stock_financial_detail");

const router = express.Router();

router.route("/:id").get(getStockFinancialDetails);
router.route("/").post(createStockFinancialDetails);

module.exports = router;
