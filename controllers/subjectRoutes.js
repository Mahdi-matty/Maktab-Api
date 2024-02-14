const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Student, Teacher, Subject} = require('../models');
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

router.put('/:id', (req,res)=>{
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

router.delete('/:id', (req, res)=>{
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

router.get("/student-subjects", withTokenAuth, (req, res) => {
    Student.findByPk(req.tokenData.id, {
        include: [Subject]
    }).then(dbStudent => {
        if (!dbStudent) {
            res.status(404).json({ msg: "no such student!!!!" })
        } else {
            res.json(dbStudent.Subjects)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

router.get("/teacher-subjects", withTokenAuth, (req, res) => {
    Teacher.findByPk(req.tokenData.id, {
        include: [Subject]
    }).then(dbStudent => {
        if (!dbStudent) {
            res.status(404).json({ msg: "no such teacher!!!!" })
        } else {
            res.json(dbStudent.Subjects)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

module.exports= router