const server = require('../../server');
const supertest = require('supertest');

const request = supertest(server);

describe('users route test',  () => {
    it('should return all users when get called', async () => {
        await request.get('/user').expect(200);
    });

    it('should insert user', async () => {
        const username = Math.random().toString(10)

        await request.post('/user').send({username, password: 'byr', email: 'gmail'})
            .expect(201);

        await request.get('/user/' + username)
            .expect(200)
            .then(res => expect(res.body.username).toEqual(username));
    });
})
