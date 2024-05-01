const express = require('express');
const app = express();

// Import the ethiopia model
const ethiopia = require('../models/Ethiopia');

// Import the calculateMEB function
const calculateMEB = require('../utils/CalculateMeb');


// display all the data in the database for ethiopia
app.get('/', async (req, res,next) => {
    const ethiopiaData = await ethiopia.find();
    
    res.status(200).json({
        message: 'Welcome to the ethiopia API',
        ethiopiaData
    }); 
});


// process the data sent for ethiopia
app.post('/', async (req, res,next) => {

    // Get the data from the request body
    const { latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other } = req.body;
    const newethiopia = new ethiopia({latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other});

    const savedethiopia = await newethiopia.save();

    res.status(201).json({
        message: 'ethiopia data saved successfully!',
        savedethiopia
    }); 
});


// Define the weights for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

app.get('/meb', async (req, res,next) => {

    // get the data for a specific month
    let ethiopiaData = await ethiopia.find({
        // Add query parameters here
        created_at: {
            $gte: new Date('2024-04-01'),
            $lte: new Date('2024-04-30')
        }
    });
    ethiopiaData = ethiopiaData[0]

    // Extract the prices from the data
    const prices = [ethiopiaData.Food, ethiopiaData.Housing, ethiopiaData.Healthcare, ethiopiaData.Transportation, ethiopiaData.Education, ethiopiaData.Utilities, ethiopiaData.Clothing, ethiopiaData.PersonalCare, ethiopiaData.Communication, ethiopiaData.Savings, ethiopiaData.Other]

    // Calculate the MEB
    const meb = calculateMEB(prices, weights);

    // Return the MEB
    res.status(200).json({
        message: 'MEB calculated successfully!',
        currency: 'USD',
        meb
    });
});



module.exports = app;