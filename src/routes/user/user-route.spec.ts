import server from '../../server';
import supertest from 'supertest';

const request = supertest(server);

describe('users route test',  () => {
    it('should return all users when get called', async () => {
        await request.get('/users').expect(200);
    });

    it('should insert user', async () => {
        const username = Math.random().toString(10)

        await request.post('/users').send({username, password: 'byr', email: 'gmail'})
            .expect(201);

        await request.get('/users/' + username)
            .expect(200)
            .then(res => expect(res.body.username).toEqual(username));
    });
})
