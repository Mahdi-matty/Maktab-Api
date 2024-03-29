const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Student, Teacher, Subject, StudentSubject, Notes} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')

router.get('/', (req,res)=>{
 Subject.findAll().then((allsubjects)=>{
    res.json(allsubjects)
 }).catch((err)=>{
    res.status(500).json({msg: 'internal server error', err})
 })
})

router.post('/', withTokenAuth,(req,res)=>{
    Subject.create({
        title: req.body.title,
        level: req.body.level
    }).then((newsubject)=>{
        res.json(newsubject)
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/:id', (req, res)=>{
    Subject.findByPk(req.params.id, {
        include: [Teacher, Student]
    }).then((findsubject)=>{
        if(!findsubject){
            res.status(404).json('no such a user')
        }else{
            res.json(findsubject)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.put('/:id', withTokenAuth, (req,res)=>{
    Subject.update({
        title: req.body.title,
        level: req.body.level,
        subjectPic: req.body.subjectPic
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedsub)=>{
        if(!updatedsub){
            res.status(404).json('no such a Subejct')
        }else{
            res.json(updatedsub)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', withTokenAuth, (req, res)=>{
    Subject.destroy({
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

router.get('/teacher-subjects/:teacherId', withTokenAuth, (req, res) => {
    Teacher.findByPk(req.params.teacherId, {
        include: [Subject]
    }).then(dbteacher => {
        if (!dbteacher) {
            res.status(404).json({ msg: "no such teacher!!!!" })
        } else {
            res.json(dbteacher.Subjects)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

router.get('/notes/:subjectId', withTokenAuth, (req, res)=>{
    const subjectId = req.params.subjectId ;
    console.log('params:', req.params)
    console.log(subjectId)
    Notes.findAll({
        where: {
            subjectId: subjectId
        }
    }).then(Note=>{
        if(!Note){
            res.status(404).json('no notes')
        }else {
            res.json(Note)
        }
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error'})
    })
})

router.get('/exam/:subjectId', withTokenAuth, (req, res)=>{
    const subjectId = req.params.subjectId ;
    Notes.findAll({
        where: {
            subjectId: subjectId
        }
    }).then(Notes=>{
        if(!Notes){
            res.status(404).json('no notes')
        }else {
            let allQuestions = [];
            Notes.forEach(note => {
                allQuestions = allQuestions.concat(note.questions);
            });
            res.json({ questions: allQuestions });
        }
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error', error})
    })
})



module.exports= router