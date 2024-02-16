const Teacher = require('./Teacher')
const Student = require('./Student')
const Subject = require('./Subject')
const StudentSubject =require('./StudentSubject')
const Assignment  = require('./Assignment')



Student.hasMany(Teacher)
Student.belongsToMany(Subject, {
  through: StudentSubject,
  foreignKey: 'stubjectId',
  otherKey: 'studentId'
})
Subject.belongsToMany(Student, {
  through: StudentSubject,
  foreignKey: 'studentId',
  otherKey: 'subjectId'
})

Subject.hasMany(Assignment, {
  as: 'assignments',
  foreignKey: 'subjectId'
})

Assignment.belongsTo(Subject, {
  foreignKey: 'subjectId'
})

Teacher.hasMany(Subject)
Teacher.hasMany(Student)

Subject.hasOne(Teacher)


module.exports= {
    Subject,
    Student,
    Teacher,
    StudentSubject,
    Assignment
}