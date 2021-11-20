const { Router } = require('express');
const pg = require("../../service/pg-service");

const router = Router();

router.get('/', (req, res, next) => {
    pg.getAllCountries()
        .then(dbRes => res.send(dbRes.rows.map(r => ({name: r.name, name_ar: r.name_ar, code: r.alpha_3}))))
        .catch(next);
});

module.exports = router;
