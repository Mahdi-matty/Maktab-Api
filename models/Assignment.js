const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Assignment extends Model { }

Assignment.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer : {
      type: DataTypes.STRING,
    },
    deadline: {
      type: DataTypes.DATE,
    }
   
},{
    sequelize, 
});
  
module.exports = Assignment;