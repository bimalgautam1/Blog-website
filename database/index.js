const mongoose = require('mongoose');
require('dotenv').config();

async function connecttodb(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connection Successful');
}

module.exports = connecttodb;
