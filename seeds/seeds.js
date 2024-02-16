const {Student, Subject, Teacher, StudentFriend} = require ('../models')
const bcrypt = require("bcryptjs");


const sequelize = require ('../config/connection')

const studentData = [
    {
    username: `David`,
    password: `password`,
    email: `santiago1.dsrr@gmail.com`
    },
    {
    username: `Mahdi`,
    password: `password`,
    email: `mmiq69@gmail.com`
    },
    {
    username: `Morad`,
    password: `password`,
    email: `morad@gmail.com`
    },
    {
    username: `maral`,
    password: `password`,
    email: `maral@gmail.com`
    },
    {
    username: `shir`,
    password: `password`,            
    email: ` shir@gmail.com`
    },
];

for (let studentObj of studentData) {
    studentObj.password = bcrypt.hashSync(studentObj.password, 6)
};

const teacherData = [
    {
    username: `joe`,
    password: `password`,
    email: `joe@gmail.com`
    },
    {
    username: `ki`,
    password: `password`,
    email: `eki@gmail.com`
    },
];
for (let teacherObj of teacherData) {
    teacherObj.password = bcrypt.hashSync(teacherObj.password, 6)
};

const subjectData = [
    {
        title: `Full-Stack Developer`,
        level: 1
    },
    {
        title: `Coding Bootcamp`,
        level: 1
    },
    {
        title: `Pop-Culture`,
        level: 1
    },
];

const seedMe = async ()=>{
    await sequelize.sync({ force: false });
    const dbStudents = await Student.bulkCreate(studentData);
    const dbSubjects = await Subject.bulkCreate(subjectData);
    const dbTeachers = await Teacher.bulkCreate(teacherData);

    await dbTeachers[0].addSubjects([1, 3]); 
    await dbTeachers[1].addSubject([2]); 

    console.log(`Seeding completed :)`);
    process.exit(0)
}

seedMe();