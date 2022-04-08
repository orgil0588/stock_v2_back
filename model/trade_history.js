module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "trade_history",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      ticker: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },

      open: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      high: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      low: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      close: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      change: {
        type: DataTypes.FLOAT,
      },
      volume: {
        type: DataTypes.FLOAT,
      },
      volumePrice: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "trade_history",
      timestamps: false,
    }
  );
};
