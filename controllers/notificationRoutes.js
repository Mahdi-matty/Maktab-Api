const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Teacher, Subject, Student, Assignment, StudentSubject } = require(`../models`);
require('dotenv').config();


router.get('/pendingassignment', (req, res)=>{
    StudentSubject.findAll({
        where: {
            subjectId: req.body.subjectId
        }
    }).then(studentsubs=>{
        if (!studentsubs || studentsubs.length === 0) {
            return res.status(404).json({ msg: "No subjects found for the student" });
        }
        const studentIds = studentsubs.map(studentsub => studentsub.studentId);
        Student.findAll({
            where: {
                id: subjectIds
            }
        }) .then(students => {
            if (!students || students.length === 0) {
                return res.status(404).json({ msg: "No students found for the student" });
            }
            res.json(student);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});