
// REQUESTS TO GET, POST, PUT, DELETE MY-PRODUCE WILL GO HERE

// app.use('/plants/:season', (req, res) => { req.params.season })

const express = require('express');
const bodyParser = require('body-parser');

const {Produce} = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});

router.use(bodyParser.json());

// should i be getting each season by username??
router.get('/spring', jwtAuth, (req, res) => {
  return Produce
    .find({user: req.user.id})
    .then(function(produce) {
     	res.json(produce.map(produce => produce.serialize()));
    })
    .catch(function(err) {
     	console.error(err);
     	res.status(500).json({ error: 'something went terribly wrong' });
    });
});

module.exports = {router};