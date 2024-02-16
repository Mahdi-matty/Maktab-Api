const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Teacher, Subject, Student, StudentSubject } = require(`../models`);
require('dotenv').config();



router.get("/",(req,res)=>{
     res.send(`Hi`)   
});

const studentRoutes = require('./studentRoutes');
router.use('/api/students', studentRoutes);

const teacherRoutes = require('./teacherRoutes');
router.use('/api/teachers', teacherRoutes);


const subjectRoutes = require(`./subjectRoutes`);
router.use(`/api/subjects`, subjectRoutes);

const StudentSubjectRoutes = require('./studentSubjectRoutes');
router.use('/api/studentsubjects', StudentSubjectRoutes)

module.exports = router;