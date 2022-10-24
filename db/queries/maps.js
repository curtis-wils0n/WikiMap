const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      return data.rows;
    });
};

const getMapsById = (map_id) => {
  const queryString = `
  SELECT *, users.name as name FROM maps
  JOIN users ON maps.owner_id = users.id
  WHERE maps.id = $1;`
  const queryParams = [map_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};

const newMap = (inputs) => {
  const queryString = `
  INSERT INTO maps (owner_id, title, description,created_date, zoom, lat, lng)
  VALUES ($1,$2,$3,$4,$5,$6,$7);`
  return db.query(queryString, inputs)
    .then(data => {
      return data.rows;
    })
};

const newMarker = (inputs) => {
  const queryString = `
  INSERT INTO locations (creator_id, map_id, title, description, image_url)
  VALUES ($1,$2,$3,$4,$5);`
  return db.query(queryString, inputs)
    .then(data => {
      return data.rows;
    })
};

const getMarkers = () => {
  return db.query('SELECT * FROM locations;')
    .then(data => {
      return data.rows;
    });
};

const getMarkersById = (markers_id) => {
  const queryString = `
  SELECT markers.*, users.name as name FROM markers
  JOIN users ON markers.creator_id = users.id
  WHERE markers.id = $1;`
  const queryParams = [markers_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};


module.exports = {
  getMaps,
  getMapsById,
  newMap,
  newMarker,
  getMarkers,
  getMarkersById
};
