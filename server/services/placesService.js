const myHelsinkiapi = require('../api/myhelsinkiApi')
const cacheService = require('./cacheService')

const getDataFromApi = async (endpoint) => {
    try {
        const data = await myHelsinkiapi.fetchData(endpoint);
        const json = await data.json();        
        
        return json;

    } catch (err) {

        throw err;
    }
}

 const getPlacesPageData = async (requestedPage, pageSize, tag) =>{
        let placesToReturn = [];

        //initializing return object
        const returnObject = {
            tags: [],
            pagesCount: 0,
            activePage: requestedPage,
            placesOnPage: []
        }

        //checking if cache exists for given tag - if not, retrieving data through Api and saving all retrieved data to cache
        if(await cacheService.cacheExists(tag)){
            placesToReturn = await cacheService.getCachedDataByTag(tag);
        } 
        else {
            try {
                const data = await getDataFromApi("places/");
                await cacheService.saveToCache("places", data);
                placesToReturn = await cacheService.getCachedDataByTag(tag);  

            } catch (err) {

                throw err;
            }                         
        }

        //if no data found return empty object
        if(placesToReturn.length == 0 ) return returnObject;

        //calculate pages amount for places with current tag on correct requestedPage if neccessary
        const pages = Math.ceil(placesToReturn.length / pageSize);
        if(pages < requestedPage) requestedPage = pages;

        //filtering places by requested page number and selected page length
        placesToReturn = placesToReturn.slice(requestedPage*pageSize-pageSize, requestedPage*pageSize)

        //determine if place is open
        placesToReturn.forEach(place => {
            isOpen(place);   
        });

        //getting all tags with data from cache for frontend dropdown
        const tagsWithData = await cacheService.getTagsWithData();        

        //fill return object
        returnObject.tags = tagsWithData;
        returnObject.pagesCount = pages;
        returnObject.activePage = requestedPage;
        returnObject.placesOnPage = placesToReturn;

        return returnObject; 
}

const isOpen = (place) => {

    let isOpen = false;

    const currentDay = new Date().getDay();
    const currentTime = new Date().toLocaleTimeString('fi-FI', { hour12: false });

    if(!place.opening_hours.hours) return place.opening_hours = isOpen;

    //getting places opening hours by weekday_id
    const openingHoursToday = place.opening_hours.hours.find(day => day.weekday_id == currentDay)

    //if no data found for currentDay the we assume that this place is closed 
    if(openingHoursToday == undefined) return place.opening_hours = isOpen;

    //determining if current time is between opening and closing time og is open 24h
    if(openingHoursToday.opens < currentTime && openingHoursToday.closes > currentTime ){
        isOpen = true;
    }
     
    if(openingHoursToday.open24h == true){
        isOpen = true;
    } 

    //setting objects opening_hours to boolean
    place.opening_hours = isOpen;

    return place;

}

module.exports = {getPlacesPageData, getDataFromApi};