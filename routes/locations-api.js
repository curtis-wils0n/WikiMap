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
  mapQueries.getMarkers()
    .then(markers => {
      res.json({ markers });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:marker_id', (req, res) => {
  mapQueries.getMapsById(req.params.marker_id)
    .then(marker => {
      res.json({ marker });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
