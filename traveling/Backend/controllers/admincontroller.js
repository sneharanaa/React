const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const adminmodel = require('../models/admin');
const cardmodel = require('../models/card');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { resolveInclude } = require('ejs');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


const adminsignup = async (req , res) => {
    let {adminname , contact , email , password} = req.body;
    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password , salt , async(err , hash) => {
            const admin = await adminmodel.create({
                adminname ,
                contact ,
                email ,
                password : hash ,
            });
             let token = jwt.sign(
                {email : email , adminid : admin._id} ,
                process.env.ADMIN_S_KEY
             );
             await admin.save();
             res.cookie("token" , token);
             res.json({status : true , message : "admin registerd."})
        })
    })
};

const adminlogin = async (req , res) => {
    let {adminname , password} = req.body;
    const admin = await adminmodel.findOne({
        adminname ,
    });
    if(!admin) {
        return res.status(400).send("adminname or password are incorrect!");
    }
    bcrypt.compare(password , admin.password , (err , result) => {
        if(result) {
            let token = jwt.sign(
                {
                    adminname : adminname ,
                    adminid : admin._id
                } ,
                process.env.ADMIN_S_KEY
            );
            res.cookie("token" , token);
            return res.json({status : true , message : "login successfully!"});
        }
        else {
            res.send("email and password are wrong!");
        }
    })
};
const additems = async (req, res) => {
    let {
      poster,
      placename,
      days,
      mode,
      charge,
      description,
      date,
      todate,
      backgroundimg,
      country, 
      state, 
      city 
    } = req.body;
  
    if (!country || !state || !city) {
      return res.status(400).json({ status: false, message: "Country, state, and city are required." });
    }
  
    const fromDate = new Date(date);
    const toDate = new Date(todate);
  
    try {
      const card = await cardmodel.create({
        poster,
        placename,
        days,
        mode,
        charge,
        description,
        date: fromDate,
        todate: toDate,
        backgroundimg,
        country,
        state,
        city,
      });
      res.json({ card, status: true, message: "Data added!" });
    } catch (e) {
      console.error("Error adding item:", e);
      res.status(500).json({ status: false, message: "Server error while adding data" });
    }
  };  

const findcard = async (req , res) => {
    try {
        const card = await cardmodel.find();
        res.json(card);
    }
    catch(e) {
        console.log(e)
    }
};

const findcardDatevise = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to midnight to include today
  
      const cards = await cardmodel.find({
        date: { $gte: today } // Only fetch cards where date is today or later
      });
  
      res.json(cards);
    } catch (e) {
      console.error('Error fetching cards:', e);
      res.status(500).json({ message: 'Server error while fetching cards' });
    }
  };
  

const cardid = async (req , res) => {
    try {
        const card = await cardmodel.findById(req.params.id);
        if(!card) { 
            return res.status(404).json({message : "card not found"});
        }
        else {
            res.json(card);
        }
    }
    catch(e) {
        console.log(e);
    }
};

const updatecard = async (req, res) => {
    try {

      const { date, todate, ...updatedData } = req.body;
      updatedData.date = new Date(date);
      updatedData.todate = new Date(todate);
  
      const updatedCard = await cardmodel.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
  
      res.json(updatedCard);
    } catch (e) {
      res.status(500).json({ message: "server error" });
    }
  };
  
const deletecard = async (req , res) => {
    try {
        const card = await cardmodel.findByIdAndDelete(req.params.id);
        if(!card) {
            return res.status(404).json({ message : "Card not found!"});
        }
        res.status(200).json({message : "card deleted successfully"});
    }
    catch (e) {
        res.status(500).json({ message : "server error"});
    }
};

const adminlogout = async (req , res) => {
    try {
        res.clearCookie('token'); 
        res.status(200).json({ status: true, message: 'Logged out successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: 'Error during logout!' });
    }
};

module.exports = {
    adminsignup , 
    adminlogin , 
    additems , 
    findcard ,
    findcardDatevise ,
    cardid ,
    updatecard ,
    deletecard ,
    adminlogout ,
};

