/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice', {
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    billing_postal_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'invoice',
    timestamps: false
  });
};
