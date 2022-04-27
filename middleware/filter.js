const { crawler } = require("./crawler");

exports.filter = async (db) => {
  const currentDate = new Date();
  setInterval(() => {
    if (
      currentDate.getDay() !== 6 &&
      currentDate.getDay() !== 0 &&
      currentDate.getHours() >= 8 &&
      currentDate.getHours() <= 16
    ) {
      crawler(db);
    }
  }, 60000);
};
