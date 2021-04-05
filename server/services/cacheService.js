const NodeCache = require( "node-cache" );

const myCache = new NodeCache();
const ttl = 3600; //1hour

//singleton cache class
class Cache {

    saveToCache = async (key, dataToSave) => {
        console.log("saving to cache... ");
        //saving to cache by key
        let placesToSave = [];
        switch (key) {
            case "places":
                try {
                    //case key "places" saving all places with given key            
                    dataToSave.data.forEach(place => {
                        placesToSave.push({
                            name: place.name.fi,
                            location: place.location,
                            tags: place.tags,
                            opening_hours: place.opening_hours   
                        })
                    });
                    myCache.set(key, placesToSave, ttl);

                    //saving places to cache by tags for faster fetching 
                    const tags = dataToSave.tags;
                    let tagsWithData = [];

                    Object.values(tags).forEach(tag => {
                        const placesWithGivenTag = [];
                        placesToSave.forEach(place => {
                            place.tags.forEach(placeTag => {
                                if(placeTag.name == tag) placesWithGivenTag.push(place);
                            })
                        })
                        if(placesWithGivenTag.length != 0){
                            myCache.set(tag, placesWithGivenTag, ttl);
                            tagsWithData.push(tag);  
                        } 
                    });

                    myCache.set("tagsWithData", tagsWithData, ttl);

                } catch (error) {
                    throw new Error("Saving to cache failed! " + error);
                }

                break;

            default:
                break;
        }
    }
 
    cacheExists = async (key) => {
        return myCache.get(key) == undefined ? false : true
    }

    getCachedDataByTag = async (tag) => {
        try {
            return await myCache.get(tag);
        } catch (error) {
            throw new Error("Fetching from cache by tag failed! " + error);
        }
        
    }

    getTagsWithData = async () => {
        try {
            return await myCache.get("tagsWithData");
        } catch (error) {
            throw new Error("Fetching tags from cache failed! " + error);
        }
    }

} 

 module.exports = new Cache();