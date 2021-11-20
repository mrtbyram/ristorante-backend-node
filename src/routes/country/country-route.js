const { Router } = require('express');
const db = require('../../service/pg-service');

const router = Router();

router.get('/', (req, res, next) => {
    db.query('SELECT * FROM country', (err, dbRes) => {
        err ? next(err) :
        res.send(dbRes.rows.map(r => ({name: r.name, name_ar: r.name_ar, code: r.alpha_3})));
    });
});

module.exports = router;
