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

router.put('/:id', withTokenAuth, async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    Exam.update({
        // questions: {
        //         questionText: req.body.questionText,
        //         questiontype: req.body.questiontype,
        //         answer: req.body.answer
        // },
        questions: req.body.questions,
        grade: req.body.grade
    },{
        where: {
            id : id
        }
    }).then(updatedexam=>{
        if(!updatedexam){
            res.status(404).json('no such a exam')
        }
        res.json(updatedexam)
    }).catch(error=>{
        res.status(500).json({msg: 'internal server error', error})
    })
})

    // try {
        
    //         const updatedQuestions = await Promise.all(req.body.map(async (questionData) => {
    //                     const updatedQuestion = await Exam.update({
    //                         questions: {
    //                             questionText: questionData.questionText,
    //                             questiontype: questionData.questiontype,
    //                             answer: questionData.answer
    //                         },
    //                         grade: req.body.grade
    //                     }, {
    //                         where: {
    //                             id: id 
    //                         }
    //                     });
    //                     return updatedQuestion;
    //                 }));

    //                 res.json(updatedQuestions);
    //             }
    //         catch (error) {
    //                 console.error('Error updating exam:', error);
    //                 res.status(500).json({ msg: 'Internal server error', error });
    //             }
    //     })
       

router.get('/:id', (req, res)=>{
        Exam.findByPk(req.params.id).then((findexam)=>{
            if(!findexam){
                res.status(404).json('no such a exam')
            }else{
                res.json(findexam)
            }
        }).catch((err)=>{
            res.status(500).json({msg: 'internal server error', err})
        })
    })

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
