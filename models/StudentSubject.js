const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Student = require('./Student');
const Subject = require('./Subject');

class StudentSubject extends Model {}

StudentSubject.init(
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
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: 'id'
      }
    }
  },
  {
    sequelize,
  }
);

module.exports = StudentSubject;