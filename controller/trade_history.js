const express = require("express");
const asyncHandler = require("express-async-handler");
const data = require("../data.json");
const { datePatcher } = require("../utils/datePatcher");
exports.getTradeHistory = asyncHandler(async (req, res, next) => {
  const obj = await req.db.trade_history.findAll({
    where: { code: req.params.id },
  });

  const data = [];
  obj.map((e) => {
    data.push(e.dataValues);
  });

  res.status(200).json({
    success: true,
    data: datePatcher(data),
  });
});
