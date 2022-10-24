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

const newMarker = (inputs) => {
  const queryString = `
  INSERT INTO locations (creator_id, map_id, title, description, image_url)
  VALUES ($1,$2,$3,$4,$5) RETURNING *;`
  return db.query(queryString, inputs)
    .then(data => {
      return data.rows[0];
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

const getFavourites = () => {
  return db.query('SELECT * FROM favourites;')
    .then(data => {
      return data.rows;
    });
};

const getFavouritesById = (user_id) => {
  const queryString = `
  SELECT maps.title FROM favourites JOIN maps ON maps.id = map_id WHERE favourites.owner_id = $1`
  const queryParams = [user_id]
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const checkFavouritesExist = (inputs) => {
  const queryString = `
  SELECT * FROM favourites WHERE owner_id = $1 AND map_id = $2`
  const queryParams = [inputs]
  return db.query(queryString, queryParams)
    .then(data => {
      return (data.rows.length !== 0);
    });
}


module.exports = {
  getMaps,
  getMapsById,
  newMap,
  newMarker,
  getMarkers,
  getMarkersById,
  getFavourites,
  getFavouritesById,
  newFavourite,
  checkFavouritesExist
};
