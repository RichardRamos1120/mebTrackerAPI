// Function to calculate MEB
function calculateMEB(prices, weights) {
    // Validate input arrays
    if (prices.length !== weights.length) {
        throw new Error("Prices and weights arrays must have the same length.");
    }

    // Calculate total expenditure for each category
    let totalExpenditure = 0;
    for (let i = 0; i < prices.length; i++) {
        totalExpenditure += prices[i] * weights[i];
    }

    return totalExpenditure;
}

// Example data (prices in local currency)
const prices = [50, 1000, 200, 150, 200, 50, 50, 30, 30, 20, 50]; // Example prices for each category
const weights = [0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02]; // Example weights for each category

// Weights for different categories of expenditure based on their importance in meeting basic needs

// Food: 25%
// Housing (rental prices): 20%
// Healthcare services: 15%
// Transportation: 10%
// Education: 10%
// Utilities (electricity, water, gas): 5%
// Clothing: 5%
// Personal care items: 3%
// Communication (phone, internet): 3%
// Savings/emergency fund: 2%
// Other basic necessities: 2%


// Calculate MEB
// const MEB = calculateMEB(prices, weights);
// console.log("Minimum Expenditure Basket (MEB): " + MEB);

module.exports = calculateMEB;