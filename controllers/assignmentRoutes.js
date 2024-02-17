const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Teacher, Subject, Student, Assignment, StudentSubject } = require(`../models`);
require('dotenv').config();

router.get('/', (req,res)=>{
    Assignment.findAll().then((AllAssign)=>{
       res.json(AllAssign)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
   router.post('/', withTokenAuth,(req,res)=>{
       Assignment.create({
           title: req.body.title,
           answer: req.body.answer,
           deadline: req.body.deadline,
           subjectId: req.body.subjectId
       }).then((newAssign)=>{
           res.json(newAssign)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   })
   
   router.get('/:id', withTokenAuth, (req, res)=>{
       Assignment.findByPk(req.params.id, {
           include: [Subject]
       }).then((findAssign)=>{
           if(!findAssign){
               res.status(404).json('no such an Assignment')
           }else{
               res.json(findAssign)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   })

   router.get('/student/:studentid', withTokenAuth, (req, res) => {
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
        Assignment.findAll({
            where: {
                subjectId: subjectIds
            }
        })
        .then(assignments => {
            if (!assignments || assignments.length === 0) {
                return res.status(404).json({ msg: "No assignments found for the student" });
            }
            res.json(assignments);
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

    router.put('/:id', withTokenAuth, (req,res)=>{
        Assignment.update({
            title: req.body.title,
            answer: req.body.answer,
            deadline: req.body.deadline,
            status: req.body.status
        },{
            where: {
                id: req.params.id
            }
        }).then((updatedassign)=>{
            if(!updatedassign){
                res.status(404).json('no such an assignment')
            }else{
                res.json(updatedassign)
            }
        }).catch((err)=>{
            res.status(500).json({msg: 'internal server error', err})
        })
    })

module.exports = router
