const server = require('../../server');
const supertest = require('supertest');
const pg = require("../../service/pg-service");

const request = supertest(server);

describe('country route tests', () => {
    it('should get all countries', async () => {
        await request.get('/country').expect(200);
    });

    it('should countries have code field', async () => {
        spyOn(pg, 'getAllCountries').and.callFake(() => new Promise((resolve, reject) => resolve({rows:[{name: 'Kuwait', alpha_3: 'KWT'}]})));

        await request.get('/country').expect(200)
            .then(res => {
                expect(res.body.map(e => e.code)).not.toContain(undefined);
                expect(res.body.map(e => e.code)).not.toContain(null);
                expect(pg.getAllCountries).toHaveBeenCalledTimes(1);
            });

    });
})
