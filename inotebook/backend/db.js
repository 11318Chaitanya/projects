const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

// connectToMongo().catch(err => console.log(err));

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("connected to server");
}

module.exports = connectToMongo;