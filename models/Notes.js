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
      defaultValue: [],
      get(){
        const rawValue = this.getDataValue('questions');
        return rawValue? JSON.parse(rawValue): [];
      },
      Set(value) {
        this.setDataValue('questions', JSON.stringify(value));
      }
    }
   
},{
    sequelize, 
});
  
module.exports = Notes;