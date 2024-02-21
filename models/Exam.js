const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Exam extends Model { }

Exam.init({
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
        max: 100
      }
    },
    questions : {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
        }
   
},{
    sequelize, 
});
  
module.exports = Exam;