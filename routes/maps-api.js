/*
 * All routes for Map Data are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /api/maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const locationQueries = require('../db/queries/locations');

router.get('/', (req, res) => {
  mapQueries.getMaps()
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:map_id', (req, res) => {
  mapQueries.getMapsById(req.params.map_id)
    .then(map => {
      res.json({ map });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:map_id/locations/', (req, res) => {
  locationQueries.getLocationsByMapId(req.params.map_id)
    .then(locations => {
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:map_id/locations/:location_id', (req, res) => {
  locationQueries.getLocationById(req.params.map_id, req.params.location_id)
    .then(location => {
      res.json({ location });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
