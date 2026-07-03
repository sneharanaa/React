const cors = require('cors');
const express = require('express');
const adminroute = require('./routes/adminroute');
const userroute = require('./routes/userroute');

const app = express();

app.use(express.json());
app.use(cors({
    origin : ["http://localhost:5173"] ,
    method : ["POST", "GET"] ,
    credentials : true
}));   

app.get('/' , cors() , (req , res) => {
    res.send("hello!");
});

app.use('/userroute' , userroute);
app.use('/adminroute' , adminroute);

app.listen(3000 , () => {
    console.log("server is runnig!");
})
