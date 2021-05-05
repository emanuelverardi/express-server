const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
require('dotenv').config();

const curriculumController = require('../controllers/curriculum');
const emailController = require('../controllers/email');

// MongoDB URL
const dbHost = process.env.mongoDbHost;

// Connect to mongodb
mongoose.connect(dbHost, { useNewUrlParser: true });

// create mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const experienceSchema = new mongoose.Schema({
    from: String,
    to: String,
    role: String,
    jobDescription: String,
    city: String,
    country: String
});

// create mongoose model
const User = mongoose.model('User', userSchema);
const Experience = mongoose.model('Experience', experienceSchema);



/* GET api listing. */
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('api works');
});

/* GET all users. */
router.get('/experience', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    Experience.find({}, (err, experience) => {
        if (err) res.status(500).send(err);
        res.status(200).json(experience);
    }).sort({ '_id': 1 });
});

/* GET all users. */
router.get('/send-mail', emailController.send);

/* GET all users. */
//router.get('/personal-details', curriculumController.getPersonalDetails);



/* GET all users. */
router.get('/users', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    User.find({}, (err, users) => {
        if (err) res.status(500).send(err);
        res.status(200).json(users);
    }).sort({ '_id': -1 });
});

/* GET one user. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(err);

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully1111'
        });
    });
});

module.exports = router;