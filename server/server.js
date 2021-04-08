const express = require('express'),
app = express();
require('dotenv').config();
const placesController = require('./controllers/places.js');
const placesService = require('./services/placesService');
const cacheService = require('./services/cacheService');

//init port from .env or if missing set to 3001
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});

//passing "/places" requests to places controller
app.use('/places', placesController)

const initCache = async () => {
    const data = await placesService.getDataFromApi("places/");
    await cacheService.saveToCache("places", data);
}

initCache();

module.exports = app;