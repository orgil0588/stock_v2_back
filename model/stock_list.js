module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "stock_list",

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

      company: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      class: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      circulating_supply: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      total_supply: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      industry: {
        type: DataTypes.STRING(150),
      },
      sector: {
        type: DataTypes.STRING(150),
      },
    },
    {
      tableName: "stock_list",
      timestamps: false,
    }
  );
};
