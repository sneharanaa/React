const mongoose = require('mongoose');
const connection = require('../db');

const adminschema = mongoose.Schema ( {
    adminname : {
        type : String ,
        require : true ,
        trim : true
    } ,
    contact : {
        type : Number ,
        require : true ,
        unique : true ,
        trim : true 
    } ,
    email : {
        type : String ,
        require : true ,
        unique : true ,
        trim : true 
    } ,
    password : {
        type : String ,
        require : true
    } ,
    /*users : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user'
    }] ,*/
    cards : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'card' ,
    }],
});

module.exports = mongoose.model('admin' , adminschema);