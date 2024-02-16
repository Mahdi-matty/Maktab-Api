const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Student = require('./Student')

class StudentFriend extends Model {}

StudentFriend.init(
  {
    // Define foreign keys referencing the Student model
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id'
      }
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: 'id'
      }
    }
  },
  {
    sequelize,
  }
);

module.exports = StudentFriend;