const Teacher = require('./Teacher')
const Student = require('./Student')
const Subject = require('./Subject')
const StudentSubject =require('./StudentSubject')
const Assignment  = require('./Assignment')
const Notification =require('./Notification') 
const Notes = require('./Notes')



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

Subject.hasMany(Notes, {
  foreignKey: 'subjectId'
})

Notes.belongsTo(Subject, {
  foreignKey: 'subjectId'
});

Student.hasMany(Notification, {
  as: 'notifications',
  foreignKey: 'studentId'
})

Notification.belongsTo(Student, {
  foreignKey: 'studentId'
})

Assignment.hasOne(Notification,{
  foreignKey: 'assignmentId'
})

Notification.belongsTo(Assignment, {
  foreignKey: 'assignmentId'
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
    Assignment,
    Notification,
    Notes
}