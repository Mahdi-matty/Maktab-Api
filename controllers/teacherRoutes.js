const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Student, Subject, Teacher, StudentFriend} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection');
const { text } = require('body-parser');


router.get('/', (req, res)=>{
    Teacher.findAll((allteacher)=>{
        res.json(allteacher)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.post('/', (req, res)=>{
    Teacher.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then((newUser)=>{
        const token = jwt.sign({
            email:newUser.email,
            id:newUser.id,
            username: newUser.username
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            teacher: newUser
        })
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get('/:id', (req, res)=>{
    Teacher.findByPk(req.params.id,{
        include:[Subject]
    }).then((findteacher)=>{
        if(!findteacher){
            res.status(404).json({msg: 'no such a user'})
        }else{
            res.json(findteacher)
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', msg})
    })
})

router.put('/:id', (req, res)=>{
    Teacher.update({
        username: req.params.username,
        email: req.params.email,
        password: req.params.password
    },{
        where: {
            id: req.params.id
        }
    }).then((editedteahcer)=>{
        if(!editedteahcer){
            res.status(404).json('no such a user')
        }else{
            res.json(editedteahcer)
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', msg})
    })
})

router.delete('/:id', (req, res)=>{
    Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then((delteacher)=>{
        if(!delteacher){
            res.status(404).json('no such a user')
        }else{
            res.json(delteacher)
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', msg})
    })
})

router.post('/login', (req,res)=>{
    Teacher.findOne({
        where: {
            id: req.params.id
        }
    }).then((foundUser)=>{
        if(!foundUser || !bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login credentials"})
        };
        const token = jwt.sign({
            email:foundUser.email,
            id:foundUser.id,
            username: foundUser.username
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            teacher:foundUser
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get("/logged-user", withTokenAuth, (req, res) => {
    Teacher.findByPk(req.tokenData.id, {
        include: [Subject]
    }).then(dbStudent => {
        if (!dbStudent) {
            res.status(404).json({ msg: "no such student!!!!" })
        } else {
            res.json(dbStudent)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

router.get('/logOut', (req,res)=>{
    req.session.destroy((err)=>{
        if (err) {
            return res.status(500).json({ msg: 'Failed to logout' });
          }  
          // Clear the session token from a cookie or local storage
          res.clearCookie('sessionToken');  
          // Send a response indicating successful logout
          res.json({ msg: 'Logout successful' });
        });
    })

    module.exports= router