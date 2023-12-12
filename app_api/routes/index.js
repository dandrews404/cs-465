const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
  });

router 
    .route('/login')
    .post(authController.register);

router 
    .route('/register')
    .post(authController.login);

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;