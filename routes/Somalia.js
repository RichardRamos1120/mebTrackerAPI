const express = require('express');
const app = express();

// Import the somalia model
const somalia = require('../models/Somalia');

// Import the calculateMEB function
const calculateMEB = require('../utils/CalculateMeb');


// display all the data in the database for somalia
app.get('/', async (req, res,next) => {
    const somaliaData = await somalia.find();
    
    res.status(200).json({
        message: 'Welcome to the somalia API',
        somaliaData
    }); 
});


// process the data sent for somalia
app.post('/', async (req, res,next) => {

    // Get the data from the request body
    const { latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other } = req.body;
    const newsomalia = new somalia({latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other});

    const savedsomalia = await newsomalia.save();

    res.status(201).json({
        message: 'somalia data saved successfully!',
        savedsomalia
    }); 
});


// Define the weights for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

app.get('/meb', async (req, res,next) => {

    // get the data for a specific month
    let somaliaData = await somalia.find({
        // Add query parameters here
        created_at: {
            $gte: new Date('2024-04-01'),
            $lte: new Date('2024-04-30')
        }
    });
    somaliaData = somaliaData[0]

    // Extract the prices from the data
    const prices = [somaliaData.Food, somaliaData.Housing, somaliaData.Healthcare, somaliaData.Transportation, somaliaData.Education, somaliaData.Utilities, somaliaData.Clothing, somaliaData.PersonalCare, somaliaData.Communication, somaliaData.Savings, somaliaData.Other]

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