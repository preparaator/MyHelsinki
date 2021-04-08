const express = require('express'),
router = express.Router(),
service = require('../services/placesService');


router.get('/', async (req, res) => {

    //extracting query strings and setting default if missing
    const pageNr = (req.query.page == undefined || req.query.page == "undefined" || req.query.page.trim == "" ) ? 1 : req.query.page;
    const pageSize = (req.query.pageSize == undefined || req.query.pageSize == "undefined" || req.query.pageSize.trim == ""  ) ? 10 : req.query.pageSize;
    const queryTag = (req.query.tag === undefined || req.query.tag == "undefined" || req.query.tag.trim == "" )  ? "places" : req.query.tag;
    
    try {
        const places = await service.getPlacesPageData(pageNr, pageSize, queryTag); 
        res.send(JSON.stringify(places));

    } catch (error) {

        res.status(500).send('Something went wrong!: ' + error);
    }    
});

module.exports = router
