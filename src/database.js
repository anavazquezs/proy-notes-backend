const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Data base connected');
    } catch {
        console.log('Error to connect the data base');
    }
};

module.exports = { dbConnection };