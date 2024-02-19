const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Teacher, Subject, Student, Assignment, StudentSubject, Notification } = require(`../models`);
require('dotenv').config();


// router.get('/pendingassignment/:assignmentId', (req, res)=>{
//     const assignmentId = req.params.assignmentId
//     Assignment.findOne({
//         where: {
//             id: assignmentId
//         }
//     })
//     .then(assignment => {
//         if (!assignment) {
//             return res.status(404).json({ msg: "Assignment not found" });
//         }

//         const subjectId = assignment.subjectId;
//         console.log(subjectId)
//         StudentSubject.findAll({
//             where: {
//                 subjectId: subjectId
//             }
//         }) .then(students => {
//                     if (!students || students.length === 0) {
//                         return res.status(404).json({ msg: "No students found for the assignment" });
//                     }
//                     const notifications = students.map(student => {
//                         return {
//                             message: 'You have a pending assignment',
//                             studentId: student.id,
//                             assignmentId: assignmentId
//                         };
//                     });
//                     Notification.bulkCreate(notifications)
//                     .then(newNotifications => {
//                         res.status(200).json(newNotifications);
//                     })
//                     .catch(err => {
//                         console.error(err);
//                         res.status(500).json({ msg: "Error creating notifications" });
//                     });
//             })
//             .catch(err => {
//                 console.error(err);
//                 res.status(500).json({ msg: "Internal Server Error" });
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ msg: "Internal Server Error" });
//     });
//     });

router.post('/', withTokenAuth, (req, res) => {
   Notification.create({
    message: req.body.message,
    assignmentId: req.body.assignmentId,
   }).then(newNot=>{
    res.json(newNot)
   })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
    })

    router.get('/pendingassignment/:assignmentId', (req, res)=>{
        const assignmentId = req.params.assignmentId;
        Notification.findAll({
            where: {
                assignmentId: assignmentId
            }
        }).then(findNot=>{
            if(!findNot){
                res.status(404).json('no such a notification')
            }else {
                res.json(findNot)
            }
        }).catch(error=>{
            res.status(500).json({msg: 'internal server error', error})
        })
    })

    router.put('/finish/:id', withTokenAuth, (req, res)=>{
        const id = req.params.id
        Notification.update({
            message: req.body.message,
            status: req.body.status
        },{
            where : {
                id: id
            }
        }).then(updatedNot=>{
            if(!updatedNot){
                res.status(404).json('no such a assignment')
            }
            res.status(200).json(updatedNot)
        }).catch(err=>{
            console.log(err)
            res.status(500).json({msg: 'internal server error', err})
        })
    })

    module.exports = router