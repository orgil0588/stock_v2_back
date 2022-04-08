const cheerio = require("cheerio");
const axios = require("axios");
const stock_list = require("../model/stock_list.js");
exports.crawler = async (db) => {
  console.log("CRAWLER");
  await axios
    .get("http://mse.mn/mn/trade_today/23")
    .then((res) => {
      const $ = cheerio.load(res.data);
      const arr = [];
      const classSelector = [
        ".table-responsive",
        "div.trade_table:nth-child(8) > table:nth-child(1)",
        "div.trade_table:nth-child(10) > table:nth-child(1)",
      ];

      for (let classIdx = 0; classIdx < classSelector.length; classIdx++) {
        const elSelector = `${classSelector[classIdx]} > tbody:nth-child(2) > tr`;

        $(elSelector).each((index, element) => {
          const ticker = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(1)`;
          const open = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(2)`;
          const high = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(3)`;
          const low = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(4)`;
          const current_val = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(5)`;
          const close = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(7)`;

          const change = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(9)`;
          const volume = `${
            classSelector[classIdx]
          } > tbody:nth-child(2) > tr:nth-child(${
            index + 1
          }) > td:nth-child(10)`;

          const code = parseInt(
            $(ticker + " > a")
              .attr("href")
              .split("/")[3]
          );

          let obj = {
            code: code,
            ticker: $(ticker).text(),
            open: parseFloat($(open).text()),
            high: parseFloat($(high).text()),
            low: parseFloat($(low).text()),
            currentVal: parseFloat($(current_val).text()),
            close: parseFloat($(close).text()),
            change: parseFloat($(change).text()),
            date: new Date().toISOString().split("T")[0],
            volume: parseFloat($(volume).text()),
          };
          arr.push(obj);
        });
      }

      calculator(arr, db);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.message);
        return err.message;
      }
    });
};

const calculator = async (arr, db) => {
  arr.map((e, i) => {
    db.trade_history
      .findOne({
        where: {
          code: e.code,
          date: e.date,
        },
      })
      .then((res) => {
        if (res === null) {
          db.trade_history.create({
            code: e.code,
            ticker: e.ticker,
            open: e.open,
            high: e.high,
            low: e.low,
            close: isNaN(e.close) ? e.currentVal : e.close,
            change: e.change,
            volume: e.volume,
            date: e.date,
          });
        }
        if (res) {
          db.trade_history.update(
            {
              open: e.open,
              high: e.high,
              low: e.low,
              close: isNaN(e.close) ? e.currentVal : e.close,
              change: e.change,
            },
            {
              where: {
                code: e.code,
              },
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);

        db.trade_history.create({
          code: e.code,
          ticker: e.ticker,
          open: e.open,
          high: e.high,
          low: e.low,
          close: isNaN(e.close) ? e.currentVal : e.close,
          change: e.change,
          date: e.date,
        });
      });
  });
};
