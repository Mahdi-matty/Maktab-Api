const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Notes extends Model { }

Notes.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    },
    questions : {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
        }
   
},{
    sequelize, 
});
  
module.exports = Notes;