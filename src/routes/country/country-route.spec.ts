import server from '../../server';
import pg from '../../service/pg-service';

const supertest = require('supertest');

const request = supertest(server);

describe('country route tests', () => {
    it('should get all countries', async () => {
        await request.get('/countries').expect(200);
    });

    it('should countries have code field', async () => {
        spyOn(pg, 'getAllCountries').and.callFake(() => new Promise((resolve) => resolve({
            rows: [{
                name: 'Kuwait',
                alpha_3: 'KWT'
            }]
        })));

        await request.get('/countries').expect(200)
            .then(res => {
                expect(res.body.map(e => e.code)).not.toContain(undefined);
                expect(res.body.map(e => e.code)).not.toContain(null);
                expect(pg.getAllCountries).toHaveBeenCalledTimes(1);
            });

    });
})
