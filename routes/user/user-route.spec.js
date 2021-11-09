const server = require('../../server');
const supertest = require('supertest');

const request = supertest(server);

describe('users route test',  () => {
    it('should return all users when get called', async () => {
        await request.get('/users').expect(200);
    });

    it('should insert user', async () => {
        await request.post('/users')
            .send({username: 'mrt', password: 'byr', email: 'gmail'})
            .expect(200);
    });
})
