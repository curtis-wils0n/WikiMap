const db = require('../connection');

const getLocations = () => {
  return db.query('SELECT * FROM locations;')
    .then(data => {
      return data.rows;
    });
};

const getLocationById = (map_id, location_id) => {
  const queryString = `
  SELECT * FROM locations
  WHERE locations.map_id = $1 AND locations.id = $2;`
  const queryParams = [map_id, location_id];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};

const getLocationsByMapId = (map_id) => {
  const queryString = `
  SELECT locations.* FROM locations
  JOIN maps ON maps.id = locations.map_id
  WHERE locations.map_id = $1
  `;
  const queryParams = [map_id];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getLocations,
  getLocationById,
  getLocationsByMapId,
};
