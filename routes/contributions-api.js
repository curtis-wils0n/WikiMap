/*
 * All routes for Contributions Data are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /api/maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  mapQueries.getContributions()
    .then(contributions => {
      res.json({ contributions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:user_id', (req, res) => {
  mapQueries.getContributionsById(req.params.user_id)
    .then(contributions => {
      res.json({ contributions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
