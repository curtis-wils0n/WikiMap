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
  VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

const newLocation = (inputs) => {
  const queryString = `
  INSERT INTO locations (creator_id, map_id, title, description, image_url)
  VALUES ($1,$2,$3,$4,$5) RETURNING *;`
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
  SELECT locations.*, users.name as name FROM locations
  JOIN users ON locations.creator_id = users.id
  WHERE locations.id = $1;`
  const queryParams = [locations_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
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

const updateLocation = (inputs) => {
  const queryString = `
  UPDATE locations
  SET title= $2, description = $3, image_url = $4
  WHERE locations.id = $1 ;`
  const queryParams = inputs
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
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

const newFavourite = (inputs) => {
  const queryString = `
  INSERT INTO favourites (owner_id, map_id)
  VALUES ($1,$2) RETURNING *;`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

const deleteFavourite = (inputs) => {
  const queryString = `
  DELETE FROM favourites
  WHERE owner_id = $1 AND map_id= $2;`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
};

const getFavourites = () => {
  return db.query('SELECT * FROM favourites;')
    .then(data => {
      return data.rows;
    });
};

const getFavouritesById = (user_id) => {
  const queryString = `
  SELECT maps.title, maps.id FROM favourites JOIN maps ON maps.id = map_id WHERE favourites.owner_id = $1`
  const queryParams = [user_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const checkFavouritesExist = (inputs) => {
  const queryString = `
  SELECT * FROM favourites WHERE owner_id = $1 AND map_id = $2`
  return db.query(queryString, inputs)
    .then(data => {
      console.log(data.rows);
      return (data.rows.length !== 0);
    });
}


module.exports = {
  getMaps,
  getMapsById,
  newMap,
  newLocation,
  getLocations,
  getLocationsById,
  deleteLocation,
  getFavourites,
  getFavouritesById,
  newFavourite,
  checkFavouritesExist,
  deleteFavourite,
  getLocationsByUserId,
  updateLocation
};
