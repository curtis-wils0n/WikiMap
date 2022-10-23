const express = require('express');
const router  = express.Router();

//As we are not required to work on a login/register feature, we will manually login
router.get('/:id', (req, res) => {
  res.cookie('user_id', req.params.id);
  res.redirect('/');
});

module.exports = router;
