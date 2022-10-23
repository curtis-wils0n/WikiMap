/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const userId = req.cookies['user_id'];

router.use((req,res,next) => {
  if (!userId) {
    res.status(401).send('Cannot access: You must be logged in');
  }
  next();
});

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:id', (req, res) => {
  
  res.render('users');
});

module.exports = router;
