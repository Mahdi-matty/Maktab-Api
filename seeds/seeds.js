const {Student, Subject, Teacher, Notes} = require ('../models')
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
        title: `Full-Stack Developer`,
        level: 2
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

const notesData =[
    {
        title: 'Higher-order functions',
        content: `In Javascript, functions can be assigned to variables in the same way that strings or arrays can.
        They can be passed into other functions as parameters or returned from them as well.
         A “higher-order function” is a function that accepts functions as parameters and/or returns a function.
         `,
         questions: [
            {
                questionText: 'name some higher-order functions?',
                questiontype: 'Basic'
            },
            {
                questionText: 'is Reduce a higher-order function?',
                questiontype: 'Example'
            }
         ]

    },
    {
        title: 'RESTful API',
        content: `RESTful API is an interface that two computer systems use to exchange information securely over the internet.
         Most business applications have to communicate with other internal and third-party applications to perform various tasks.
          For example, to generate monthly payslips,
         your internal accounts system has to share data with your customer's banking system to automate invoicing and communicate with an internal timesheet application.
          RESTful APIs support this information exchange because they follow secure, reliable, and efficient software communication standards.
          `,
          questions: [
            {
                questionText: 'What are the benefits of RESTful APIs?',
                questiontype: 'Basic'
            },
            {
                questionText: 'What does the RESTful API client request contain?',
                questiontype: 'Basic'
            }

          ]
    }
]

const seedMe = async ()=>{
    await sequelize.sync({ force: true });
    const dbStudents = await Student.bulkCreate(studentData);
    const dbSubjects = await Subject.bulkCreate(subjectData);
    const dbTeachers = await Teacher.bulkCreate(teacherData);
    const dbNotes= await Notes.bulkCreate(notesData);


    await dbTeachers[0].addSubjects([1, 2]); 
    await dbTeachers[1].addSubject([3, 0]); 
    await dbSubjects[0].addNotes([1, 2]);


    console.log(`Seeding completed`);
    process.exit(0)
}

seedMe();