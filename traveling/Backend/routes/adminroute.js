const express = require('express');
const router = express.Router();

const {
    adminlogin ,
    adminsignup ,
    additems, 
    findcard,
    findcardDatevise ,
    cardid ,
    updatecard ,
    deletecard ,
    adminlogout ,
} = require('../controllers/admincontroller');

router.post('/adminsignup' , adminsignup);
router.post('/adminlogin' , adminlogin);
router.post('/additems' , additems);
router.get('/card' , findcard);
router.get('/cardsoftrip' , findcardDatevise)
router.get('/:id' , cardid);
router.put('/update/:id' , updatecard);
router.delete('/delete/:id' , deletecard);
router.post('/logout' , adminlogout);

module.exports = router;