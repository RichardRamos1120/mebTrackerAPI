const mongoose = require('mongoose');
require('dotenv').config();


mongoose.mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoose.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

module.exports = mongoose;
// Path: db.js