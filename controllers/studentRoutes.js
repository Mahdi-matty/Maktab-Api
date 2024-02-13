const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Student, Subject, Teacher, StudentFriend} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')

router.get('/', (req, res)=>{
    Student.findAll().then(allStudent=>{
        res.json(allStudent)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:'internal server error', err})
    })
})

router.get('/:id', (req,res)=>{
    Student.findByPk(req.params.id, {
        include:[StudentFriend, Subject]
    }).then(studento=>{
        if(!studento){
            res.status(404).json({msg:'no such a user'})
        }else{
            res.json(studento)
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.post('/', (req, res)=>{
    Student.create({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
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
            student:newUser
        })
        res.json(newUser)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.put('/:id', (req, res)=>{
    Student.update({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    },{
        where: {
            id: req.params.id
        }
    }).then((editeduser)=>{
        if(!editeduser[0]){
            res.status(404).json({msg: 'no such a user'})
        }else{
            res.json(editeduser[0])
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', (req, res)=>{
    Student.destroy({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    },{
        where: {
            id: req.params.id
        }
    }).then((deleteeduser)=>{
        if(!deleteeduser){
            res.status(404).json({msg: 'no such a user'})
        }else {
            res.json(deleteeduser)
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.post('/login', (req,res)=>{
    Student.findOne({
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
            student:foundUser
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get("/logged-user", withTokenAuth, (req, res) => {
    Student.findByPk(req.tokenData.id, {
        include: [Subject, StudentFriend]
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