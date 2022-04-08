const { red } = require("colors");
const express = require("express");
const asyncHandler = require("express-async-handler");
const data = require("../data.json");
exports.createStockList = asyncHandler(async (req, res, next) => {
  data.map(e => {
    req.db.stock_list.create(e)
  })
  // const data = await req.db.stock_list.create(req.body);
  console.log(req.body)
  res.status(200).json({
    success: true,
    data: data,
  });
});
exports.getStockList = asyncHandler(async (req, res, next) => {
  const data = await req.db.stock_list.findAll();

  res.status(200).json({
    success: true,
    data: data,
  });
});
  