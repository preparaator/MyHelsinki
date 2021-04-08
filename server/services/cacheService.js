const myCache = require('../cache');


    const saveToCache = async (key, dataToSave) => {
        //saving to cache by key        
        switch (key) {
            case "places":
                try {
                    let placesToSave = [];
                    const tags = dataToSave.tags;

                    //case key "places" saving all places with given key            
                    dataToSave.data.forEach(place => {
                        placesToSave.push({
                            name: place.name.fi,
                            location: place.location,
                            tags: place.tags,
                            opening_hours: place.opening_hours   
                        })
                    });
                    myCache.set(key, placesToSave);

                    //saving places to cache by tags for faster fetching 
                    
                    let tagsWithData = [];

                    Object.keys(tags).forEach(tag => {
                        const placesWithGivenTag = [];
                        placesToSave.forEach(place => {
                            place.tags.forEach(placeTag => {
                                if(placeTag.id == tag) placesWithGivenTag.push(place);
                            })
                        })
                        if(placesWithGivenTag.length != 0){
                            myCache.set(tag, placesWithGivenTag);
                            let tagObject = new Object;
                            tagObject[tag] = tags[tag];
                            tagsWithData.push(tagObject);  
                        } 
                    });
                    
                    myCache.set("tagsWithData", tagsWithData);

                } catch (error) {
                    throw new Error("Saving to cache failed! " + error);
                }

                break;

            default:
                break;
        }
    }
 
    const cacheExists = async (key) => {
        return myCache.get(key) == undefined ? false : true
    }

    const getCachedDataByTag = async (tag) => {
        try {
            return await myCache.get(tag);
        } catch (error) {
            throw new Error("Fetching from cache by tag failed! " + error);
        }
        
    }

    const getTagsWithData = async () => {
        try {
            return await myCache.get("tagsWithData");
        } catch (error) {
            throw new Error("Fetching tags from cache failed! " + error);
        }
    }

 module.exports = {saveToCache, cacheExists, getCachedDataByTag, getTagsWithData}