const express = require('express');
const app = express();

// Import the sudan model
const sudan = require('../models/Sudan');

// Import the calculateMEB function
const calculateMEB = require('../utils/CalculateMeb');


// display all the data in the database for sudan
app.get('/', async (req, res,next) => {
    const sudanData = await sudan.find();
    
    res.status(200).json({
        message: 'Welcome to the sudan API',
        sudanData
    }); 
});


// process the data sent for sudan
app.post('/', async (req, res,next) => {

    // Get the data from the request body
    const { latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other } = req.body;
    const newSudan = new sudan({latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other});

    const savedsudan = await newsudan.save();

    res.status(201).json({
        message: 'sudan data saved successfully!',
        savedsudan
    }); 
});


// Define the weights for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

app.get('/meb', async (req, res,next) => {

    // get the data for a specific month
    let sudanData = await sudan.find({
        // Add query parameters here
        created_at: {
            $gte: new Date('2024-04-01'),
            $lte: new Date('2024-04-30')
        }
    });
    sudanData = sudanData[0]

    // Extract the prices from the data
    const prices = [sudanData.Food, sudanData.Housing, sudanData.Healthcare, sudanData.Transportation, sudanData.Education, sudanData.Utilities, sudanData.Clothing, sudanData.PersonalCare, sudanData.Communication, sudanData.Savings, sudanData.Other]

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