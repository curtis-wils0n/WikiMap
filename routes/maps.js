/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const locationQueries = require('../db/queries/locations');
const favouriteQueries = require('../db/queries/favourites');

router.use((req,res,next) => {
  const userId = req.cookies['user_id'];
  if (!userId) {
    res.status(401).send('Cannot access: You must be logged in');
  }
  next();
});

//Direct to list of all maps
router.get('/', (req, res) => {
  const templateVars = {
    user_id: req.cookies['user_id'],
  }
  res.render('maps' ,templateVars);
});

//Direct to place to create new map
router.get('/create', (req, res) => {
  const templateVars = {
    user_id: req.cookies['user_id'],
    api_key: process.env.MAP_API
  };
  res.render('map_create', templateVars);
});

//Post request to create new map
router.post('/create', (req, res) => {
  const mapInfo = [
    req.cookies['user_id'],
    req.body.title,
    req.body.description,
    new Date(),
    req.body.zoom,
    req.body.lat,
    req.body.lng
  ];
  mapQueries.newMap(mapInfo)
    .then ((map) => res.redirect(`/maps/${map.id}`))
});

//Direct to update existing map page
router.get('/:map_id/update', (req, res) => {
  const templateVars =
  {
    user_id: req.cookies['user_id'],
    map_id: req.params.map_id,
    api_key: process.env.MAP_API,
  };
  res.render('map_update', templateVars);
});

//Post request to update existing map
router.post('/:map_id/update', (req, res) => {
  const mapInfo = [
    req.params.map_id,
    req.body.title,
    req.body.description,
    req.body.zoom,
    req.body.lat,
    req.body.lng
  ];
  mapQueries.updateMap(mapInfo)
    .then (() => res.redirect(`/maps/${req.params.map_id}`))
});

//Post request to delete map
router.post('/:map_id/delete', (req, res) => {
  const mapId = [
    req.params.map_id,
  ];
  mapQueries.deleteMap(mapId)
    .then (() => res.redirect(`/maps/`))
});

//Put favourited maps to specific user
router.post('/:map_id', (req, res) => {
  const favouriteInfo = [
    req.cookies['user_id'],
    req.params.map_id
  ];
  favouriteQueries.checkFavouritesExist(favouriteInfo)
    .then((boolean) => {
      if (boolean === true) {
        favouriteQueries.deleteFavourite(favouriteInfo)
        .catch(err => console.log(err.message));
      } else {
        favouriteQueries.newFavourite(favouriteInfo)
        .catch(err => console.log(err.message));
      }
    })
    .catch(err => console.log(err.message));
});

//Direct to specific map page
router.get('/:map_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    api_key: process.env.MAP_API,
    user_id: req.cookies['user_id']
  };
  res.render('maps_show', templateVars);
});

//Direct to list of locations marked on a map
router.get('/:map_id/locations', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    user_id: req.cookies['user_id']
  }
  res.render('locations', templateVars);
});

//Post request to put new location marker on map
router.post('/:map_id/locations', (req, res) => {
  const locationInfo = [
    req.cookies['user_id'],
    req.params.map_id,
    req.body.title,
    req.body.description,
    req.body.locationImage,
    req.body.lat,
    req.body.lng,
  ];
  console.log(req.body.lat);
  locationQueries.newLocation(locationInfo)
    .then (() => res.redirect(`/maps/${req.params.map_id}`))
});

//Direct to specific location page on a map
router.get('/:map_id/locations/:location_id', (req, res) => {
  const templateVars = {
    map_id: req.params.map_id,
    location_id: req.params.location_id,
    user_id: req.cookies['user_id'],
  };
  res.render('locations_show', templateVars);
});

//Post request to update specific location on a map
router.post('/:map_id/locations/:location_id', (req, res) => {
  const locationInfo = [
    req.params.location_id,
    req.body.title,
    req.body.description,
    req.body.locationImage
  ];
  locationQueries.updateLocation(locationInfo)
    .then (() => res.redirect(`/maps/${req.params.map_id}/locations/${req.params.location_id}`))
});

//Post request to delete a location marker on a map
router.post('/:map_id/locations/:location_id/delete', (req, res) => {
  const deleteLocation = [
    req.params.location_id,
  ];
  locationQueries.deleteLocation(deleteLocation)
    .then (() => res.redirect(`/maps/${req.params.map_id}`))
});

module.exports = router;
