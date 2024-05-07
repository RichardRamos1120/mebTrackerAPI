const express = require('express');
const app = express();

// Import the Kenya model
const kenya = require('../models/Kenya');

// Import the calculateMEB function
const calculateMEB = require('../utils/CalculateMeb');


// display all the data in the database for kenya
app.get('/', async (req, res,next) => {
    const kenyaData = await kenya.find();
    
    res.status(200).json({
        message: 'Welcome to the Kenya API',
        kenyaData
    }); 
});


// process the data sent for kenya
app.post('/', async (req, res,next) => {

    // Get the data from the request body
    const { latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other, Month, Year } = req.body;
    const newKenya = new kenya({latitude, longitude, Food, Housing, Healthcare, Transportation, Education, Utilities, Clothing, PersonalCare, Communication, Savings, Other, Month, Year});

    const savedKenya = await newKenya.save();

    res.status(201).json({
        message: 'Kenya data saved successfully!',
        savedKenya
    }); 
});


// Define the weights for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

app.post('/meb', async (req, res,next) => {

    // get the data for a specific month
    let kenyaData = await kenya.find({
        // Add query parameters here
        Month: req.body.Month,
        Year: req.body.Year
    });
    kenyaData = kenyaData[0]

    // Extract the prices from the data
    const prices = [kenyaData.Food, kenyaData.Housing, kenyaData.Healthcare, kenyaData.Transportation, kenyaData.Education, kenyaData.Utilities, kenyaData.Clothing, kenyaData.PersonalCare, kenyaData.Communication, kenyaData.Savings, kenyaData.Other]

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