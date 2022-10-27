const db = require('../connection');

const newLocation = (inputs) => {
  const queryString = `
  INSERT INTO locations (creator_id, map_id, title, description, image_url, lat, lng, created_date)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`
  return db.query(queryString, inputs)
    .then(data => {
      return data.rows[0];
    })
};

const getLocations = () => {
  return db.query('SELECT * FROM locations;')
    .then(data => {
      return data.rows;
    });
};

const getLocationsById = (locations_id) => {
  const queryString = `
  SELECT locations.*, maps.owner_id as map_owner FROM locations
  JOIN users ON locations.creator_id = users.id
  JOIN maps ON maps.id = map_id
  WHERE locations.id = $1;`
  const queryParams = [locations_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};

const getLocationByIdOnMap = (inputs) => {
  const queryString = `
  SELECT * FROM locations
  WHERE locations.map_id = $1 AND locations.id = $2;`
  const queryParams = inputs;
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};

const getLocationsByMapId = (map_id) => {
  const queryString = `
  SELECT locations.*, maps.title as map_title, users.name as owner_name FROM locations
  JOIN maps ON maps.id = locations.map_id
  JOIN users ON users.id = locations.creator_id
  WHERE locations.map_id = $1
  `;
  const queryParams = [map_id];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const getLocationsByUserId = (inputs) => {
  const queryString = `
  SELECT locations.* FROM locations
  JOIN users ON locations.creator_id = users.id
  WHERE users.id = $1
  AND map_id = $2;`
  const queryParams = inputs
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const getLocationsByAdmin = (inputs) => {
  const queryString = `
  SELECT locations.* FROM locations
  JOIN maps ON maps.id = map_id
  WHERE maps.id = $2
  AND creator_id <> $1
  AND maps.owner_id = $1;`
  const queryParams = inputs
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const updateLocation = (inputs) => {
  const queryString = `
  UPDATE locations
  SET title= $2, description = $3, image_url = $4
  WHERE locations.id = $1 RETURNING *;`
  const queryParams = inputs
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    });
};

const deleteLocation = (inputs) => {
  const queryString = `
  DELETE FROM locations
  WHERE id = $1;`
  const queryParams = inputs;
  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

module.exports = {
  newLocation,
  getLocations,
  getLocationsByMapId,
  getLocationsById,
  getLocationByIdOnMap,
  getLocationsByAdmin,
  deleteLocation,
  getLocationsByUserId,
  updateLocation,
};
