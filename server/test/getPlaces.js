const chai = require('chai')
const expect = chai.expect;
const request = require('supertest');
const nock = require('nock');

const server = require('../server.js');
const mockResponse = require('./mockData/apiResponse.js');

describe('GET /places/', () => {

    //using nock for api calls mocking
    beforeEach(() => {
        nock('http://open-api.myhelsinki.fi/v1/')
        .get('/places/')
        .reply(200, mockResponse);
    })

    it('OK, getting data from initial endpoint works', (done) => {

        request(server).get('/places/get')
        .then((res) => {
            //console.log(res);
            const body = res.body;
            expect(body).to.contain.property('tags');
            expect(body).to.contain.property('pagesCount');
            expect(body).to.contain.property('currentPage');
            expect(body).to.contain.property('placesOnPage');
            done();
        })
        .catch((err) => done(err));
    })
})
