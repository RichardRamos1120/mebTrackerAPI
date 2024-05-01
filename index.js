const http = require('http');
require('dotenv').config();

const app = require('./app');


const server = http.createServer(app);


server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// Path: app.js