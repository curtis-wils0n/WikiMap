/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.use((req,res,next) => {
  const userId = req.cookies['user_id'];
  if (!userId) {
    res.status(401).send('Cannot access: You must be logged in');
  }
  next();
});

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:id', (req, res) => {
  const userId = req.cookies['user_id'];
  userQueries.getUser(userId)
  .then (user => {
    templateVars = user[0];
    res.render('user', templateVars);

  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

module.exports = router;
