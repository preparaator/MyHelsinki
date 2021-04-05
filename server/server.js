const express = require('express'),
app = express();
require('dotenv').config();
const getPlaces = require('./controllers/places.js');

//init port from .env or if missing set to 3001
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});

app.use('/places', getPlaces)

module.exports = app;