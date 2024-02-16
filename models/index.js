const Teacher = require('./Teacher')
const Student = require('./Student')
const Subject = require('./Subject')
const StudentFriend = require('./StudentFriend')
const StudentSubject =require('./StudentSubject')


Student.belongsToMany(Student, {
    through: StudentFriend,
    as: 'friends',
    foreignKey: 'studentId', 
    otherKey: 'friendId'  
  });
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

Teacher.hasMany(Subject)
Teacher.hasMany(Student)

Subject.hasOne(Teacher)


module.exports= {
    Subject,
    Student,
    Teacher,
    StudentFriend,
    StudentSubject
}