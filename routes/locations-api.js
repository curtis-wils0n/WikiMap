/*
 * All routes for Locations Data are defined here
 * Since this file is loaded in server.js into api/locations,
 *   these routes are mounted onto /api/locations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const locationQueries = require('../db/queries/locations');

//Get all location datas
router.get('/', (req, res) => {
  locationQueries.getLocations()
    .then(locations => {
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Get a specific location data
router.get('/:location_id', (req, res) => {
  locationQueries.getLocationsById(req.params.location_id)
    .then(location => {
      res.json({ location });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Get location datas filtered by specific user and map
router.get('/maps/:map_id', (req, res) => {
  let inputs = [
    req.cookies['user_id'],
    req.params.map_id
  ];
  locationQueries.getLocationsByUserId(inputs)
    .then(locations => {
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Get location datas filtered by owner of map for a specific map
router.get('/maps/:map_id/admin', (req, res) => {
  let inputs = [
    req.cookies['user_id'],
    req.params.map_id
  ];
  locationQueries.getLocationsByAdmin(inputs)
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
