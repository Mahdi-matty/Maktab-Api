const Teacher = require('./Teacher')
const Student = require('./Student')
const Subject = require('./Subject')
const StudentFriend = require('./StudentFriend')


Student.belongsToMany(Student, {
    through: StudentFriend,
    as: 'friends',
    foreignKey: 'studentId', 
    otherKey: 'friendId'  
  });
Student.hasMany(Teacher)
Student.belongsToMany(Subject, {
  through: 'studentsubject',
  foreignKey: 'studentSubject'
})


Teacher.hasMany(Subject)
Teacher.hasMany(Student)

Subject.hasOne(Teacher)
Subject.belongsToMany(Student, {
  through: 'studentsubject',
  foreignKey: 'studentSubject'
})

module.exports= {
    Subject,
    Student,
    Teacher,
    StudentFriend
}