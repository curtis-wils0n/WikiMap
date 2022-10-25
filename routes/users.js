/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

//Access restrictions
router.use((req,res,next) => {
  const userId = req.cookies['user_id'];
  if (!userId) {
    res.status(401).send('Cannot access: You must be logged in');
  }
  next();
});

//Direct to list of users
router.get('/', (req, res) => {
  res.render('users');
});

//Direct to profile page of user
router.get('/:id', (req, res) => {
  const userId = req.cookies['user_id'];
  userQueries.getUser(req.params.id)
  .then (user => {
    if (user[0] === undefined) {
      res.status(401).send('Cannot access: User does not exist');
    } else {
      let templateVars = user[0];
      templateVars.user_id = userId;
      res.render('user', templateVars);
    }
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
