const cheerio = require("cheerio");
const axios = require("axios");
const classLink = [
  "http://mse.mn/mn/companies_info/1/114",
  "http://mse.mn/mn/companies_info/2/168",
  "http://mse.mn/mn/companies_info/3/169",
];
const baseUrl = "http://mse.mn/mn/company/";

exports.stock_list_crawler = async (db) => {
  classLink.map((e) => {
    axios.get(e).then((res) => {
  

        
    //   const arr = [];
    //   const selector = "#ajaxTradeHistory > table > tbody > tr";
   
    });
  });
};
