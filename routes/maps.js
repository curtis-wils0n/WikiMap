/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('maps');
});

router.get('/:map_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
  };
  res.render('maps_show', templateVars);
});

router.get('/:map_id/locations', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
  }
  res.render('locations', templateVars);
});

router.get('/:map_id/locations/:location_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    location_id: req.params.location_id,
  };
  res.render('locations_show', templateVars);
});

module.exports = router;
