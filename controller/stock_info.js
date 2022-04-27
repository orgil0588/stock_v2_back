const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getStockInfo = asyncHandler(async (req, res, next) => {
  const data = await req.db.sequelize.query(
    `SELECT * FROM goodsec_chart.stock_financial_info as info
    INNER JOIN goodsec_chart.trade_history as th ON th.code = info.code
    INNER JOIN goodsec_chart.stock_list as ls ON th.code = ls.code
    WHERE th.id in (select max(h.id) from goodsec_chart.trade_history h group by h.code order by h.date desc)`
  );

  let result = [];
  data[0].map((el) => {
    let roa = (el.net_profit_loss_for_period * 1000) / el.total_assets;
    let roe = (el.net_profit_loss_for_period * 1000) / el.ownership_amount;
    let eps = (el.net_profit_loss_for_period * 1000) / el.total_supply;
    let pe =
      el.close / ((el.net_profit_loss_for_period * 1000) / el.total_supply);

    let obj = {
      name: el.company,
      code: el.code,
      ticker: el.ticker,
      close: el.close,
      change: el.change,
      industry: el.industry,
      sector: el.sector,
      market_cap: (el.total_supply * el.close).toLocaleString(),
      roa: `${parseFloat(
        roa.toString().slice(0, roa.toString().indexOf(".") + 2)
      )}`,
      roe: `${parseFloat(
        roe.toString().slice(0, roe.toString().indexOf(".") + 2)
      )}`,
      eps: `${parseFloat(
        eps.toString().slice(0, eps.toString().indexOf(".") + 2)
      )}`,
      pe: `${parseFloat(
        pe.toString().slice(0, pe.toString().indexOf(".") + 2)
      )}`,
    };

    result.push(obj);
  });

  res.status(200).json({
    success: true,
    data: result.sort(function (a, b) {
      return b.market_cap - a.market_cap;
    }),
    // data: data,
  });
});

exports.getStockById = asyncHandler(async (req, res, next) => {
  const data = await req.db.sequelize.query(
    `SELECT * FROM goodsec_chart.stock_financial_info as info
    INNER JOIN goodsec_chart.trade_history as th ON th.code = info.code
    INNER JOIN goodsec_chart.stock_list as ls ON th.code = ls.code
    WHERE th.id in (select max(h.id) from goodsec_chart.trade_history h group by h.code order by h.date desc)`
  );
  const history = await req.db.trade_history.findAll({
    where: { code: req.params.id },
  });

  const historyArr = [];
  history.map((e) => {
    let obj = {
      time: e.dataValues.date,
      value: e.dataValues.close,
    };
    historyArr.push(obj);
  });

  const result = data[0].filter((el) => el.code === parseInt(req.params.id));

  let roa =
    (result[0].net_profit_loss_for_period * 1000) / result[0].total_assets;
  let roe =
    (result[0].net_profit_loss_for_period * 1000) / result[0].ownership_amount;
  let eps =
    (result[0].net_profit_loss_for_period * 1000) / result[0].total_supply;
  let pe =
    result[0].close /
    ((result[0].net_profit_loss_for_period * 1000) / result[0].total_supply);
  result[0]["roa"] = `${parseFloat(
    roa.toString().slice(0, roa.toString().indexOf(".") + 2)
  )}`;
  result[0]["roe"] = `${parseFloat(
    roe.toString().slice(0, roe.toString().indexOf(".") + 2)
  )}`;
  result[0]["eps"] = `${parseFloat(
    eps.toString().slice(0, eps.toString().indexOf(".") + 2)
  )}`;
  result[0]["pe"] = `${parseFloat(
    pe.toString().slice(0, pe.toString().indexOf(".") + 2)
  )}`;
 
  res.status(200).json({
    success: true,
    data: result[0],
    history: historyArr,
  });
});
