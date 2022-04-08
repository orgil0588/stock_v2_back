const cheerio = require("cheerio");
const axios = require("axios");
const classLink = [
  "http://mse.mn/mn/companies_info/1/114",
  "http://mse.mn/mn/companies_info/2/168",
  "http://mse.mn/mn/companies_info/3/169",
];
const baseUrl = "http://mse.mn/mn/company/";

exports.fn = async (db) => {
  const obj = await db.stock_list.findAll();

  for (let i = 0; i < obj.length; i++) {
    await axios.get(`${baseUrl}${obj[i].dataValues.code}`).then((res) => {
      const $ = cheerio.load(res.data);
      const arr = [];
      const selector = "#ajaxTradeHistory > table > tbody > tr";

      $(selector).each((idx, ele) => {
        let selObj = {
          code: obj[i].dataValues.code,
          ticker: obj[i].dataValues.ticker,

          high: parseInt(
            $(
              `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                idx + 1
              }) > td:nth-child(2)`
            )
              .text()
              .split(",")
              .join("")
          ),
          low: parseInt(
            $(
              `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                idx + 1
              }) > td:nth-child(3)`
            )
              .text()
              .split(",")
              .join("")
          ),
          open: parseInt(
            $(
              `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                idx + 1
              }) > td:nth-child(4)`
            )
              .text()
              .split(",")
              .join("")
          ),
          close: parseInt(
            $(
              `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                idx + 1
              }) > td:nth-child(5)`
            )
              .text()
              .split(",")
              .join("")
          ),
          change:
            ((parseInt(
              $(
                `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                  idx + 1
                }) > td:nth-child(5)`
              )
                .text()
                .split(",")
                .join("")
            ) -
              parseInt(
                $(
                  `#ajaxTradeHistory > table > tbody > tr:nth-child(${idx}) > td:nth-child(5)`
                )
                  .text()
                  .split(",")
                  .join("")
              )) /
              parseInt(
                $(
                  `#ajaxTradeHistory > table > tbody > tr:nth-child(${idx}) > td:nth-child(5)`
                )
                  .text()
                  .split(",")
                  .join("")
              )) *
            100,
          volume: parseInt(
            $(
              `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                idx + 1
              }) > td:nth-child(6)`
            )
              .text()
              .split(",")
              .join("")
          ),
          volumePrice: parseInt(
            $(
              `#ajaxTradeHistory > table > tbody > tr:nth-child(${
                idx + 1
              }) > td:nth-child(7)`
            )
              .text()
              .split(",")
              .join("")
          ),
          date: $(
            `#ajaxTradeHistory > table > tbody > tr:nth-child(${
              idx + 1
            }) > td:nth-child(8)`
          ).text(),
        };
        db.trade_history.create({
          code: selObj.code,
          ticker: selObj.ticker,
          open: selObj.open,
          high: selObj.high,
          low: selObj.low,
          close: selObj.close,
          change: selObj.change,
          volume: selObj.volume,
          volumePrice: selObj.volumePrice,
          date: selObj.date,
        });
      });
    });
  }

  // await axios
  //   .get(`http://mse.mn/mn/trade_today/${}`)
};
