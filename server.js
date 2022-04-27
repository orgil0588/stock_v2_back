const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
const injectDb = require("./middleware/injectDb");
const { filter } = require("./middleware/filter");
// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });

const db = require("./config/db");
const stockListRoutes = require("./routes/stock_list");
const tradeHistoryRoutes = require("./routes/trade_history");
const stockInfoRoutes = require("./routes/stock_info");
const stockHeatmap = require("./routes/stock_heatmap");
const stockFinancialDetail = require("./routes/stock_financial_detail");

const app = express();

// Body parser
app.use(express.json());
app.use(injectDb(db));
app.use(errorHandler);
app.use("/api/v1/mse", stockListRoutes);
app.use("/api/v1/trade-history", tradeHistoryRoutes);
app.use("/api/v1/stock-info", stockInfoRoutes);
app.use("/api/v1/stock-heatmap", stockHeatmap);
app.use("/api/v1/stock-financial-detail", stockFinancialDetail);

filter(db);


db.sequelize
  .sync()
  .then((result) => {
    console.log("sync hiigdlee...");
  })
  .catch((err) => console.log(err));

app.listen(
  process.env.PORT,
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `.rainbow)
);


process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`.underline.red.bold);
});
