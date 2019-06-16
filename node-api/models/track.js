/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('track', {
    track_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'album',
        key: 'album_id'
      }
    },
    media_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'media_type',
        key: 'media_type_id'
      }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genre',
        key: 'genre_id'
      }
    },
    composer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'track',
    timestamps: false
  });
};
