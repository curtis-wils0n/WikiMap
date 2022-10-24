/*
 * All routes for Locations Data are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /api/maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  mapQueries.getLocations()
    .then(locations => {
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get('/:location_id', (req, res) => {
  mapQueries.getMapsById(req.params.location_id)
    .then(location => {
      res.json({ location });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Filter locations by specific user and map
router.get('/maps/:map_id', (req, res) => {
  let inputs = [
    req.cookies['user_id'],
    req.params.map_id
  ]
  mapQueries.getLocationsByUserId(inputs)
    .then(locations => {
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
module.exports = router;
