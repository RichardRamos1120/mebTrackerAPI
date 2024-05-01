const express = require('express');
const app = express();

// Import the southsudan model
const southsudan = require('../models/Southsudan');

// Import the calculateMEB function
const calculateMEB = require('../utils/CalculateMeb');


// display all the data in the database for southsudan
app.get('/', async (req, res,next) => {
    const southsudanData = await southsudan.find();
    
    res.status(200).json({
        message: 'Welcome to the southsudan API',
        southsudanData
    }); 
});


// process the data sent for southsudan
app.post('/', async (req, res,next) => {

    // Get the data from the request body
    const { latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other } = req.body;
    const newsouthsudan = new southsudan({latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other});

    const savedsouthsudan = await newsouthsudan.save();

    res.status(201).json({
        message: 'southsudan data saved successfully!',
        savedsouthsudan
    }); 
});


// Define the weights for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

app.get('/meb', async (req, res,next) => {

    // get the data for a specific month
    let southsudanData = await southsudan.find({
        // Add query parameters here
        created_at: {
            $gte: new Date('2024-04-01'),
            $lte: new Date('2024-04-30')
        }
    });
    southsudanData = southsudanData[0]

    // Extract the prices from the data
    const prices = [southsudanData.Food, southsudanData.Housing, southsudanData.Healthcare, southsudanData.Transportation, southsudanData.Education, southsudanData.Utilities, southsudanData.Clothing, southsudanData.PersonalCare, southsudanData.Communication, southsudanData.Savings, southsudanData.Other]

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