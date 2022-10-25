/*
 * All routes for Contributions Data are defined here
 * Since this file is loaded in server.js into api/contributions,
 *   these routes are mounted onto /api/contributions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const contributionQueries = require('../db/queries/contributions');

//Get which map user contributed to
router.get('/:user_id', (req, res) => {
  contributionQueries.getContributionsById(req.params.user_id)
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
