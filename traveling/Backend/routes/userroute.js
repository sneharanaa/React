const express = require('express');
const router = express.Router();

const {
    usersignup,
    userlogin,
    userbooking, 
    personid, 
    userlogout, 
    booking,
    cancelBooking ,
    sendOTP ,
    verifyOTP ,
    resetPassword ,
} = require('../controllers/usercontroller');
const { cardid } = require('../controllers/admincontroller');

router.post('/usersignup', usersignup);
router.post('/userlogin', userlogin);
router.post('/userlogout' , userlogout);
router.post('/userbooking', userbooking); 
router.get('/ticket/:id' , personid);
router.get('/booking/:id' , booking)
router.delete('/booking/:id', cancelBooking); 
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/resetPassword", resetPassword);

module.exports = router;
