const mongoose = require('../db');

const EthiopiaSchema = new mongoose.Schema({
    latitude:String,
    longitude:String,
    Food:Number,
    Housing:Number,
    Healthcare:Number,
    Transportation:Number,
    Education:Number,
    Utilities:Number,
    Clothing:Number,
    PersonalCare:Number,
    Communication:Number,
    Savings:Number,
    Other:Number,
    Month:String,
    Year:String,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },


})

module.exports = mongoose.model("Ethiopia", EthiopiaSchema);