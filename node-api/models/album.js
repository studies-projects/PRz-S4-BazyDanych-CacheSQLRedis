/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('album', {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artist',
        key: 'artist_id'
      }
    }
  }, {
    tableName: 'album',
    timestamps: false
  });
};
