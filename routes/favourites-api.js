/*
 * All routes for Favourites Data are defined here
 * Since this file is loaded in server.js into api/favourites,
 *   these routes are mounted onto /api/favourites
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const favouriteQueries = require('../db/queries/favourites');

//Get all the favourite maps
router.get('/', (req, res) => {
  favouriteQueries.getFavourites()
    .then(favourites => {
      res.json({ favourites });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Get maps that a specific user has as favourite
router.get('/:user_id', (req, res) => {
  favouriteQueries.getFavouritesById(req.params.user_id)
    .then(favourites => {
      res.json({ favourites });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
