const express = require("express");

const { getHeatmap } = require("../controller/stock_heatmap");

const router = express.Router();

router.route("/").get(getHeatmap);



module.exports = router;
