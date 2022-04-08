const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getHeatmap = asyncHandler(async (req, res, next) => {
  const data = await req.db.sequelize.query(
    `SELECT * FROM goodsec_chart.stock_list as list
    INNER JOIN goodsec_chart.trade_history as th ON th.code = list.code
    WHERE th.id in (select max(h.id) from goodsec_chart.trade_history h group by h.code order by h.date desc)`
  );

  let mkcp = {
    a: "",
    b: "",
    c: "",
  };
  let a = 0;
  let b = 0;
  let c = 0;
  console.log(data);
  let arr = [];
  let parent = [
    {
      name: "Хувьцаат компани нэгдүгээр ангилал",
      pop: NaN,
      id: "A",
    },
    {
      name: "Хувьцаат компани хоёрдугаар ангилал",
      pop: NaN,
      id: "A",
    },
    {
      name: "Хувьцаат компани гуравдугаар ангилал",
      pop: NaN,
      id: "A",
    },
  ];

  // { name:  "Oceania", pop: NaN, id: "Oceania" },
  // { name:  "Afghanistan", pop:  35320445, id: "Afghanistan", parent: "Middle_East" },
  // parent.map((e) => {
  //   console.log();
  //   arr.push(e);
  // });
  // data[0].map((e) => {
  //   let obj = {
  //     name: e.ticker,
  //     pop: e.total_supply * e.close,
  //     id: e.ticker,
  //     parent: e.class,
  //   };
  //   arr.push(obj);
  // });
  data[0].map((e) => {
    let obj = {
      x: e.ticker,
      y: e.total_supply * e.close,
    };
    arr.push(obj);
  });

  res.status(200).json({
    success: true,
    data: arr,
    // detail: detail,
    // marketcap: mkcp,
  });
});
