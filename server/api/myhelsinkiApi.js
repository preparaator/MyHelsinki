const fetch = require ('node-fetch');
require('dotenv').config();

const baseUrl = 'http://open-api.myhelsinki.fi/v1/'

const fetchData = async (endpoint) => {

    try {
        const data =  await fetch(baseUrl + endpoint);
        return data;
    } 
    catch (error) {
        throw new Error('Data fetching from MyHelsinki Api failed: ' + error);
    }    
}

module.exports = {fetchData}