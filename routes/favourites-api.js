/*
 * All routes for Favourites Data are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /api/maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  mapQueries.getFavourites()
    .then(favourite => {
      res.json({ favourite });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:favourite_id', (req, res) => {
  mapQueries.getFavouritesById(req.params.favourite_id)
    .then(favourite => {
      res.json({ favourite });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
