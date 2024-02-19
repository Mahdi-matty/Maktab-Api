require('dotenv').config();
const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary').v2
          
const Uploadpresetname = 'gglhamon'

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET 
  });


  router.get('/clcr', (req, res)=>{
    cloudinary.uploader.upload({
      url: req.body.url
    }).then(file=>{
      res.json(file)
    }).catch(error=>{
      console.log(error)
      res.status(500).json({msg: 'internal server error', error})
    })
  })




