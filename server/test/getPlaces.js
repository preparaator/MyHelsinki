const chai = require('chai')
const expect = chai.expect;
const request = require('supertest');
const nock = require('nock');
const server = require('../server.js');
const mockResponse = require('./mockData/apiResponse.js');


describe('GET /places', () => {

    //using nock for api calls mocking
    beforeEach(() => {
        nock('http://open-api.myhelsinki.fi/v1/')
        .get('/places/')
        .reply(200, mockResponse);
    })

    it('OK, getting data from places endpoint', (done) => {

        request(server).get('/places')
        .then((res) => {
            const body = JSON.parse(res.text);
            expect(body).to.contain.property('tags');
            expect(body).to.contain.property('pagesCount');
            expect(body).to.contain.property('activePage');
            expect(body).to.contain.property('placesOnPage');
            done();
        })
        .catch((err) => done(err));
    })

    it('OK, getting data places with query string', (done) => {

        const page = 2;
        const pageSize = 15;
        const tag = "matko1:228";
        request(server).get('/places/?page=' + page + '&pageSize=' + pageSize + '&tag=' + tag)
        .then((res) => {
            const body = JSON.parse(res.text);

            expect(body.tags).to.have.lengthOf(239);
            expect(body.pagesCount).to.equal(12);
            expect(parseInt(body.activePage)).to.equal(page);
            expect(body.placesOnPage).to.have.lengthOf(15);

            done();
        })
        .catch((err) => done(err));
    })
})
