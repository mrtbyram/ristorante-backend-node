const {Pool} = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'meds',
    password: 'postgres',
    port: 5432,
});

const pg = {
    getAllCountries: () => db.query('SELECT * FROM country')
}

export default pg;
