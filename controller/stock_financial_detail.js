const express = require("express");
const asyncHandler = require("express-async-handler");

exports.createStockFinancialDetails = asyncHandler(async (req, res, next) => {
  const detail = await req.db.stock_financial_detail.create(req.body);

  res.status(200).json({
    success: true,
    data: detail,
  });
});
exports.getStockFinancialDetails = asyncHandler(async (req, res, next) => {
  const detail = await req.db.sequelize.query(`
  SELECT * FROM goodsec_chart.stock_financial_detail where code = ${req.params.id} order by date desc limit 5
  `);
  let a = [];
  detail[0].map((e) => {
    let b = {
      details: Object.keys(e),
    };
    console.log(b);
  });
  res.status(200).json({
    success: true,
    data: detail[0],
  });
});
