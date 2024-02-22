const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const { Teacher, Subject, Exam } = require(`../models`);
require('dotenv').config();


router.post('/', withTokenAuth, (req, res) => {
    Exam.findAll({
        where: {
            subjectId: req.body.subjectId
        }
    }).then(foundExams => {
        if (foundExams.length === 0) {
            Exam.create({
                questions: req.body.questions,
                subjectId: req.body.subjectId
            }).then(newExam => {
                res.json(newExam);
            }).catch(error => {
                res.status(500).json({ msg: 'Internal server error', error });
            });
        } else {
            res.status(400).json({ msg: 'Exam already exists for the subjectId' });
        }
    }).catch(error => {
        res.status(500).json({ msg: 'Internal server error', error });
    });
});

router.get('/subject/:subjectId', withTokenAuth, (req, res)=>{
    const subjectId = req.params.subjectId;
    Exam.findAll({
        where: {
            subjectId: subjectId
        }
    }).then(findexam=>{
        if(!findexam){
            res.status(404).json('no such a note')
        }else {
            res.json(findexam)
        }
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error', error})
    })
})

router.put('/:id', withTokenAuth, (req, res)=>{
    const id = req.params.id
    console.log(req.body)
    Exam.update({
        questions: req.body.questions,
        grade: req.body.grade
    },{
        where: {
            id: id

        }
    }).then(([rowsUpdated]) => { 
            if (rowsUpdated === 0) {
                res.status(404).json({ msg: 'No exam found for the given ID' });
            } else {
                return Exam.findByPk(id);
            }
        })
        .then((updatedExam) => {
            if (updatedExam) {
                res.json(updatedExam);
            }
        })
        .catch(error => {
            console.error('Error updating exam:', error);
            res.status(500).json({ msg: 'Internal server error', error });
        });
    });

router.delete('/:id', (req, res)=>{
    Exam.destroy({
        where: {
            id: req.params.id
        }
    }).then((delsub)=>{
        if(!delsub){
            res.status(404).json('no such a subject')
        }else{
            res.json(delsub)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

module.exports = router
