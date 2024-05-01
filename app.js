const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/congo', require('./routes/Congo'));
app.use('/api/ethiopia', require('./routes/Ethiopia'));
app.use('/api/kenya', require('./routes/Kenya'));
app.use('/api/somalia', require('./routes/Somalia'));
app.use('/api/southsudan', require('./routes/Southsudan'));
app.use('/api/sudan', require('./routes/Sudan'));



module.exports = app;