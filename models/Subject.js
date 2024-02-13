const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Subject extends Model { }

Subject.init({
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
  
module.exports = Subject;