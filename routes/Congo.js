const express = require('express');
const app = express();

// Import the congo model
const congo = require('../models/Congo');

// Import the calculateMEB function
const calculateMEB = require('../utils/CalculateMeb');


// display all the data in the database for congo
app.get('/', async (req, res,next) => {
    const congoData = await congo.find();
    
    res.status(200).json({
        message: 'Welcome to the congo API',
        congoData
    }); 
});


// process the data sent for congo
app.post('/', async (req, res,next) => {

    // Get the data from the request body
    const { latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other } = req.body;
    const newcongo = new congo({latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other});

    const savedcongo = await newcongo.save();

    res.status(201).json({
        message: 'congo data saved successfully!',
        savedcongo
    }); 
});


// Define the weights for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

app.get('/meb', async (req, res,next) => {

    // get the data for a specific month
    let congoData = await congo.find({
        // Add query parameters here
        created_at: {
            $gte: new Date('2024-04-01'),
            $lte: new Date('2024-04-30')
        }
    });
    congoData = congoData[0]

    // Extract the prices from the data
    const prices = [congoData.Food, congoData.Housing, congoData.Healthcare, congoData.Transportation, congoData.Education, congoData.Utilities, congoData.Clothing, congoData.PersonalCare, congoData.Communication, congoData.Savings, congoData.Other]

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