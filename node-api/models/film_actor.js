/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('film_actor', {
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    film_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'film_actor',
    timestamps: false
  });
};
