const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class ClassRoom extends Model { }

ClassRoom.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
},{
    sequelize, 
});
  
module.exports = ClassRoom;