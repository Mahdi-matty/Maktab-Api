const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Student, Teacher, Subject, StudentSubject} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')


router.post('/', withTokenAuth, (req, res) => {
    StudentSubject.create({
            studentId : req.body.studentId,
            subjectId: req.body.subjectId,
    }).then((studentsub) => {
            res.json(studentsub)
        }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

router.get('/:studentid', withTokenAuth, (req, res) => {
    const studentId = req.params.studentid;
    StudentSubject.findAll({
        where: {
            studentId: studentId,
        }
    })
    .then(studentsubs => {
        if (!studentsubs || studentsubs.length === 0) {
            return res.status(404).json({ msg: "No subjects found for the student" });
        }
        const subjectIds = studentsubs.map(studentsub => studentsub.subjectId);
        Subject.findAll({
            where: {
                id: subjectIds
            }
        })
        .then(subjects => {
            if (!subjects || subjects.length === 0) {
                return res.status(404).json({ msg: "No subjects found for the student" });
            }
            res.json(subjects);
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

router.get('/:studentid/:subjectid', withTokenAuth, (req, res) => {
    const { studentid, subjectid } = req.params;
    StudentSubject.findOne({
        where: {
            studentId: studentid,
            subjectId: subjectid
        }
    })
    .then(studentsub => {
        if (!studentsub) {
            return res.status(404).json({ msg: "Student-subject association not found" });
        }
        res.json(studentsub);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});

router.delete('/:studentid/:subjectid', withTokenAuth, (req, res) => {
    const { studentid, subjectid } = req.params;
    StudentSubject.destroy({
        where: {
            studentId: studentid,
            subjectId: subjectid
        }
    })
    .then(deletedCount => {
        if (deletedCount === 0) {
            return res.status(404).json({ msg: "Student-subject association not found" });
        }
        res.json({ msg: "Student-subject association deleted successfully" });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});

module.exports =router