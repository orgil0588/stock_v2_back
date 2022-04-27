module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "stock_financial_detail",

    {
      code: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      ticker: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      amount_current_assets: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      amount_non_current_assets: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_assets: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      short_term_liabilities: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      long_term_liabilities: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_liabilities: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ownership_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      sales_reveneu: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cost_sales: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_profit_loss: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      other_income_rigths_interest_rent_dividends: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cost_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      gain_loss: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      other_gain_loss: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      income_tax_expense: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      net_profit_loss_for_period: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      share_book_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_supply: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
    },
    {
      tableName: "stock_financial_detail",
      timestamps: false,
    }
  );
};
