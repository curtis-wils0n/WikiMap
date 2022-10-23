/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/maps');

router.get('/', (req, res) => {
  res.render('maps');
});

router.get('/create', (req, res) => {
  const templateVars = {user_id: req.cookies['user_id']};
  res.render('map_create', templateVars);
});

router.post('/create', (req, res) => {
  const mapInfo =[
    req.cookies['user_id'],
    req.body.title,
    req.body.description,
    new Date(),
    req.body.zoom,
    req.body.lat,
    req.body.lng
  ];
  userQueries.newMap(mapInfo)
    .then (() => res.redirect('/maps'))
});

router.get('/:map_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    api_key: process.env.MAP_API,
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
