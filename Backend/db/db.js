const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected to mongodb successfully"))
    .catch((err)=> console.log(`Error in connecting database ${err}`))
}

module.exports = connectDB;