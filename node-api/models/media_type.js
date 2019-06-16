/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('media_type', {
    media_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'media_type',
    timestamps: false
  });
};
