const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.MONGO_URL

const connection = mongoose.connect(url)
    .then(() => {
        console.log("Connected with database!");
    })
    .catch((e) => {
        console.log(e);
    })

module.exports = connection;