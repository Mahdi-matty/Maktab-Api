const Teacher = require('./Teacher')
const Student = require('./Student')
const Subject = require('./Subject')
const StudentFriend = require('./StudentFriend')


Student.belongsToMany(Student, { through: StudentFriend, as: 'friends' })
Student.hasMany(Teacher)
Student.hasMany(Subject)


Teacher.hasMany(Subject)
Teacher.hasMany(Student)

Subject.hasOne(Teacher)
Subject.hasMany(Student)

module.exports= {
    Subject,
    Student,
    Teacher,
    StudentFriend
}