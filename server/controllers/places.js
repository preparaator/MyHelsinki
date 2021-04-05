const express = require('express'),
router = express.Router(),
service = require('../services/placesService');


router.get('/get', async (req, res) => {

    //extracting query strings and setting default if missing
    const pageNr = req.query.page == undefined ? 1 : req.query.page;
    const itemsPerPage = req.query.items == undefined ? 10 : req.query.items;
    const queryTag = req.query.tag == undefined ? "places" : req.query.tag;

    try {

        const places = await service.getPlacesPageData(pageNr, itemsPerPage, queryTag); 
        res.send(places);

    } catch (error) {

        res.status(500).send('Something went wrong!: ' + error);
    }    
});

module.exports = router
