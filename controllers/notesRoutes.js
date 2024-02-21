const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Student, Teacher, Subject, StudentSubject, Notes} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection');

router.get('/:id', withTokenAuth, (req, res)=>{
    const id = req.params.id;
    Notes.findByPk(id).then(findNote=>{
        if(!findNote){
            res.status(404).json('no such a note')
        }else {
            res.json(findNote)
        }
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error', error})
    })
})
router.get('/', withTokenAuth, (req, res)=>{
    Notes.findAll().then((allnotes)=>{
            res.json(allnotes)
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error', error})
    })
})

router.post('/', withTokenAuth, (req, res)=>{
    const {title, content, questions} = req.body
    Notes.create({
        title: title,
        content: content,
        questions: questions
    }).then(newnote=>{
        res.json(newnote)
    }).catch(error=>{
        res.status(500).json({msg: 'itnernal server eror', error})
    })
})

router.put('/:id', withTokenAuth, (req, res)=>{
    const id = req.params.id
    Notes.update({
        title: req.body.title,
        content: req.body.content,
        questions: req.body.questions
    },{
        where: {
            id: id

        }
    }).then(updatenote=>{
        if(!updatenote){
            res.status(404).json('something went wrong')
        }else{
            res.json(updatenote)
        }
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error', error})
    })

    
})

module.exports= router