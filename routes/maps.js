/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const e = require('express');
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
    .then ((map) => res.redirect(`/maps/${map.id}`))
});

//Put favourited maps to specific user
router.post('/:map_id', (req, res) => {
  const favouriteInfo =[
    req.cookies['user_id'],
    req.params.map_id
  ];
  userQueries.checkFavouritesExist(favouriteInfo)
    .then((boolean) => {
      if(boolean === true) {
        userQueries.deleteFavourite(favouriteInfo)
        .catch(err => console.log(err.message));
      } else {
        userQueries.newFavourite(favouriteInfo)
        .catch(err => console.log(err.message));
      }
    })
    .catch(err => console.log(err.message));
});

router.get('/:map_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    api_key: process.env.MAP_API,
    userId: req.cookies['user_id']
  };
  res.render('maps_show', templateVars);
});

router.get('/:map_id/locations', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
  }
  res.render('locations', templateVars);
});

router.post('/:map_id/locations', (req, res) => {
  const locationInfo =[
    req.cookies['user_id'],
    req.params.map_id,
    req.body.title,
    req.body.description,
    req.body.locationImage
  ];
  userQueries.newLocation(locationInfo)
    .then (() => res.redirect(`/maps/${req.params.map_id}`))
});

router.get('/:map_id/locations/:location_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    location_id: req.params.location_id,
  };
  res.render('locations_show', templateVars);
});

module.exports = router;
