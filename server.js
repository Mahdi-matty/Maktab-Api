const express = require("express");
const router = express.Router();
const sequelize = require('./config/connection');
const bodyParser = require('body-parser');
const allRoutes = require('./controllers/');
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const cloudinary = require('cloudinary').v2

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


app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/`, allRoutes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});