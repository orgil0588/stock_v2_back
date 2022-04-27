const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getHeatmap = asyncHandler(async (req, res, next) => {
  const industries = await req.db.sequelize.query(`
  SELECT DISTINCT industry FROM goodsec_chart.stock_list
  `);
  const data = await req.db.sequelize.query(
    `SELECT * FROM goodsec_chart.stock_list as list
    INNER JOIN goodsec_chart.trade_history as th ON th.code = list.code
    WHERE th.id in (select max(h.id) from goodsec_chart.trade_history h group by h.code order by h.date desc)`
  );
  const result = [];

  const date = new Date().toISOString().split("T")[0];
  industries[0].map((e) => {
    let obj = {
      name: e.industry,
      items: [],
    };
    data[0].map((el) => {
      if (el.industry === e.industry) {
        obj.items.push({
          name: el.ticker,
          company: el.company,
          change: el.date === date ? el.change : 0,
          value: el.total_supply * el.close,
        });
      }
    });
    result.push(obj);
  });

  res.status(200).json({
    success: true,
    data: result,
  });
});
