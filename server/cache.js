const NodeCache = require( "node-cache" );

const ttl = 3600; //1hour
        
module.exports = new NodeCache({stdTTL: ttl});