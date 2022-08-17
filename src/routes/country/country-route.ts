const { Router } = require('express');
import pg from '../../service/pg-service';

const router = Router();

router.get('/', (req, res, next) => {
    pg.getAllCountries()
        .then(dbRes => res.send(dbRes.rows.map(r => ({name: r.name, name_ar: r.name_ar, code: r.alpha_3}))))
        .catch(next);
});

export {router};
