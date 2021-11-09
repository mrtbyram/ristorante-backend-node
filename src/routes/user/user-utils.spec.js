const {extractUser} = require("./user-utils");

describe('user utils', () => {
    it('should User extracted', () => {
        const body = {username: 'mrt', password: 'byr', email: 'gmail', phone: '123'}
        const user = extractUser(body);

        expect(user.username).toEqual('mrt');
        expect(user.password).toEqual('byr');
        expect(user.email).toEqual('gmail');
        expect(user.id).toBeDefined();
        expect(Object.keys(user).length).toEqual(4);
    });
})
