const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Teacher, Subject, Student, StudentSubject, Assignment } = require(`../models`);
require('dotenv').config();



router.get("/",(req,res)=>{
     res.send(`Hi`)   
});


// router.get('/clcr', (req, res)=>{
//      const cloudinary = {
//         cloud_name: process.env.CLOUDNAME,
//         api_key: process.env.APIKEY,
//         api_secret: process.env.APISECRET
//      }
//      res.json(cloudinary);
// })


const studentRoutes = require('./studentRoutes');
router.use('/api/students', studentRoutes);

const teacherRoutes = require('./teacherRoutes');
router.use('/api/teachers', teacherRoutes);


const subjectRoutes = require(`./subjectRoutes`);
router.use(`/api/subjects`, subjectRoutes);

const StudentSubjectRoutes = require('./studentSubjectRoutes');
router.use('/api/studentsubjects', StudentSubjectRoutes)


const AssignmentRoutes = require('./assignmentRoutes');
router.use('/api/assignments', AssignmentRoutes)

const NotificationRoutes= require('./notificationRoutes')
router.use('/api/notification', NotificationRoutes)

module.exports = router;